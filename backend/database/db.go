package database

import (
	"log"

	"github.com/jacolpn/angular-friends/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func GetConnection() {
	connection := "host=localhost user=root password=root dbname=root port=5432 sslmode=disable"

	DB, err = gorm.Open(postgres.Open(connection), &gorm.Config{QueryFields: true})

	if err != nil {
		log.Panic("Connection error:", err)
	}

	DB.AutoMigrate(&models.User{})
}
