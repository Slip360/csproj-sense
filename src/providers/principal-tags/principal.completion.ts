import * as vscode from 'vscode';
import { ActivatedResult } from '@commons/activated.result';
import { getPrincipalProperties } from './core/principal.properties';

/**
 * Activate completion for principal tags.
 * @param line Line to evaluate.
 * @param position Position of the character.
 * @returns Activated results or undefined.
 */
export const activatePrincipal = (line: string, position: vscode.Position): ActivatedResult => {
  if (line.substring(0, position.character).endsWith('<')) {
    return getPrincipalProperties();
  }
}
