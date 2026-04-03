"use strict";

let fileAttachments = [];
let index = 0;
let mainWindow = null;
let addonId = "zotero.quicklook";
let pluginID = "open-attachments-with-space@zotero.org";
let rootURI = "";

const PREF_QUICKLOOK_PATH = "extensions.zotero.quicklook.executablePath";
const DEFAULT_QUICKLOOK_PATH =
  "%LOCALAPPDATA%\\Programs\\QuickLook\\QuickLook.exe";

async function startup(data) {
  addonId = data.id || addonId;
  pluginID = data.id || pluginID;
  rootURI = data.rootURI || "";

  Zotero.debug(`Starting ${addonId}`);
  ensureDefaultPrefs();
  registerPreferencePane();

  mainWindow = Zotero.getMainWindow();
  if (mainWindow) {
    mainWindow.addEventListener("keydown", onKeyPressed, true);
  }
}

async function shutdown() {
  Zotero.debug(`Shutting down ${addonId}`);
  if (mainWindow) {
    mainWindow.removeEventListener("keydown", onKeyPressed, true);
    mainWindow = null;
  }
}

function ensureDefaultPrefs() {
  const currentPath = Zotero.Prefs.get(PREF_QUICKLOOK_PATH, true);
  if (!currentPath) {
    Zotero.Prefs.set(PREF_QUICKLOOK_PATH, DEFAULT_QUICKLOOK_PATH, true);
  }
}

function registerPreferencePane() {
  if (!rootURI || !Zotero.PreferencePanes || !Zotero.PreferencePanes.register) {
    return;
  }

  Zotero.PreferencePanes.register({
    pluginID,
    src: `${rootURI}prefs.xhtml`,
    scripts: [`${rootURI}prefs.js`],
  });
}

function getQuickLookExecutablePath() {
  return Zotero.Prefs.get(PREF_QUICKLOOK_PATH, true) || DEFAULT_QUICKLOOK_PATH;
}

function openAttachment(path) {
  const exePath = getQuickLookExecutablePath();
  debug(`Opening attachment with QuickLook: ${path}`);
  debug(`Using QuickLook executable: ${exePath}`);

  try {
    Zotero.launchFileWithApplication(path, exePath);
  } catch (e) {
    Zotero.debug(e);
    Zotero.alert(
      null,
      "Zotero QuickLook",
      `Unable to launch QuickLook.\n\nCurrent path:\n${exePath}\n\nPlease open Zotero Settings and update the QuickLook executable path.`,
    );
  }
}

function resetData() {
  fileAttachments = [];
  index = 0;
}

function debug(msg) {
  Zotero.debug(formatMsg(msg));
}

function formatMsg(msg) {
  return `[${addonId}] ${msg}`;
}

function getMainWindow() {
  if (!mainWindow || mainWindow.closed) {
    mainWindow = Zotero.getMainWindow();
  }
  return mainWindow;
}

function isItemNavigationFocused(event) {
  const win = getMainWindow();
  if (!win) {
    return false;
  }

  const activeElement = win.document.activeElement;
  if (!activeElement) {
    debug("No active element");
    return false;
  }

  if (activeElement.id === "item-tree-main-default") {
    return true;
  }

  if (
    event &&
    event.target &&
    typeof event.target.closest === "function" &&
    event.target.closest("#zotero-items-tree")
  ) {
    return true;
  }

  debug(
    `Ignore key ${event?.key || event?.code || "unknown"} outside item navigation: ${
      activeElement.id || activeElement.className || activeElement.localName
    }`,
  );
  return false;
}

function collectSelectedAttachmentPaths(items) {
  for (let item of items) {
    if (item.isRegularItem()) {
      const attachmentIDs = item.getAttachments();
      for (let id of attachmentIDs) {
        const attachment = Zotero.Items.get(id);
        const attachmentPath = attachment.getFilePath();
        if (typeof attachmentPath !== "string") {
          continue;
        }
        if (attachmentPath.lastIndexOf(".") === -1) {
          continue;
        }

        const splitPath = attachmentPath.split(".");
        const extension = splitPath[splitPath.length - 1].toLowerCase();
        if (["html", "htm"].includes(extension)) {
          continue;
        }

        fileAttachments.push(attachmentPath);
      }
    }

    if (item.isFileAttachment()) {
      const attachmentPath = item.getFilePath();
      if (typeof attachmentPath !== "string") {
        continue;
      }
      fileAttachments.push(attachmentPath);
    }
  }
}

function onKeyPressed(event) {
  const win = getMainWindow();
  const zp = win && win.ZoteroPane;

  if (event.code === "Space" || event.key === " ") {
    if (!zp) {
      debug("ZoteroPane is undefined");
      return;
    }
    if (!isItemNavigationFocused(event)) {
      return;
    }

    resetData();
    event.preventDefault();
    event.stopPropagation();
    debug("Space key pressed");

    const items = zp.getSelectedItems();
    debug(`Selected items: ${items.length}`);
    if (items.length === 0) {
      debug("No item selected");
      return;
    }

    collectSelectedAttachmentPaths(items);
    if (fileAttachments.length === 0) {
      debug("No attachment found");
      return;
    }

    debug(`Found ${fileAttachments.length} attachments`);
    openAttachment(fileAttachments[index]);
  }

  if (event.key === "ArrowDown") {
    if (!isItemNavigationFocused(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (fileAttachments.length <= 1) {
      return;
    }
    index = (index + 1) % fileAttachments.length;
    debug(`Next attachment: ${fileAttachments[index]}`);
    openAttachment(fileAttachments[index]);
  }

  if (event.key === "ArrowUp") {
    if (!isItemNavigationFocused(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (fileAttachments.length <= 1) {
      return;
    }
    index = (index - 1 + fileAttachments.length) % fileAttachments.length;
    debug(`Previous attachment: ${fileAttachments[index]}`);
    openAttachment(fileAttachments[index]);
  }
}
