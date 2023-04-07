import * as vscode from 'vscode';
import { assertUnreachable } from '../utilities/unreachable';

export class ResultProvider implements vscode.TreeDataProvider<Item> {
  constructor() { }

  getTreeItem(element: Item): vscode.TreeItem {
    switch (element.type) {
      case "file": {
        const item = new vscode.TreeItem(element.name, vscode.TreeItemCollapsibleState.Expanded);
        item.description = element.path;
        return item;
      }
      case "match": {
        const item = new vscode.TreeItem({ label: element.content, highlights: element.highlights }, vscode.TreeItemCollapsibleState.None);
        return item;
      }
      default: {
        return assertUnreachable(element);
      }
    }
  }

  getChildren(element?: Item): Item[] {
    if (element === undefined) {
      // root element
      return [
        {
          type: "file", name: "foo", path: "src/foo", matches: [
            { type: "match", content: "const res = eval(userInput)", highlights: [[12, 27]] },
          ]
        },
        {
          type: "file", name: "bar", path: "src/bar", matches: [
            { type: "match", content: "dangerouslySetInnerHTML(userInput);", highlights: [[0, 34]] },
          ]
        },
        {
          type: "file", name: "baz", path: "src/baz", matches: [
            { type: "match", content: "if (hoge) nankaYabaiCode();", highlights: [[10, 26]] },
          ]
        },
      ];
    } else {
      switch (element.type) {
        case "file": {
          return element.matches;
        }
        case "match": {
          return [];
        }
        default: {
          return assertUnreachable(element);
        }
      }
    }
  }

}

type Item =
  | FileItem
  | MatchItem;

type FileItem = {
  type: "file",
  name: string,
  path: string,
  matches: MatchItem[],
};

type MatchItem = {
  type: "match";
  content: string;
  highlights: [number, number][];
};
