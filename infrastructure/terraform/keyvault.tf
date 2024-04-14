data "azurerm_client_config" "current" {}

data "azurerm_user_assigned_identity" "aks_mi" {
  name                = "azurekeyvaultsecretsprovider-aks-subneterdev"
  resource_group_name = "MC_rg-aks_aks-subneterdev_westeurope"
}

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

resource "azurerm_key_vault_access_policy" "access_policy_sp_aks_mi" {
  key_vault_id = azurerm_key_vault.subnetervault.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_user_assigned_identity.aks_mi.object_id

  secret_permissions = [
    "Get",
    "List",
  ]

  certificate_permissions = [
    "Get",
    "List",
  ]
}

