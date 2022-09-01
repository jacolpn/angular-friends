package main

import (
	"github.com/jacolpn/angular-friends/backend/database"
	"github.com/jacolpn/angular-friends/backend/routes"
)

func main() {
	database.GetConnection()
	routes.HandleRequests()
}
