package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacolpn/angular-friends/backend/database"
	"github.com/jacolpn/angular-friends/backend/models"
)

func GetTask(c *gin.Context) {
	var task []models.Task
	var count int64

	name := c.DefaultQuery("name", "")
	title := c.DefaultQuery("title", "")
	date := c.DefaultQuery("date", "")
	username := c.DefaultQuery("username", "")
	limit := c.DefaultQuery("_limit", "20")
	page := c.DefaultQuery("_page", "1")
	sort := c.DefaultQuery("_sort", "ID")
	orderSort := c.DefaultQuery("_order", "desc")

	database.DB.Scopes(models.Paginate(page, limit)).Where(&models.Task{
		Name:     name,
		Title:    title,
		Date:     date,
		Username: username,
	}).Order(sort + " " + orderSort).Find(&task).Count(&count)

	if len(task) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error:": "Usuário não encontrado"})
	}

	c.JSON(http.StatusOK, gin.H{"items": task, "total": count})
}

func PostTask(c *gin.Context) {
	var task models.Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if err := models.ValidTask(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	database.DB.Create(&task)
	c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {
	var task models.Task

	id := c.Params.ByName("id")

	database.DB.Delete(&task, id)

	c.JSON(http.StatusOK, gin.H{
		"data": "Pagamento excluído com sucesso!"})
}

func PutTask(c *gin.Context) {
	var task models.Task

	id := c.Params.ByName("id")
	database.DB.First(&task, id)

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if err := models.ValidTask(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	database.DB.Model(&task).UpdateColumns(task)

	c.JSON(http.StatusOK, task)
}

func PatchTask(c *gin.Context) {
	var task models.Task

	id := c.Params.ByName("id")
	database.DB.First(&task, id)

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if err := models.ValidTask(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	database.DB.Model(&task).Update("IsPayed", task.IsPayed)

	c.JSON(http.StatusOK, task)
}
