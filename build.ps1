$ErrorActionPreference = "Stop"

$buildDir = Join-Path $PSScriptRoot "build"
$filesToPack = @(
  "bootstrap.js",
  "logo.png",
  "manifest.json",
  "prefs.js",
  "prefs.xhtml"
)
$manifest = Get-Content -Raw (Join-Path $PSScriptRoot "manifest.json") | ConvertFrom-Json
$version = $manifest.version

if ([string]::IsNullOrWhiteSpace($version)) {
  throw "manifest.json is missing a version value."
}

$xpiPath = Join-Path $buildDir ("Zotero.Quicklook_V{0}.xpi" -f $version)

New-Item -ItemType Directory -Path $buildDir -Force | Out-Null

if (Test-Path $xpiPath) {
  Remove-Item -LiteralPath $xpiPath -Force
}

Add-Type -AssemblyName "System.IO.Compression"
Add-Type -AssemblyName "System.IO.Compression.FileSystem"

$archive = [System.IO.Compression.ZipFile]::Open(
  $xpiPath,
  [System.IO.Compression.ZipArchiveMode]::Create
)

try {
  foreach ($file in $filesToPack) {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $archive,
      (Join-Path $PSScriptRoot $file),
      $file
    ) | Out-Null
  }
}
finally {
  $archive.Dispose()
}

Write-Output "Built: $xpiPath"
