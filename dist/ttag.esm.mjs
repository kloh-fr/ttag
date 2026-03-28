/******/ var __webpack_modules__ = ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Config)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ "./src/validation.ts");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class Config {
  constructor() {
    _defineProperty(this, "config", {
      locales: {},
      currentLocales: [],
      currentLocale: 'en',
      dedent: true,
      defaultLang: 'en'
    });
  }
  addLocale(locale, localeData) {
    if (true) (0,_validation__WEBPACK_IMPORTED_MODULE_2__.validateLocaleCode)(locale);
    if (true) (0,_validation__WEBPACK_IMPORTED_MODULE_2__.validateLocaleData)(localeData);
    var transformedData;
    if ('translations' in localeData) {
      transformedData = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.transformTranslateObj)(localeData);
    } else if (localeData.contexts) {
      transformedData = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.transformCompactObj)(localeData);
    } else {
      throw new Error('Invalid locale data format');
    }
    this.config.locales[locale] = transformedData;
  }
  setCurrentLocale(locale) {
    this.config.currentLocale = locale;
  }
  setDedent(dedent) {
    this.config.dedent = dedent;
  }
  setCurrentLocales(locales) {
    if (true) (0,_validation__WEBPACK_IMPORTED_MODULE_2__.validateLocales)(locales, this.getAvailLocales());
    this.config.currentLocales = locales;
  }
  getAvailLocales() {
    return this.config.locales;
  }
  getCurrentLocales() {
    return this.config.currentLocales.map(locale => typeof locale === 'string' ? locale : locale());
  }
  getCurrentLocale() {
    return typeof this.config.currentLocale === 'string' ? this.config.currentLocale : this.config.currentLocale();
  }
  isDedent() {
    return this.config.dedent;
  }
  setDefaultLang(lang) {
    this.config.defaultLang = lang;
  }
  getDefaultPluralFn() {
    return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.config.defaultLang);
  }
  getDefaultPluralFormsCount() {
    return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.config.defaultLang);
  }
  getCurrentLocaleHeaders() {
    var locale = this.getCurrentLocale();
    return this.config.locales[locale].headers;
  }
}

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildArr: () => (/* binding */ buildArr),
/* harmony export */   buildStr: () => (/* binding */ buildStr),
/* harmony export */   dedentStr: () => (/* binding */ dedentStr),
/* harmony export */   getMsgid: () => (/* binding */ getMsgid),
/* harmony export */   getPluralFnForTrans: () => (/* binding */ getPluralFnForTrans),
/* harmony export */   getPluralFunc: () => (/* binding */ getPluralFunc),
/* harmony export */   makePluralFunc: () => (/* binding */ makePluralFunc),
/* harmony export */   msgid2Orig: () => (/* binding */ msgid2Orig),
/* harmony export */   transformCompactObj: () => (/* binding */ transformCompactObj),
/* harmony export */   transformTranslateObj: () => (/* binding */ transformTranslateObj)
/* harmony export */ });
/* harmony import */ var dedent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dedent */ "./node_modules/dedent/dist/dedent.mjs");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* eslint-disable @typescript-eslint/no-explicit-any */


