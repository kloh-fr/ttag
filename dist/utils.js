"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStr = exports.buildArr = void 0;
exports.dedentStr = dedentStr;
exports.getMsgid = void 0;
exports.getPluralFnForTrans = getPluralFnForTrans;
exports.getPluralFunc = getPluralFunc;
exports.makePluralFunc = makePluralFunc;
exports.msgid2Orig = void 0;
exports.transformCompactObj = transformCompactObj;
exports.transformTranslateObj = transformTranslateObj;
var _dedent = _interopRequireDefault(require("dedent"));
var _minimalSafe = require("plural-forms/minimal-safe");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getMsgid = exports.getMsgid = function getMsgid(str, exprs) {
  var result = [];
  var exprsLenght = exprs.length;
  var strLength = str.length;
  for (var i = 0; i < strLength; i++) {
    var expr = i < exprsLenght ? "${".concat(i, "}") : '';
    result.push(str[i] + expr);
  }
  return result.join('');
};
var stringableRewindingIterator = function stringableRewindingIterator() {
  return {
    values: [],
    index: -1,
    toString: function toString() {
      this.index = (this.index + 1) % this.values.length;
      return this.values[this.index].toString();
    }
  };
};
var removeSpaces = function removeSpaces(str) {
  return str.replace(/\s/g, '');
};
var mem = {};
var memoize1 = function memoize1(f) {
  return function (arg) {
    if (mem[arg]) {
      return mem[arg];
    }
    mem[arg] = f(arg);
    return mem[arg];
  };
};
var reg = function reg(i) {
  return new RegExp("\\$\\{(?:[\\s]+?|\\s?)".concat(i, "(?:[\\s]+?|\\s?)}"));
};
var memReg = memoize1(reg);
var msgid2Orig = exports.msgid2Orig = function msgid2Orig(id, exprs) {
  return exprs.reduce(function (r, expr, i) {
    return r.replace(memReg(i), expr);
  }, id);
};
var buildStr = exports.buildStr = function buildStr(strs, exprs) {
  var exprsLength = exprs.length - 1;
  return strs.reduce(function (r, s, i) {
    return r + s + (i <= exprsLength ? exprs[i] : '');
  }, '');
};
var buildArr = exports.buildArr = function buildArr(strs, exprs) {
  return strs.reduce(function (r, s, i) {
    return exprs[i] !== undefined ? r.concat(s, exprs[i]) : r.concat(s);
  }, []);
};
function pluralFnBody(pluralStr) {
  return "return args[+ (".concat(pluralStr, ")];");
}
var fnCache = {};
function makePluralFunc(pluralStr) {
  /* eslint-disable no-new-func */
  var fn = fnCache[pluralStr];
  if (!fn) {
    fn = new Function('n', 'args', pluralFnBody(pluralStr));
    fnCache[pluralStr] = fn;
  }
  return fn;
}
var pluralRegex = /\splural ?=?([\s\S]*);?/;
function getPluralFunc(headers) {
  var pluralFormsHeader = headers['plural-forms'] || headers['Plural-Forms'];
  if (!pluralFormsHeader) {
    throw new Error('po. data should include "language" or "plural-form" header for ngettext');
  }
  var pluralFn = pluralRegex.exec(pluralFormsHeader)[1];
  if (pluralFn[pluralFn.length - 1] === ';') {
    pluralFn = pluralFn.slice(0, -1);
  }
  return pluralFn;
}
var variableREG = /\$\{\s*([.\w+\[\]])*\s*\}/g;
function getObjectKeys(obj) {
  var keys = [];
  for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      _ = _Object$entries$_i[1];
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}
function replaceVariables(str, obj) {
  return str.replace(variableREG, function (variable) {
    return "${".concat(obj[removeSpaces(variable)], "}");
  });
}
function getVariablesMap(msgid) {
  var variableNumberMap = {};
  var variables = msgid.match(variableREG);
  if (!variables) return null;
  for (var i = 0; i < variables.length; i++) {
    var k = removeSpaces(variables[i]);
    variableNumberMap[k] = variableNumberMap[k] || stringableRewindingIterator();
    variableNumberMap[k].values.push(i);
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
    msgid: msgid
  };
  if (translate.msgid_plural) {
    newTranslate.msgid_plural = replaceVariables(translate.msgid_plural, variableNumberMap);
  }
  newTranslate.msgstr = [];
  var transStrs = translate.msgstr;
  for (var i = 0; i < transStrs.length; i++) {
    newTranslate.msgstr.push(replaceVariables(transStrs[i], variableNumberMap));
  }
  newTranslate.comments = translate.comments;
  return newTranslate;
}
function transformTranslateObj(translateObj) {
  var newTranslations = {};
  var transKeys = getObjectKeys(translateObj.translations);
  for (var i = 0; i < transKeys.length; i++) {
    var key = transKeys[i];
    var translation = translateObj.translations[key];
    var newTranslation = {};
    var msgids = getObjectKeys(translation);
    for (var j = 0; j < msgids.length; j++) {
      var msgid = msgids[j];
      var newTranslate = transformTranslate(translation[msgid]);
      newTranslation[newTranslate.msgid] = newTranslate;
    }
    newTranslations[key] = newTranslation;
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
  var newTranslations = translations.map(function (trans) {
    return replaceVariables(trans, variableNumberMap);
  });
  return [newMsgid, newTranslations];
}
function transformCompactObj(compactObj) {
  var newObj = {
    headers: compactObj.headers
  };
  var newContexts = {};
  var keys = getObjectKeys(compactObj.contexts);
  for (var i = 0; i < keys.length; i++) {
    var ctx = keys[i];
    var newContext = {};
    var msgids = getObjectKeys(compactObj.contexts[ctx]);
    for (var j = 0; j < msgids.length; j++) {
      var msgid = msgids[j];
      var translations = compactObj.contexts[ctx][msgid];
      var _transformCompactTran = transformCompactTranslate(msgid, translations),
        _transformCompactTran2 = _slicedToArray(_transformCompactTran, 2),
        newMsgid = _transformCompactTran2[0],
        newTranslations = _transformCompactTran2[1];
      newContext[newMsgid] = newTranslations;
    }
    newContexts[ctx] = newContext;
  }
  newObj.contexts = newContexts;
  return newObj;
}
function dedentStr(rawStr) {
  if (!(typeof rawStr === 'string')) {
    return rawStr;
  }
  if (rawStr.indexOf('\n') === -1) {
    return rawStr;
  }
  return (0, _dedent["default"])(rawStr);
}
function getPluralFnForTrans(config) {
  var headers = config.getCurrentLocaleHeaders();
  var language = headers.language || headers.Language;
  if (language) {
    return (0, _minimalSafe.getPluralFunc)(language);
  }
  var pluralStr = getPluralFunc(headers);
  return makePluralFunc(pluralStr);
}