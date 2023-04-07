import { provideVSCodeDesignSystem, TextField, vsCodeTextField } from "@vscode/webview-ui-toolkit";
import { Input, WebviewMessage } from "../messages/webview";

provideVSCodeDesignSystem().register(vsCodeTextField());

const vscode = acquireVsCodeApi();

let form: HTMLFormElement;

window.addEventListener("load", () => {
  const patternField = document.getElementById("pattern") as TextField;
  form = document.getElementById('form') as HTMLFormElement;
  patternField.addEventListener("input", onInput);
});

let requestIdx = 0;
const onInput = () => {
  const formData = new FormData(form);

  vscode.postMessage({
    command: "input",
    requestIdx: ++requestIdx,
    input: formDataToInput(formData),
  } satisfies WebviewMessage);
};

const formDataToInput = (formData: FormData): Input => {
  return {
    pattern: formData.get("pattern") as string,
  };
};
