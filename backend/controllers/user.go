package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jacolpn/angular-friends/backend/database"
	"github.com/jacolpn/angular-friends/backend/models"
)

func GetUser(c *gin.Context) {
	email := c.DefaultQuery("email", "")

	if email != "" {
		GetOneUser(email, c)

		return
	}

	GetAllUser(c)
}

func GetOneUser(email string, c *gin.Context) {
	var user models.User

	database.DB.Where(&models.User{Email: email}).First(&user)

	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error:": "Usuário não encontrado"})

		return
	}

	c.JSON(http.StatusOK, user)
}

func GetAllUser(c *gin.Context) {
	var users []models.User

	database.DB.Find(&users)

	c.JSON(http.StatusOK, users)
}

func PatchUser(c *gin.Context) {
	var user models.User

	id := c.Params.ByName("id")
	database.DB.First(&user, id)

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	database.DB.Model(&user).Update("Password", user.Password)

	c.JSON(http.StatusOK, user)
}
