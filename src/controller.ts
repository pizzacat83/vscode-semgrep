import { ExtensionContext } from "vscode";
import { ResultProvider } from "./providers/ResultProvider";
import { SearchProvider } from "./providers/SearchProvider";

export class Controller {
  searchProvider: SearchProvider;
  resultProvider: ResultProvider;

  constructor(context: ExtensionContext) {
    this.searchProvider = new SearchProvider(context.extensionUri);
    this.resultProvider = new ResultProvider();
  }
}
