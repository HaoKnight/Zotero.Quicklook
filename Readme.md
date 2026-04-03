# Zotero QuickLook

在 Zotero 中按空格键快速预览附件文件，并使用上下方向键切换同一条目下的其他附件。

## 项目简介

Zotero QuickLook 是一个 Zotero 插件，面向 Windows + QuickLook 用户：

- 在条目列表中按空格键，调用 QuickLook 预览附件
- 对同一条目下的多个附件，可用上/下方向键切换预览
- 在 Zotero 设置页中可配置 QuickLook 可执行文件路径

当前版本：v1.1.0

## 功能特性

- 空格键触发附件预览
- 支持普通文献条目的子附件和直接选中的文件附件
- 自动跳过 html/htm 附件（避免与网页类附件冲突）
- 首次启动自动写入默认 QuickLook 路径
- 插件设置页可手动浏览并选择 QuickLook.exe

## 兼容性

- 操作系统：Windows
- 依赖软件：QuickLook（桌面应用）
- Zotero 版本：
  - strict_min_version: 6.999
  - strict_max_version: 8.0.\*

## 安装方式

### 方式 1：安装已构建的 xpi

1. 打开项目中的 build 目录，找到对应版本 xpi。
2. 在 Zotero 中通过插件安装入口选择该 xpi 文件。
3. 重启 Zotero。

已构建文件示例：

- build/Zotero.Quicklook_V1.1.0.xpi

### 方式 2：本地构建后安装

在项目根目录运行：

    .\build.ps1

构建完成后会在 build 目录生成：

    Zotero.Quicklook_V<version>.xpi

## 使用说明

1. 在 Zotero 条目列表中选中一条文献或附件。
2. 按空格键预览当前附件。
3. 若该条目下有多个附件，可按上/下方向键切换预览。

注意：快捷键仅在条目导航区域聚焦时生效。

## 插件设置

路径：Zotero 设置 -> 插件设置 -> Zotero QuickLook

可配置项：

- QuickLook 可执行文件路径（QuickLook.exe）

默认路径：

    %LOCALAPPDATA%\Programs\QuickLook\QuickLook.exe

如果启动失败，请先检查 QuickLook 是否已安装并确认路径正确。

## 从源码构建

项目根目录需包含以下文件：

- bootstrap.js
- manifest.json
- prefs.js
- prefs.xhtml
- logo.png

然后运行：

    .\build.ps1

## 项目结构

- bootstrap.js: 插件主逻辑（快捷键监听、附件收集、调用 QuickLook）
- prefs.xhtml: 设置页 UI
- prefs.js: 设置页逻辑（路径读取、保存、文件选择）
- manifest.json: 插件元数据与兼容性声明
- build.ps1: 打包脚本

## 发布到 GitHub 建议

- 仓库名建议：Zotero.Quicklook
- 建议在 GitHub Releases 上传对应版本 xpi
- 每次发布时同步更新：
  - manifest.json 中 version
  - README 中当前版本说明
  - Release Notes（新增功能/修复项）

## 已知限制

- 当前主要面向 Windows + QuickLook 场景
- 仅处理文件类附件，不处理无本地文件路径的附件

## 许可证

暂未声明开源许可证。若你准备公开仓库，建议补充 LICENSE 文件（如 MIT）。
