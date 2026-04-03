"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
let fileAttachments = [];
let index = 0;
let addonId = "zotero.quicklook";
const win = Zotero.getMainWindow();
const zp = win.ZoteroPane;
function startup() {
  return __awaiter(this, void 0, void 0, function* () {
    Zotero.debug(`Starting ${addonId}`);
    win.addEventListener("keydown", onKeyPressed, true);
  });
}
function shutdown() {
  return __awaiter(this, void 0, void 0, function* () {
    Zotero.debug("Shutting down");
    win.removeEventListener("keydown", onKeyPressed, true);
  });
}
function getPathExtension(path) {
  var splitPath = path.split(".");
  return splitPath[splitPath.length - 1].toLowerCase();
}
function openAttachment(path) {
  Zotero.debug(`[${addonId}]Opening attachment: ${path}`);
  var extension = getPathExtension(path);
  const supportedFileExtensions = [
    "pdf",
    "epub",
    "mobi",
    "fb2",
    "cbz",
    "cbr",
    "cbt",
    "cba",
    "cb7",
    "xps",
    "oxps",
    "djvu",
    "djv",
    "txt",
    "ps",
  ];
  try {
    let exePath =
      "C:\\Users\\haoxi\\AppData\\Local\\Programs\\QuickLook\\QuickLook.exe";
    Zotero.launchFileWithApplication(path, exePath);
  } catch (e) {
    Zotero.debug(e);
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
function isItemNavigationFocused(event) {
  let activeElement = win.document.activeElement;
  if (!activeElement) {
    debug(`No active element`);
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
function onKeyPressed(event) {
  if (event.code === "Space" || event.key === " ") {
    if (zp === undefined) {
      debug(`ZoteroPane is undefined`);
      return;
    }
    if (!isItemNavigationFocused(event)) {
      return;
    }
    resetData();
    event.preventDefault();
    event.stopPropagation();
    debug(`Space key pressed`);
    let items = zp.getSelectedItems();
    debug(`Selected items: ${items.length}`);
    if (items.length == 0) {
      debug(`No item selected`);
      return;
    }
    for (let item of items) {
      if (item.isRegularItem()) {
        let attachmentIDs = item.getAttachments();
        for (let id of attachmentIDs) {
          let attachment = Zotero.Items.get(id);
          let attachmentPath = attachment.getFilePath();
          if (typeof attachmentPath !== "string") {
            continue;
          }
          if (attachmentPath.lastIndexOf(".") === -1) {
            continue;
          }
          var splitPath = attachmentPath.split(".");
          var extension = splitPath[splitPath.length - 1].toLowerCase();
          if (["html", "htm"].includes(extension)) {
            continue;
          }
          fileAttachments.push(attachmentPath);
        }
      }

      if (item.isFileAttachment()) {
        let attachmentPath = item.getFilePath();
        if (typeof attachmentPath !== "string") {
          continue;
        }
        fileAttachments.push(attachmentPath);
      }
    }
    if (fileAttachments.length == 0) {
      debug(`No attachment found`);
      return;
    }
    Zotero.debug(`[${addonId}]Found ${fileAttachments.length} attachments`);
    openAttachment(fileAttachments[index]);
  }
  if (event.key === "ArrowDown") {
    if (!isItemNavigationFocused(event)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (fileAttachments.length <= 1) return;
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
    if (fileAttachments.length <= 1) return;
    index = (index - 1 + fileAttachments.length) % fileAttachments.length;
    debug(`Previous attachment: ${fileAttachments[index]}`);
    openAttachment(fileAttachments[index]);
  }
}
