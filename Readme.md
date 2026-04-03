# 📖 Zotero QuickLook
<h1 align="center">
    <p>Zotero QuickLook</p>
</h1>

<div align="center">
    <img src="./logo.png" alt="Zotero QuickLook" width="128" height="128" />

    在 Zotero 中使用空格键调用 Quicklook 软件快速预览附件

</div>

## 注意

该插件当前主要面向 Windows + QuickLook 使用场景。

## 🔍 概述

Zotero QuickLook 是一个 Zotero 插件，用于提升附件预览效率。你可以在 Zotero 条目列表中按空格键直接调用 QuickLook 预览文件，并在同一条目的多个附件间快速切换。

该插件主要用于：

- 快速预览文献附件（PDF、图片等）
- 在不离开 Zotero 的情况下浏览多个附件
- 自定义 QuickLook 可执行文件路径

## ✨ 功能特性

### 🚀 核心功能

- **空格键预览**：在条目列表按空格键打开当前附件
- **附件切换**：按上/下方向键切换同条目下的附件
- **多种选择支持**：支持普通文献条目附件与直接选中的文件附件
- **自动默认路径**：首次启动自动写入 QuickLook 默认路径

### ⚙️ 配置能力

- **图形化设置**：在 Zotero 设置页配置 QuickLook.exe 路径
- **路径浏览选择**：支持文件选择器选择可执行文件
- **错误提示**：路径无效或启动失败时给出提示信息

## 📦 安装

### 系统要求

- **操作系统**：Windows
- **Zotero**：6.999 ~ 8.0.\*
- **依赖软件**：QuickLook（已安装）

### 安装方式

#### 1. 使用已构建版本（推荐）

1. 打开 `build` 目录，找到对应版本的 `.xpi` 文件。
2. 在 Zotero 中安装该插件包。
3. 重启 Zotero。

示例文件：

- `build/Zotero.Quicklook_V1.1.0.xpi`

#### 2. 从源码构建后安装

```powershell
.\build.ps1
```

构建成功后，在 `build` 目录获取：

- `Zotero.Quicklook_V<version>.xpi`

## 🚀 使用说明

### 基本操作

1. 在 Zotero 条目列表中选中一条文献或附件。
2. 按 `Space` 打开附件预览。
3. 若存在多个附件，按 `ArrowUp` / `ArrowDown` 切换。

### 设置 QuickLook 路径

1. 打开 Zotero 设置中的插件设置页。
2. 找到 Zotero QuickLook 设置项。
3. 手动输入或点击按钮选择 `QuickLook.exe`。

默认路径：

```text
%LOCALAPPDATA%\Programs\QuickLook\QuickLook.exe
```

## 🛠️ 开发与构建

### 项目文件

- `bootstrap.js`：插件主逻辑（快捷键监听、附件收集、调用 QuickLook）
- `prefs.xhtml`：设置页 UI
- `prefs.js`：设置逻辑（路径读写、文件选择）
- `manifest.json`：插件元信息与兼容版本
- `build.ps1`：打包脚本

### 构建命令

```powershell
.\build.ps1
```

脚本会将以下文件打包为 xpi：

- `bootstrap.js`
- `logo.png`
- `manifest.json`
- `prefs.js`
- `prefs.xhtml`

## ⚠️ 已知限制

- 当前主要针对 Windows 平台
- 仅处理可定位本地文件路径的附件
- 默认跳过 `html` / `htm` 附件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进插件。

## 📄 许可证

当前仓库尚未附带 LICENSE 文件。

如果你准备公开发布，建议添加许可证（如 MIT）并在此处更新说明。

---

<div align="center">
    <p>Zotero QuickLook</p>
    <p>
        快速预览附件 · 专注阅读流程
    </p>
</div>
