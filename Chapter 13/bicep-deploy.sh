az deployment group create \
  --resource-group myResourceGroup \
  --template-file main.bicep \
  --parameters environment='dev'
