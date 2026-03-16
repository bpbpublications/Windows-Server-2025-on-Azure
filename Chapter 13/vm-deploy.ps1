Connect-AzAccount
$rg = "myResourceGroup"
$vnet = Get-AzVirtualNetwork -Name "myVNet" -ResourceGroupName $rg
$subnet = $vnet.Subnets[0]
$nic = New-AzNetworkInterface -Name "myNIC" -ResourceGroupName $rg -Location "EastUS" -SubnetId $subnet.Id
$vmConfig = New-AzVMConfig -VMName "myVM" -VMSize "Standard_DS1_v2" |
    Set-AzVMOperatingSystem -Windows -ComputerName "myVM" -Credential (Get-Credential) -ProvisionVMAgent -EnableAutoUpdate |
    Set-AzVMSourceImage -PublisherName "MicrosoftWindowsServer" -Offer "WindowsServer" -Skus "2022-datacenter" -Version "latest" |
    Add-AzVMNetworkInterface -Id $nic.Id
New-AzVM -ResourceGroupName $rg -Location "EastUS" -VM $vmConfig
