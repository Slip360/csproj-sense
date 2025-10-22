import * as vscode from 'vscode';
import { ActivatedResult } from '@commons/activated.result';
import { SDK_VALUES } from '@project-tags/core/sdk.values';
import { getProjectProperties } from '@project-tags/core/project.properties';

const isInSdkRegex = /Sdk\s*=\s*"[^"]*$/;
const isInProjectTagRegex = /<Project\s[^>]*$/;

const sdkValuesCompletions = SDK_VALUES.map(sdk => {
  const item = new vscode.CompletionItem(sdk, vscode.CompletionItemKind.Value);
  item.insertText = sdk + '"';
  item.documentation = `SDK: ${sdk}`;
  return item;
});

const isInsideProjectTag = (line: string, position: vscode.Position): boolean => {
  const linePrefix = line.substring(0, position.character);
  return isInProjectTagRegex.test(linePrefix);
}

export const activateProject = (line: string, position: vscode.Position): ActivatedResult => {
  if (isInsideProjectTag(line, position)) {
    return getProjectProperties();
  }
  return undefined;
};
