resource "azurerm_container_registry" "acr" {
  name                = module.naming.container_registry.name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Standard"
  admin_enabled       = false
}

resource "azurerm_role_assignment" "acrpushgithub" {
  scope              = azurerm_container_registry.acr.id
  role_definition_id = "/subscriptions/a50ff473-cc05-46ed-a7a6-8c5ed3c3907b/providers/Microsoft.Authorization/roleDefinitions/8311e382-0749-4cb8-b61a-304f252e45ec"
  principal_id       = var.clientid
}
