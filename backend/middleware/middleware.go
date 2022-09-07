package middleware

import "github.com/gin-gonic/gin"

func TestMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("X-Total-Count", "")
		c.Next()
	}
}
