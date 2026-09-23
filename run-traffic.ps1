param([ValidateSet('baseline','smoke')][string]$Mode='smoke',[ValidateSet('Run1-after','Run2-after')][string]$Run='Run1-after')
$ErrorActionPreference='Stop'
$stored=Get-Content -Raw (Join-Path $PSScriptRoot '.private/keys.dpapi.json') | ConvertFrom-Json
$secure=ConvertTo-SecureString $stored.server
$env:STATSIG_SERVER_SECRET=[System.Net.NetworkCredential]::new('', $secure).Password
$env:B8_RUN_LABEL=$Run
try { & node (Join-Path $PSScriptRoot 'traffic.cjs') $Mode; if($LASTEXITCODE -ne 0){throw 'Synthetic traffic verification failed'} }
finally {Remove-Item Env:STATSIG_SERVER_SECRET; Remove-Item Env:B8_RUN_LABEL}
