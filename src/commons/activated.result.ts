import * as vscode from 'vscode';

/**
 * The result type for activation functions that provide completion items.
 */
export type ActivatedResult = vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> | undefined;
