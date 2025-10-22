"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateProject = void 0;
const vscode = __importStar(require("vscode"));
const sdk_values_1 = require("@project-tags/core/sdk.values");
const project_properties_1 = require("@project-tags/core/project.properties");
/**
 * Checks if the cursor is inside a Project tag (not in attributes).
 * @param line Line to validate.
 * @param position Position of de character.
 * @returns true if is in the project tag otherwise false.
 */
const isCursorInsideProjectTag = (line, position) => {
    const linePrefix = line.substring(0, position.character);
    // Must be inside the opening tag
    const isInProjectTagRegex = /<Project\s[^>]*$/;
    if (!isInProjectTagRegex.test(linePrefix))
        return false;
    // Check if cursor is inside any quoted attribute value
    const quotePairs = [];
    const quoteRegex = /"[^"]*"/g;
    let match;
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
};
/**
 * Checks if the cursor is inside the quotes of a specific attribute.
 * @param line Line to validate.
 * @param position Position of the character.
 * @param attributeName Name of the attribute.
 * @returns true if is in the quotes of the attribute.
 */
const isCursorInsideAttributeQuotes = (line, position, attributeName) => {
    const regex = new RegExp(`${attributeName}\\s*=\\s*"([^"]*)"`, 'g');
    let match;
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
};
/**
 * Activates project tag completions.
 * @param line Line to validate.
 * @param position Position of the character.
 * @returns Results of activation.
 */
const activateProject = (line, position) => {
    if (isCursorInsideAttributeQuotes(line, position, 'Sdk')) {
        return sdk_values_1.SDK_VALUES.map(sdk => {
            const item = new vscode.CompletionItem(sdk, vscode.CompletionItemKind.Value);
            item.insertText = sdk;
            item.documentation = `SDK: ${sdk}`;
            return item;
        });
    }
    if (isCursorInsideProjectTag(line, position))
        return (0, project_properties_1.getProjectProperties)();
    return undefined;
};
exports.activateProject = activateProject;
//# sourceMappingURL=project.completion.js.map