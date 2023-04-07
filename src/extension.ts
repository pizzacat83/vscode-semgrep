import { ExtensionContext, window } from "vscode";
import { MainProvider as MainViewProvider } from "./providers/MainViewProvider";
import { ResultProvider } from "./providers/ResultProvider";

export function activate(context: ExtensionContext) {
	const provider = new MainViewProvider(context.extensionUri);

	context.subscriptions.push(window.registerWebviewViewProvider(
		MainViewProvider.viewType,
		provider,
	));

	context.subscriptions.push(window.registerTreeDataProvider(
		'semgrep.result',
		new ResultProvider(),
	));
}
