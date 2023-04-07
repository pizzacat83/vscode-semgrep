import { provideVSCodeDesignSystem, TextField, vsCodeTextField } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeTextField());

const vscode = acquireVsCodeApi();

window.addEventListener("load", () => {
  const patternField = document.getElementById("pattern") as TextField;
  patternField.addEventListener("input", onInput);
});

const onInput = (_event: unknown) => {
  vscode.postMessage({
    command: "change",
  });
};
