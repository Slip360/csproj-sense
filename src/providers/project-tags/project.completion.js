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
const isInSdkRegex = /Sdk\s*=\s*"[^"]*$/;
const isInProjectTagRegex = /<Project\s[^>]*$/;
const sdkValuesCompletions = sdk_values_1.SDK_VALUES.map(sdk => {
    const item = new vscode.CompletionItem(sdk, vscode.CompletionItemKind.Value);
    item.insertText = sdk + '"';
    item.documentation = `SDK: ${sdk}`;
    return item;
});
const isInsideProjectTag = (line, position) => {
    const linePrefix = line.substring(0, position.character);
    return isInProjectTagRegex.test(linePrefix);
};
const activateProject = (line, position) => {
    if (isInsideProjectTag(line, position)) {
        return (0, project_properties_1.getProjectProperties)();
    }
    return undefined;
};
exports.activateProject = activateProject;
//# sourceMappingURL=project.completion.js.map