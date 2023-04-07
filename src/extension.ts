import { ExtensionContext, window } from "vscode";
import { SearchProvider } from "./providers/SearchProvider";
import { ResultProvider } from "./providers/ResultProvider";

export function activate(context: ExtensionContext) {
	const provider = new SearchProvider(context.extensionUri);

	context.subscriptions.push(window.registerWebviewViewProvider(
		SearchProvider.viewType,
		provider,
	));

	context.subscriptions.push(window.registerTreeDataProvider(
		'semgrep.result',
		new ResultProvider(),
	));
}
