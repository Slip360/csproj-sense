import * as vscode from 'vscode';
import { activatePrincipal } from '@principal-tags/principal.completion';
import { activateProject } from '@project-tags/project.completion';

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider({
	language: 'xml',
	scheme: 'file'
  }, {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
	  if (document.fileName.endsWith('.csproj') === false) return undefined;
	  const line = document.lineAt(position).text;
	  const principalResults = activatePrincipal(line, position);
	  if (principalResults !== undefined) return principalResults;
	  const projectResults = activateProject(line, position);
	  if (projectResults !== undefined) return projectResults;
	  return undefined;
	}
  }, '<', ' ');
  context.subscriptions.push(provider);
}
