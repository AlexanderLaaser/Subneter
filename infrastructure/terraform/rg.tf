resource "azurerm_resource_group" "tfbackend" {
  name     = "rg-tfbackend"
  location = var.location

  tags = {
    environment = var.stage
  }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-dev"
  location = var.location

  tags = {
    environment = var.stage
  }
}


