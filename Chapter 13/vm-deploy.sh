az login
az group create --name myResourceGroup --location eastus
az network vnet create --name myVNet --resource-group myResourceGroup --subnet-name mySubnet
az network nic create --resource-group myResourceGroup --name myNic --vnet-name myVNet --subnet mySubnet
az vm create \
  --resource-group myResourceGroup \
  --name myVM \
  --nics myNic \
  --image Win2022Datacenter \
  --admin-username azureuser \
  --admin-password 'ComplexPassword123!' \
  --size Standard_DS1_v2
