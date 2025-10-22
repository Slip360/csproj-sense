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
exports.activate = activate;
const vscode = __importStar(require("vscode"));
const principal_completion_1 = require("@principal-tags/principal.completion");
const project_completion_1 = require("@project-tags/project.completion");
/**
 * Characters that trigger completion.
 */
const TRIGGER_CHARACTERS = ['<', ' ', '"', "."];
/**
 * Activate the extension.
 * @param context Context of extension.
 */
function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider({
        language: 'xml',
        scheme: 'file'
    }, {
        provideCompletionItems(document, position) {
            if (document.fileName.endsWith('.csproj') === false)
                return undefined;
            const line = document.lineAt(position).text;
            const principalResults = (0, principal_completion_1.activatePrincipal)(line, position);
            if (principalResults !== undefined)
                return principalResults;
            const projectResults = (0, project_completion_1.activateProject)(line, position);
            if (projectResults !== undefined)
                return projectResults;
            return undefined;
        }
    }, ...TRIGGER_CHARACTERS);
    context.subscriptions.push(provider);
}
//# sourceMappingURL=extension.js.map