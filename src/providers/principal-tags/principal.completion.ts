import * as vscode from 'vscode';
import { ActivatedResult } from '@commons/activated.result';
import { getPrincipalProperties } from './core/principal.properties';

export const activatePrincipal = (line: string, position: vscode.Position): ActivatedResult => {
  if (line.substring(0, position.character).endsWith('<')) {
    return getPrincipalProperties();
  }
}
