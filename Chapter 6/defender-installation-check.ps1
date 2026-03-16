#Look for AMRunningMode = Normal and RealTimeProtectionEnabled = True
Get-MpComputerStatus | Select-Object AMRunningMode, RealTimeProtectionEnabled, AntispywareEnabled, AntivirusEnabled