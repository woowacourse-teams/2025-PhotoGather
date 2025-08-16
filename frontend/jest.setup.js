const { TextEncoder, TextDecoder } = require('util');
require('@testing-library/jest-dom');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
