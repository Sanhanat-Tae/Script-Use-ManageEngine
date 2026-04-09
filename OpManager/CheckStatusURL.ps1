# =============================================================================================
# Powershell script for check status URL, Use in OpManager Script Templates
# Command line use: cmd /c powershell.exe -NoProfile -ExecutionPolicy Bypass .\${FileName}.ps1
# =============================================================================================

$Url = "http://google.com"
$statusCode = -1

try {
    $response = Invoke-WebRequest `
        -Uri $Url `
        -Method Get `
        -UseBasicParsing `
        -MaximumRedirection 5

    $statusCode = [int]$response.StatusCode
}
catch {
    if ($_.Exception.Response) {
        try {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }
        catch {
            $statusCode = -1
        }
    }
    else {
        $statusCode = -1
    }
}

if ($statusCode -eq 200) {
    Write-Host "Message: UP - $Url returned HTTP 200"
    Write-Host "Data:"
    Write-Host "URL_Status`t1"
    exit 0
}
else {
    Write-Host "Message: DOWN - $Url returned HTTP $statusCode"
    Write-Host "Data:"
    Write-Host "URL_Status`t0"
    exit 1
}