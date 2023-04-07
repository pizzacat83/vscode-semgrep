import { ExtensionContext, window } from "vscode";
import { MainProvider as MainViewProvider } from "./providers/MainViewProvider";

export function activate(context: ExtensionContext) {
	const provider = new MainViewProvider(context.extensionUri);

	const webview = window.registerWebviewViewProvider(
		MainViewProvider.viewType,
		provider
	);

	context.subscriptions.push(webview);
}
