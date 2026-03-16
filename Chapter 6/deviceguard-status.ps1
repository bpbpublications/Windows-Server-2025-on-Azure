# Check for Device Guard policies as an alternate way of checking if HVCI is enabled
Get-ComputerInfo | Select-Object DeviceGuardSmartStatus