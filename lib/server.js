"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.get('/api/tld/:tldType', (req, res) => {
    const tldType = req.params.tldType.toUpperCase();
    const tlds = (0, index_1.getTldInfo)(tldType);
    if (tlds.length > 0) {
        res.json({ tlds });
    }
    else {
        res.status(400).json({ error: 'Invalid TLD type' });
    }
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
