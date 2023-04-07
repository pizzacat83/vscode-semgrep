import { ExtensionContext, window } from "vscode";
import { Controller } from "./controller";
import { SearchProvider } from "./providers/SearchProvider";

export function activate(context: ExtensionContext) {
	const controller = new Controller(context);

	context.subscriptions.push(window.registerWebviewViewProvider(
		SearchProvider.viewType,
		controller.searchProvider,
	));

	context.subscriptions.push(window.registerTreeDataProvider(
		'semgrep.result',
		controller.resultProvider,
	));
}
