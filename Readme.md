# 📖 Zotero QuickLook

<div align="center">
    <table>
        <tr>
            <td><img src="./logo_Z.png" alt="Zotero QuickLook" width="125" height="125" /></td>
            <td valign="middle"><img src="./link.svg" alt="Zotero QuickLook" width="50" height="50" /></td>
            <td><img src="./logo.png" alt="Zotero QuickLook" width="128" height="128" /></td>
        </tr>
    </table>

</div>
<div align="center">
    <p style="font-size: 30px; font-weight: 700; margin: 10px 0 0;">
        Zotero QuickLook
    </p>
</div>

## 🔍 概述

Zotero QuickLook 是一个 Zotero 插件，用于提升附件预览效率。你可以在 Zotero 条目列表中按空格键直接调用 QuickLook 预览文件，并在同一条目的多个附件间快速切换。

该插件主要用于：

- 快速预览文献附件（PDF、图片等）
- 在不离开 Zotero 的情况下浏览多个附件
- 自定义 QuickLook 可执行文件路径

## 📦 安装

#### 该插件主要面向 Windows + QuickLook 使用场景。

### 系统要求

- **操作系统**：Windows
- **Zotero**：7.0 ~ 8.0.\*
- **依赖软件**：QuickLook（不能是微软商店版本）

### 安装方式

#### 1. 安装QuickLook软件

开源地址：https://github.com/QL-Win/QuickLook

#### 2. 安装本插件（推荐使用已构建版本）

1. 打开 `build` 目录，找到对应版本的 `.xpi` 文件。
2. 在 Zotero 中安装该插件包。
3. 重启 Zotero。

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

- 灵感来源于：nino - 主页：https://iring.fun/

  基于此版本更新优化，可以在zotero设置中手动指定Quicklook.exe地址

- 欢迎提交 Issue 和 Pull Request 来改进插件。

---

<div align="center">
    <p>Zotero QuickLook</p>
    <p>
        快速预览附件 · 专注阅读流程
    </p>
</div>
