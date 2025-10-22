import * as vscode from 'vscode';
import { ActivatedResult } from '@commons/activated.result';
import { SDK_VALUES } from '@project-tags/core/sdk.values';
import { getProjectProperties } from '@project-tags/core/project.properties';

/**
 * Checks if the cursor is inside a Project tag (not in attributes).
 * @param line Line to validate.
 * @param position Position of de character.
 * @returns true if is in the project tag otherwise false.
 */
const isCursorInsideProjectTag = (line: string, position: vscode.Position): boolean => {
  const linePrefix = line.substring(0, position.character);

  // Must be inside the opening tag
  const isInProjectTagRegex = /<Project\s[^>]*$/;
  if (!isInProjectTagRegex.test(linePrefix)) return false;

  // Check if cursor is inside any quoted attribute value
  const quotePairs: { start: number; end: number }[] = [];
  const quoteRegex = /"[^"]*"/g;
  let match: RegExpExecArray | null;

  while ((match = quoteRegex.exec(line)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    quotePairs.push({ start, end });
  }

  for (const { start, end } of quotePairs) {
    if (position.character > start && position.character < end) {
      return false; // Cursor is inside an attribute value
    }
  }

  return true;
}

/**
 * Checks if the cursor is inside the quotes of a specific attribute.
 * @param line Line to validate.
 * @param position Position of the character.
 * @param attributeName Name of the attribute.
 * @returns true if is in the quotes of the attribute.
 */
const isCursorInsideAttributeQuotes = (line: string, position: vscode.Position, attributeName: string): boolean => {
  const regex = new RegExp(`${attributeName}\\s*=\\s*"([^"]*)"`, 'g');
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    const fullMatchText = match[0]; // e.g., Sdk="Microsoft.NET.Sdk"
    const matchStart = match.index;
    const quoteStartOffset = fullMatchText.indexOf('"');
    const quoteEndOffset = fullMatchText.lastIndexOf('"');
    const startIndex = matchStart + quoteStartOffset + 1;
    const endIndex = matchStart + quoteEndOffset + 1;
    console.log({
      quoteStartOffset,
      quoteEndOffset,
      startIndex,
      endIndex,
      positionChar: position.character
    });
    if (startIndex <= position.character && position.character <= endIndex) {
      return true;
    }
  }
  return false;
}

/**
 * Activates project tag completions.
 * @param line Line to validate.
 * @param position Position of the character.
 * @returns Results of activation.
 */
export const activateProject = (line: string, position: vscode.Position): ActivatedResult => {
  if (isCursorInsideAttributeQuotes(line, position, 'Sdk')) {
    return SDK_VALUES.map(sdk => {
      const item = new vscode.CompletionItem(sdk, vscode.CompletionItemKind.Value);
      item.insertText = sdk;
      item.documentation = `SDK: ${sdk}`;
      return item;
    });
  }
  if (isCursorInsideProjectTag(line, position)) return getProjectProperties();
  return undefined;
};