var getMsgid = (str, exprs) => {
  var result = [];
  var exprsLenght = exprs.length;
  var strLength = str.length;
  for (var _i = 0; _i < strLength; _i++) {
    var expr = _i < exprsLenght ? "${".concat(_i, "}") : '';
    result.push(str[_i] + expr);
  }
  return result.join('');
};
var stringableRewindingIterator = () => ({
  values: [],
  index: -1,
  toString() {
    this.index = (this.index + 1) % this.values.length;
    return this.values[this.index].toString();
  }
});
var removeSpaces = str => str.replace(/\s/g, '');
var mem = {};
// eslint-disable-next-line no-unused-vars
var memoize1 = f => arg => {
  if (mem[arg]) {
    return mem[arg];
  }
  mem[arg] = f(arg);
  return mem[arg];
};
var reg = i => new RegExp("\\$\\{(?:[\\s]+?|\\s?)".concat(i, "(?:[\\s]+?|\\s?)}"));
var memReg = memoize1(reg);
var msgid2Orig = (id, exprs) => {
  return exprs.reduce((r, expr, i) => r.replace(memReg(String(i)), String(expr)), id);
};
var buildStr = (strs, exprs) => {
  var exprsLength = exprs.length - 1;
  return strs.reduce((r, s, i) => r + s + (i <= exprsLength ? exprs[i] : ''), '');
};
var buildArr = (strs, exprs) => {
  return strs.reduce((r, s, i) => {
    return exprs[i] !== undefined ? r.concat(s, exprs[i]) : r.concat(s);
  }, []);
};
function pluralFnBody(pluralStr) {
  return "return args[+ (".concat(pluralStr, ")];");
}
var fnCache = {};
function makePluralFunc(pluralStr) {
  var fn = fnCache[pluralStr];
  if (!fn) {
    fn = new Function('n', 'args', pluralFnBody(pluralStr));
    fnCache[pluralStr] = fn;
  }
  return fn;
}
var pluralRegex = /\splural ?=?([\s\S]*);?/;
function getPluralFunc(headers) {
  var _pluralRegex$exec;
  var pluralFormsHeader = headers['plural-forms'] || headers['Plural-Forms'];
  if (!pluralFormsHeader) {
    throw new Error('po. data should include "language" or "plural-form" header for ngettext');
  }
  var pluralFn = ((_pluralRegex$exec = pluralRegex.exec(pluralFormsHeader)) === null || _pluralRegex$exec === void 0 ? void 0 : _pluralRegex$exec[1]) || [];
  if (pluralFn[pluralFn.length - 1] === ';') {
    pluralFn = pluralFn.slice(0, -1);
  }
  return pluralFn;
}
var variableREG = /\$\{\s*([.\w+\[\]])*\s*\}/g;
function getObjectKeys(obj) {
  var keys = [];
  for (var [_key] of Object.entries(obj)) {
    if (obj.hasOwnProperty(_key)) {
      keys.push(_key);
    }
  }
  return keys;
}
function replaceVariables(str, obj) {
  return str.replace(variableREG, variable => {
    return "${".concat(obj[removeSpaces(variable)], "}");
  });
}
function getVariablesMap(msgid) {
  var variableNumberMap = {};
  var variables = msgid.match(variableREG);
  if (!variables) return null;
  for (var _i2 = 0; _i2 < variables.length; _i2++) {
    var k = removeSpaces(variables[_i2]);
    variableNumberMap[k] = variableNumberMap[k] || stringableRewindingIterator();
    variableNumberMap[k].values.push(_i2);
  }
  return variableNumberMap;
}
function transformTranslate(translate) {
  var variableNumberMap = getVariablesMap(translate.msgid);
  if (!variableNumberMap) {
    return translate;
  }
  var msgid = replaceVariables(translate.msgid, variableNumberMap);
  var newTranslate = {
    msgid,
    msgstr: []
  };
  if (translate.msgid_plural) {
    newTranslate.msgid_plural = replaceVariables(translate.msgid_plural, variableNumberMap);
  }
  var transStrs = translate.msgstr;
  for (var _i3 = 0; _i3 < transStrs.length; _i3++) {
    newTranslate.msgstr.push(replaceVariables(transStrs[_i3], variableNumberMap));
  }
  newTranslate.comments = translate.comments;
  return newTranslate;
}
function transformTranslateObj(translateObj) {
  var newTranslations = {};
  var transKeys = getObjectKeys(translateObj.translations);
  for (var _i4 = 0; _i4 < transKeys.length; _i4++) {
    var _key2 = transKeys[_i4];
    var translation = translateObj.translations[_key2];
    var newTranslation = {};
    var msgids = getObjectKeys(translation);
    for (var j = 0; j < msgids.length; j++) {
      var msgid = msgids[j];
      var newTranslate = transformTranslate(translation[msgid]);
      newTranslation[newTranslate.msgid] = newTranslate;
    }
    newTranslations[_key2] = newTranslation;
  }
  translateObj.translations = newTranslations;
  return translateObj;
}
function transformCompactTranslate(msgid, translations) {
  var variableNumberMap = getVariablesMap(msgid);
  if (!variableNumberMap) {
    return [msgid, translations];
  }
  var newMsgid = replaceVariables(msgid, variableNumberMap);
  var newTranslations = translations.map(trans => {
    return replaceVariables(trans, variableNumberMap);
  });
  return [newMsgid, newTranslations];
}
function findDuplicatingMsgid(msgids, transformedMsgid) {
  return msgids.find(msgid => {
    var variableNumberMap = getVariablesMap(msgid);
    if (!variableNumberMap) {
      return false;
    }
    return replaceVariables(msgid, variableNumberMap) === transformedMsgid;
  });
}
function transformCompactObj(compactObj) {
  var newContexts = {};
  var keys = getObjectKeys(compactObj.contexts);
  for (var _i5 = 0; _i5 < keys.length; _i5++) {
    var ctx = keys[_i5];
    var newContext = {};
    var msgids = getObjectKeys(compactObj.contexts[ctx]);
    for (var j = 0; j < msgids.length; j++) {
      var msgid = msgids[j];
      var translations = compactObj.contexts[ctx][msgid];
      var [newMsgid, newTranslations] = transformCompactTranslate(msgid, translations);
      if ( true && newContext[newMsgid]) {
        var duplicatedMsgid = findDuplicatingMsgid(msgids, newMsgid);
        throw new Error("Duplicate msgid (\"".concat(msgid, "\" and \"").concat(duplicatedMsgid, "\" will be interpreted as the same key \"").concat(newMsgid, "\") this potentially can lead to translation loss.") + " Consider using context for one of those msgid's. See the context doc here - https://ttag.js.org/docs/context.html");
      }
      newContext[newMsgid] = newTranslations;
    }
    newContexts[ctx] = newContext;
  }
  compactObj.contexts = newContexts;
  return compactObj;
}
function dedentStr(rawStr) {
  if (!(typeof rawStr === 'string')) {
    return rawStr;
  }
  if (rawStr.indexOf('\n') === -1) {
    return rawStr;
  }
  return (0,dedent__WEBPACK_IMPORTED_MODULE_0__["default"])(rawStr);
}
function getPluralFnForTrans(config) {
  var headers = config.getCurrentLocaleHeaders();
  var language = headers.language || headers.Language;
  if (language) {
    return Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(language);
  }
  var pluralStr = getPluralFunc(headers);
  return makePluralFunc(pluralStr);
}

