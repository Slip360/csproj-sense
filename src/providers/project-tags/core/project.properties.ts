import * as vscode from 'vscode';

/**
 * Defines a project property completion item.
 */
type ProjectPropertyCompletionItem = vscode.CompletionItem;

/**
 * Gets a list of project property completion items.
 * @returns A list of project property completion items.
 */
export const getProjectProperties = (): ProjectPropertyCompletionItem[] => {
  const sdkItem = new vscode.CompletionItem('Sdk', vscode.CompletionItemKind.Property);
  sdkItem.insertText = 'Sdk="';
  sdkItem.documentation = 'Specifies the SDK to use for the project.';
  const toolVersionItem = new vscode.CompletionItem('ToolsVersion', vscode.CompletionItemKind.Property);
  toolVersionItem.insertText = 'ToolsVersion="';
  toolVersionItem.documentation = 'Specifies the ToolsVersion for the project.';
  const defaultTargetsItem = new vscode.CompletionItem('DefaultTargets', vscode.CompletionItemKind.Property);
  defaultTargetsItem.insertText = 'DefaultTargets="';
  defaultTargetsItem.documentation = 'Specifies the default targets to build for the project.';
  return [sdkItem, toolVersionItem, defaultTargetsItem];
}
