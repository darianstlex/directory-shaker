"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const esm = require('esm')(module);

const fs = require('fs');

const getTreeObj = function getTreeObj(path) {
  let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$recursive = _ref.recursive,
      recursive = _ref$recursive === void 0 ? true : _ref$recursive,
      _ref$spreadIndex = _ref.spreadIndex,
      spreadIndex = _ref$spreadIndex === void 0 ? true : _ref$spreadIndex,
      _ref$pattern = _ref.pattern,
      pattern = _ref$pattern === void 0 ? /^.*\.js$/ : _ref$pattern,
      _ref$filter = _ref.filter,
      filter = _ref$filter === void 0 ? () => true : _ref$filter;

  for (var _len = arguments.length, parsers = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    parsers[_key - 2] = arguments[_key];
  }

  let tree = {};
  const extra = parsers.reduce((acc, item) => _objectSpread({}, acc, {
    [item.name]: {}
  }), {});

  const dirToObj = (path, obj) => {
    fs.readdirSync(path).map(name => {
      const target = `${path}/${name}`;
      const node = fs.statSync(target);

      if (node.isFile()) {
        if (!pattern.test(name)) return;

        const _name$match = name.match(/^(.+)\.[^.]{2,4}$/),
              _name$match2 = _slicedToArray(_name$match, 2),
              fileName = _name$match2[1];

        const module = esm(target);
        const data = module.default || module;
        if (!filter(data)) return;
        parsers.map((_ref2) => {
          let name = _ref2.name,
              map = _ref2.map,
              key = _ref2.key;
          return extra[name][data[key]] = map(data);
        });
        if (spreadIndex && fileName === 'index') obj = Object.assign(obj, data);else obj[fileName] = data;
      } else if (recursive && node.isDirectory()) {
        obj[name] = {};
        dirToObj(target, obj[name]);
      }
    });
  };

  dirToObj(path, tree);
  return _objectSpread({
    tree
  }, extra);
};

var _default = getTreeObj;
exports.default = _default;