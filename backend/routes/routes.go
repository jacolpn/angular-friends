package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jacolpn/angular-friends/backend/controllers"
)

func HandleRequests() {
	router := gin.Default()
	router.Use(cors.Default())
	// router.Use(middleware.TestMiddleware())

	router.GET("/account", controllers.GetUser)

	router.GET("/tasks", controllers.GetTask)
	router.POST("/tasks", controllers.PostTask)
	router.OPTIONS("/tasks", controllers.PostTask)
	router.DELETE("/tasks/:id", controllers.DeleteTask)
	router.PUT("/tasks/:id", controllers.PutTask)
	router.PATCH("/tasks/:id", controllers.PatchTask)

	router.Run(":3000")
}
