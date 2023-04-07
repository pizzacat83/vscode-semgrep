import { provideVSCodeDesignSystem, TextField, vsCodeTextField } from "@vscode/webview-ui-toolkit";
import { Input, WebviewMessage } from "../messages/webview";
import { assertUnreachable } from "../utilities/unreachable";
import { ProviderMessage } from "../messages/provider";

provideVSCodeDesignSystem().register(vsCodeTextField());

const vscode = acquireVsCodeApi();

let form: HTMLFormElement;

window.addEventListener("load", () => {
  form = document.getElementById('form') as HTMLFormElement;

  const patternField = document.getElementById("pattern") as TextField;
  patternField.addEventListener("input", onInput);
});

window.addEventListener('message', event => {
  const message: ProviderMessage = event.data;
  switch (message.command) {
    case 'search-result': {
      console.log(message.hits);
      break;
    }
    default: {
      assertUnreachable(message.command);
    }
  }
});

const onInput = () => {
  const formData = new FormData(form);

  vscode.postMessage({
    command: "input",
    input: formDataToInput(formData),
  } satisfies WebviewMessage);
};

const formDataToInput = (formData: FormData): Input => {
  return {
    pattern: formData.get("pattern") as string,
  };
};
