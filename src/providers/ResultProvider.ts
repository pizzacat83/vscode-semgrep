import * as vscode from 'vscode';

export class ResultProvider implements vscode.TreeDataProvider<Item> {
  constructor() { }

  getTreeItem(element: Item): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: Item): Promise<Item[]> {
    if (element === undefined) {
      // root element
      return [
        new Item("Item 1", vscode.TreeItemCollapsibleState.None),
        new Item("Item 2", vscode.TreeItemCollapsibleState.None),
        new Item("Item 3", vscode.TreeItemCollapsibleState.None),
      ];
    } else {
      // TODO
      return [];
    }
  }

}
class Item extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = "TODO tooltip";
    this.description = "TODO description";
  }
}
