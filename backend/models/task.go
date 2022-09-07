package models

import (
	"errors"
	"strconv"

	"gopkg.in/validator.v2"
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Name     string  `json:"name" validate:"nonzero"`
	Username string  `json:"username"`
	Title    string  `json:"title"`
	Price    float64 `json:"price" validate:"nonzero"`
	Date     string  `json:"date" validate:"nonzero"`
	Image    string  `json:"image"`
	IsPayed  bool    `json:"isPayed"`
	Action   bool    `json:"action"`
}

func ValidTask(task *Task) error {
	if err := validator.Validate(task); err != nil {
		return err
	}

	if task.Price < 0 {
		return errors.New("O preço deve ser maior que zero")
	}

	return nil
}

func Paginate(page, limit string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		page, _ := strconv.Atoi(page)
		pageSize, _ := strconv.Atoi(limit)

		offset := (page - 1) * pageSize

		return db.Offset(offset).Limit(pageSize)
	}
}
