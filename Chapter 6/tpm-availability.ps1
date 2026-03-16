<# Look for the following:
•	IsEnabled_InitialValue = True
•	IsActivated_InitialValue = True
•	SpecVersion should include 2.0
#>

Get-WmiObject -Namespace root\CIMV2\Security\MicrosoftTpm -Class Win32_Tpm