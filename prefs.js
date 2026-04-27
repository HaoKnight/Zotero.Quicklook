window.ZoteroQuickLookPrefs = {
  prefKey: "extensions.zotero.quicklook.executablePath",
  initialized: false,

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    this.pathInput = document.getElementById(
      "zotero-quicklook-executable-path",
    );
    this.browseButton = document.getElementById(
      "zotero-quicklook-browse-button",
    );

    this.loadValue();
    this.pathInput.addEventListener("change", () => this.saveValue());
    this.pathInput.addEventListener("blur", () => this.saveValue());
    this.browseButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.chooseExecutable();
    });
    this.browseButton.addEventListener("command", (event) => {
      event.preventDefault();
      this.chooseExecutable();
    });
  },

  loadValue() {
    this.pathInput.value = Zotero.Prefs.get(this.prefKey, true) || "";
  },

  saveValue() {
    Zotero.Prefs.set(this.prefKey, this.pathInput.value.trim(), true);
  },

  async chooseExecutable() {
    try {
      var { FilePicker } = ChromeUtils.importESModule(
        "chrome://zotero/content/modules/filePicker.mjs",
      );
      const fp = new FilePicker();
      fp.init(window, "选择 QuickLook 可执行文件", fp.modeOpen);

      if (Zotero.isWin) {
        fp.appendFilter("Applications", "*.exe");
      } else {
        fp.appendFilters(fp.filterApps);
      }
      fp.appendFilters(fp.filterAll);

      const currentValue = (this.pathInput.value || "").trim();
      if (currentValue) {
        try {
          let currentFile = Zotero.File.pathToFile(currentValue);
          if (currentFile && currentFile.parent) {
            fp.displayDirectory = currentFile.parent.path;
          }
        } catch (e) {
          Zotero.debug(e);
        }
      }

      const result = await fp.show();
      if (result !== fp.returnOK || !fp.file) {
        return;
      }

      this.pathInput.value = fp.file;
      this.saveValue();
    } catch (e) {
      Zotero.logError(e);
      Zotero.alert(
        null,
        "Zotero QuickLook",
        "打开文件选择窗口失败，请手动输入 QuickLook.exe 路径后再试。",
      );
    }
  },
};
