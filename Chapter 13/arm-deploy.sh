az deployment group create \
  --resource-group myResourceGroup \
  --template-file template.json \
  --parameters @parameters.json
