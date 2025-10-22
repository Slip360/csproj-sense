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
exports.getProjectProperties = void 0;
const vscode = __importStar(require("vscode"));
/**
 * Gets a list of project property completion items.
 * @returns A list of project property completion items.
 */
const getProjectProperties = () => {
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
};
exports.getProjectProperties = getProjectProperties;
//# sourceMappingURL=project.properties.js.map