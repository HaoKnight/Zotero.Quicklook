# Package

在 `Zotero.Quicklook` 根目录运行终端.

目录中需要包含 `bootstrap.js`, `logo.png`, and
`manifest.json`, `prefs.js`, and `prefs.xhtml`文件

可以在终端下面运行代码进行构建：

```powershell
$buildDir = ".\build"
$version = (Get-Content -Raw ".\manifest.json" | ConvertFrom-Json).version
$xpiPath = Join-Path $buildDir ("Zotero.Quicklook_V{0}.xpi" -f $version)
New-Item -ItemType Directory -Path $buildDir -Force | Out-Null
Add-Type -AssemblyName "System.IO.Compression"
Add-Type -AssemblyName "System.IO.Compression.FileSystem"
$archive = [System.IO.Compression.ZipFile]::Open($xpiPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($file in @(".\bootstrap.js",".\logo.png",".\manifest.json",".\prefs.js",".\prefs.xhtml")) {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file, (Split-Path $file -Leaf)) | Out-Null
  }
}
finally {
  $archive.Dispose()
}
```

也可以运行构建文件:

```powershell
.\build.ps1
```
