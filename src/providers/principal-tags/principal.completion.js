"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activatePrincipal = void 0;
const principal_properties_1 = require("./core/principal.properties");
const activatePrincipal = (line, position) => {
    if (line.substring(0, position.character).endsWith('<')) {
        return (0, principal_properties_1.getPrincipalProperties)();
    }
};
exports.activatePrincipal = activatePrincipal;
//# sourceMappingURL=principal.completion.js.map