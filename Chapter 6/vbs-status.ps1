#Look at the SecurityServicesRunning field. 1 indicates VBS, 2 indicates HVCI. Both may be present
Get-CimInstance -ClassName Win32_DeviceGuard -Namespace root\Microsoft\Windows\DeviceGuard