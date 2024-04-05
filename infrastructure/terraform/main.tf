provider "azurerm" {
  features {

  }
}

provider "kubernetes" {}

module "naming" {
  source = "Azure/naming/azurerm"
  suffix = ["subneter${var.stage}"]
}

