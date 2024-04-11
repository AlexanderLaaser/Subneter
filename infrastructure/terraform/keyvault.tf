data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "subnetervault" {
  name                        = module.naming.key_vault.name
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  sku_name                    = "standard"
}

resource "azurerm_key_vault_access_policy" "subneterlaaseraccess" {
  key_vault_id = azurerm_key_vault.subnetervault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = var.objectid

  key_permissions = [
    "Get",
  ]

  secret_permissions = [
    "Get",
  ]

  certificate_permissions = [
    "Get",
    "List",
    "Delete",
    "Create",
    "Update",
    "Import",
  ]
}
