"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
};
exports.default = formatTimestamp;
