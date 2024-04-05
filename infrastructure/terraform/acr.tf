resource "azurerm_container_registry" "acr" {
  name                = module.naming.container_registry.name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Standard"
  admin_enabled       = false
}

resource "azurerm_role_assignment" "acrpushgithub" {
  scope              = azurerm_container_registry.acr.id
  role_definition_id = "AcrPush"
  principal_id       = var.clientid
}
