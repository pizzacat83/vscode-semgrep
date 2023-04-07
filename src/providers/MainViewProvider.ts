import {
  CancellationToken,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
} from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";
import { WebviewMessage } from "../messages/webview";

export class MainProvider implements WebviewViewProvider {
  public static readonly viewType = "semgrep.main";

  constructor(private readonly _extensionUri: Uri) { }

  public resolveWebviewView(
    webviewView: WebviewView,
    _context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [Uri.joinPath(this._extensionUri, "out")],
    };

    webviewView.webview.html = getWebviewContent(webviewView.webview, this._extensionUri);

    webviewView.webview.onDidReceiveMessage(handleMessage);
  }
}

const getWebviewContent = (webview: Webview, extensionUri: Uri) => {
  const webviewUri = getUri(webview, extensionUri, ["out", "webview.js"]);
  const nonce = getNonce();

  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <title>Semgrep</title>
      </head>
      <body>
        <h1>Hello!</h1>

        <form id="form">
          <vscode-text-field name="pattern">Pattern</vscode-text-field>
        </form>

        <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
      </body>
    </html>
  `;
};

const handleMessage = (message: WebviewMessage) => {
  switch (message.command) {
    case "input": {
      console.log("Input:", message.input);
    }
    default: {
      // assertUnreachable(message.command);
    }
  }
};
