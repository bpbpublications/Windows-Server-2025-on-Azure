provider "azurerm" {
  features = {}
}

resource "azurerm_virtual_network" "myVNet" {
  name                = "myVNet"
  address_space       = ["10.0.0.0/16"]
  location            = "East US"
  resource_group_name = "myResourceGroup"

  subnet {
    name           = "mySubnet"
    address_prefix = "10.0.1.0/24"
  }
}