/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateLang: () => (/* binding */ validateLang),
/* harmony export */   validateLocaleCode: () => (/* binding */ validateLocaleCode),
/* harmony export */   validateLocaleData: () => (/* binding */ validateLocaleData),
/* harmony export */   validateLocales: () => (/* binding */ validateLocales),
/* harmony export */   validateNgettextMsgid: () => (/* binding */ validateNgettextMsgid),
/* harmony export */   validateNgettextNumber: () => (/* binding */ validateNgettextNumber),
/* harmony export */   validateNgettextPluralForms: () => (/* binding */ validateNgettextPluralForms)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

function validateLocale(locale, availLocales) {
  if (true) {
    if (!availLocales[locale]) {
      throw new Error("\n                    Locale '".concat(locale, "' is not found in config.\n                    useLocales accepts only existing locales. Use addLocale function before.\n                    Available locales: ").concat(JSON.stringify(availLocales)));
    }
  }
}
function validateLocaleCode(locale) {
  if (true) {
    if (typeof locale !== 'string') {
      throw new Error("Expected locale code to be a string but recieved ".concat(typeof locale, " insttead"));
    }
  }
}
function validateLocaleData(data) {
  if (true) {
    // eslint-disable-next-line
    var addLocaleDoc = 'https://ttag.js.org/docs/library-api.html#addlocale';
    if (!data) {
      throw new Error("\n            Locale data should not be empty.\n            see - ".concat(addLocaleDoc, "\n            "));
    }
    if (!data.headers) {
      throw new Error("\n            Locale data should contain headers \"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }
    if (!data.headers['plural-forms'] && !data.headers['Plural-Forms']) {
      throw new Error("\n            Locale data.headers should contain 'Plural-Forms' attribute \"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }
    if (!('translations' in data) && !('contexts' in data)) {
      throw new Error("\n            Locale data should contain translations or contexts property \"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }
    if ('translations' in data && !Object.keys(data.translations).length) {
      throw new Error("\n            Locale data.translations should have at least 1 key\"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }
    if ('contexts' in data && !Object.keys(data.contexts).length) {
      throw new Error("\n            Locale data.contexts should have at least 1 key\"".concat(JSON.stringify(data), "\".\n            see - ").concat(addLocaleDoc, "\n            "));
    }
  }
}
function validateLocales(locales, availLocales) {
  if (true) {
    if (!Array.isArray(locales)) {
      throw new Error('useLocales accepts only array as the first argument');
    }
    locales.forEach(locale => validateLocale(locale, availLocales));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateNgettextMsgid(str) {
  if (true) {
    var ngettextDoc = 'https://ttag.js.org/docs/ngettext.html';
    if (!(str.hasOwnProperty('_strs') && str.hasOwnProperty('_exprs'))) {
      throw new Error("The first argument for ngettext must be tagged with 'msgid' tag.\n                see - ".concat(ngettextDoc, ";\n                "));
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateNgettextNumber(n) {
  if (true) {
    var ngettextDoc = 'https://ttag.js.org/docs/ngettext.html';
    if (!(typeof n === 'number')) {
      throw new Error("The last argument to ngettext - '".concat(n, "' expected to be a number. Got '").concat(typeof n, "' instead.\n                see - ").concat(ngettextDoc));
    }
  }
}
function validateNgettextPluralForms(expectedFormsCount, actualFormsCount) {
  if (true) {
    if (actualFormsCount !== expectedFormsCount) {
      throw new Error( // eslint-disable-next-line max-len
      "ngettext expects ".concat(expectedFormsCount, " for the current default locale, but received - ").concat(actualFormsCount, "."));
    }
  }
}
function validateLang(lang) {
  if (true) {
    var langs = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())().join(',');
    if (!Object(function webpackMissingModule() { var e = new Error("Cannot find module 'plural-forms/minimal-safe'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lang)) {
      throw new Error("Unknown lang code - ".concat(lang, ". Lang should be one of: ").concat(langs, "."));
    }
  }
}

/***/ }),

/***/ "./node_modules/dedent/dist/dedent.mjs":
/*!*********************************************!*\
  !*** ./node_modules/dedent/dist/dedent.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDedent({}));
function createDedent(options) {
  dedent.withOptions = newOptions => createDedent(_objectSpread(_objectSpread({}, options), newOptions));
  return dedent;
  function dedent(strings, ...values) {
    const raw = typeof strings === "string" ? [strings] : strings.raw;
    const {
      escapeSpecialCharacters = Array.isArray(strings)
    } = options;

    // first, perform interpolation
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      let next = raw[i];
      if (escapeSpecialCharacters) {
        // handle escaped newlines, backticks, and interpolation characters
        next = next.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\{/g, "{");
      }
      result += next;
      if (i < values.length) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        result += values[i];
      }
    }

    // now strip indentation
    const lines = result.split("\n");
    let mindent = null;
    for (const l of lines) {
      const m = l.match(/^(\s+)\S+/);
      if (m) {
        const indent = m[1].length;
        if (!mindent) {
          // this is the first indented line
          mindent = indent;
        } else {
          mindent = Math.min(mindent, indent);
        }
      }
    }
    if (mindent !== null) {
      const m = mindent; // appease TypeScript
      result = lines
      // https://github.com/typescript-eslint/typescript-eslint/issues/7140
      // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
      .map(l => l[0] === " " || l[0] === "\t" ? l.slice(m) : l).join("\n");
    }
    return result
    // dedent eats leading and trailing whitespace too
    .trim()
    // handle escaped newlines at the end to ensure they don't get stripped too
    .replace(/\\n/g, "\n");
  }
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Context: () => (/* binding */ Context),
/* harmony export */   TTag: () => (/* binding */ TTag),
/* harmony export */   _: () => (/* binding */ _),
/* harmony export */   addLocale: () => (/* binding */ addLocale),
/* harmony export */   c: () => (/* binding */ c),
/* harmony export */   gettext: () => (/* binding */ gettext),
/* harmony export */   jt: () => (/* binding */ jt),
/* harmony export */   msgid: () => (/* binding */ msgid),
/* harmony export */   ngettext: () => (/* binding */ ngettext),
/* harmony export */   setDedent: () => (/* binding */ setDedent),
/* harmony export */   setDefaultLang: () => (/* binding */ setDefaultLang),
/* harmony export */   t: () => (/* binding */ t),
/* harmony export */   useLocale: () => (/* binding */ useLocale),
/* harmony export */   useLocales: () => (/* binding */ useLocales)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation */ "./src/validation.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config.ts");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



class Context {
  constructor(context) {
    if (true) {
      if (typeof context !== 'string') {
        throw new Error('String type is expected as a first argument to c() function.');
      }
    }
    this.context = context;
    // eslint-disable-next-line no-self-assign
    this.getContext = this.getContext;
  }
  getContext() {
    return this.context;
  }
}
function isFuzzy(translationObj) {
  return translationObj && translationObj.comments && translationObj.comments.flag === 'fuzzy';
}
function hasTranslations(msgstr) {
  if (!msgstr) return false;
  for (var i = 0; i < msgstr.length; i++) {
    if (!msgstr[i].length) return false;
  }
  return true;
}
var separator = /(\${\s*\d+\s*})/g;
var slotIdRegexp = /\${\s*(\d+)\s*}/;
function msgid(strings) {
  if (strings && 'reduce' in strings) {
    for (var _len = arguments.length, exprs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      exprs[_key - 1] = arguments[_key];
    }
    var result = new String((0,_utils__WEBPACK_IMPORTED_MODULE_0__.buildStr)(strings, exprs));
    result._strs = strings;
    result._exprs = exprs;
    return result;
  }
  return strings;
}
class TTag {
  constructor() {
    var _this = this;
    var {
      config,
      context: _context
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      config: new _config__WEBPACK_IMPORTED_MODULE_2__["default"](),
      context: new Context('')
    };
    _defineProperty(this, "maybeDedent", str => {
      return this.conf.isDedent() ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.dedentStr)(str) : str;
    });
    _defineProperty(this, "findTransObj", (locale, str, ctx) => {
      var locales = this.conf.getAvailLocales();
      var localeData = locales[locale];
      if (!localeData) return null;
      // verbose format
      if ('translations' in localeData) {
        var translations = localeData.translations[ctx] || localeData.translations[''];
        var translation = translations && translations[str];
        if (translation && !isFuzzy(translation) && hasTranslations(translation.msgstr)) {
          return translation.msgstr;
        }
      }
      // compact format
      if ('contexts' in localeData) {
        var _translations = localeData.contexts[ctx] || localeData.contexts[''];
        var _translation = _translations && _translations[str];
        if (_translation && hasTranslations(_translation)) {
          return _translation;
        }
      }
      return null;
    });
    _defineProperty(this, "findTranslation", (str, ctx) => {
      var locales = this.conf.getCurrentLocales();
      if (locales.length) {
        for (var i = 0; i < locales.length; i++) {
          var translation = this.findTransObj(locales[i], str, ctx);
          if (translation) {
            this.conf.setCurrentLocale(locales[i]);
            return translation;
          }
        }
      }
      return this.findTransObj(this.conf.getCurrentLocale(), str, ctx);
    });
    _defineProperty(this, "setDefaultLang", lang => {
      if (true) (0,_validation__WEBPACK_IMPORTED_MODULE_1__.validateLang)(lang);
      this.conf.setDefaultLang(lang);
    });
    _defineProperty(this, "useLocales", locales => {
      this.conf.setCurrentLocales(locales);
    });
    _defineProperty(this, "setDedent", value => {
      this.conf.setDedent(Boolean(value));
    });
    _defineProperty(this, "useLocale", locale => {
      this.conf.setCurrentLocale(locale);
    });
    _defineProperty(this, "addLocale", (locale, data) => {
      this.conf.addLocale(locale, data);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _defineProperty(this, "t", function (strings) {
      var result = strings;
      if (strings && 'reduce' in strings) {
        for (var _len2 = arguments.length, exprs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          exprs[_key2 - 1] = arguments[_key2];
        }
        var _id = _this.maybeDedent((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getMsgid)(strings, exprs));
        var context = _this.ctx.getContext();
        var trans = _this.findTranslation(_id, context);
        result = trans ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.msgid2Orig)(trans[0], exprs) : (0,_utils__WEBPACK_IMPORTED_MODULE_0__.buildStr)(strings, exprs);
      }
      return result;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _defineProperty(this, "jt", function (strings) {
      for (var _len3 = arguments.length, exprs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        exprs[_key3 - 1] = arguments[_key3];
      }
      if (strings && 'reduce' in strings) {
        var _id2 = _this.maybeDedent((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getMsgid)(strings, exprs));
        var context = _this.ctx.getContext();
        var trans = _this.findTranslation(_id2, context);
        if (!trans) return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.buildArr)(strings, exprs);

        // splits string & capturing group into tokens

        var translatedTokens = trans[0].split(separator);
        return translatedTokens.map(token => {
          var slotIdMatch = token.match(slotIdRegexp);
          // slotIdMatch is not null only when the token is a variable slot (${xx})
          return slotIdMatch ? exprs[+slotIdMatch[1]] : token;
        });
      }
      return strings;
    });
    _defineProperty(this, "ngettext", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (true) (0,_validation__WEBPACK_IMPORTED_MODULE_1__.validateNgettextMsgid)(args[0]);
      var id = _this.maybeDedent((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getMsgid)(args[0]._strs, args[0]._exprs));
      var n = args[args.length - 1];
      if (true) (0,_validation__WEBPACK_IMPORTED_MODULE_1__.validateNgettextNumber)(n);
      var forms = args.slice(1, -1);
      forms.unshift(args[0].toString());
      if (true) {
        (0,_validation__WEBPACK_IMPORTED_MODULE_1__.validateNgettextPluralForms)(_this.conf.getDefaultPluralFormsCount(), forms.length);
      }
      var trans = _this.findTranslation(id, _this.ctx.getContext());
      if (trans) {
        var _pluralFn = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPluralFnForTrans)(_this.conf);
        var pluralTrans = _pluralFn(n, trans) || '';
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.msgid2Orig)(pluralTrans, args[0]._exprs);
      }
      var pluralFn = _this.conf.getDefaultPluralFn();
      return pluralFn(n, forms);
    });
    _defineProperty(this, "gettext", id => {
      var context = this.ctx.getContext();
      var trans = this.findTranslation(id, context);
      return trans ? trans[0] : id;
    });
    _defineProperty(this, "_", this.gettext);
    _defineProperty(this, "copyWithNewContext", ctx => {
      return new TTag({
        config: this.conf,
        context: new Context(ctx)
      });
    });
    _defineProperty(this, "c", context => {
      var copyTTag = this.copyWithNewContext(context);
      return {
        t: copyTTag.t,
        jt: copyTTag.jt,
        gettext: copyTTag.gettext,
        ngettext: copyTTag.ngettext
      };
    });
    this.conf = config;
    this.ctx = _context || new Context('');
  }
}
var globalTTag = new TTag();
var c = globalTTag.c;
var _ = globalTTag._;
var addLocale = globalTTag.addLocale;
var gettext = globalTTag.gettext;
var jt = globalTTag.jt;
var ngettext = globalTTag.ngettext;
var setDedent = globalTTag.setDedent;
var setDefaultLang = globalTTag.setDefaultLang;
var t = globalTTag.t;
var useLocale = globalTTag.useLocale;
var useLocales = globalTTag.useLocales;
})();

var __webpack_exports__Context = __webpack_exports__.Context;
var __webpack_exports__TTag = __webpack_exports__.TTag;
var __webpack_exports___ = __webpack_exports__._;
var __webpack_exports__addLocale = __webpack_exports__.addLocale;
var __webpack_exports__c = __webpack_exports__.c;
var __webpack_exports__gettext = __webpack_exports__.gettext;
var __webpack_exports__jt = __webpack_exports__.jt;
var __webpack_exports__msgid = __webpack_exports__.msgid;
var __webpack_exports__ngettext = __webpack_exports__.ngettext;
var __webpack_exports__setDedent = __webpack_exports__.setDedent;
var __webpack_exports__setDefaultLang = __webpack_exports__.setDefaultLang;
var __webpack_exports__t = __webpack_exports__.t;
var __webpack_exports__useLocale = __webpack_exports__.useLocale;
var __webpack_exports__useLocales = __webpack_exports__.useLocales;
export { __webpack_exports__Context as Context, __webpack_exports__TTag as TTag, __webpack_exports___ as _, __webpack_exports__addLocale as addLocale, __webpack_exports__c as c, __webpack_exports__gettext as gettext, __webpack_exports__jt as jt, __webpack_exports__msgid as msgid, __webpack_exports__ngettext as ngettext, __webpack_exports__setDedent as setDedent, __webpack_exports__setDefaultLang as setDefaultLang, __webpack_exports__t as t, __webpack_exports__useLocale as useLocale, __webpack_exports__useLocales as useLocales };
