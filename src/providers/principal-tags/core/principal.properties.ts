import * as vscode from 'vscode';

/**
 * Defines a principal property completion item.
 */
type PrincipalPropertyCompletionItem = vscode.CompletionItem;

/**
 * Gets the principal properties.
 * @returns Principal property items.
 */
export const getPrincipalProperties = (): PrincipalPropertyCompletionItem[] => {
  const principalProperties: PrincipalPropertyCompletionItem[] = [
    new vscode.CompletionItem('Project', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('PropertyGroup', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('ItemGroup', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('PackageReference', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('Target', vscode.CompletionItemKind.Keyword),
    new vscode.CompletionItem('Message', vscode.CompletionItemKind.Keyword),
  ];
  return principalProperties;
}
