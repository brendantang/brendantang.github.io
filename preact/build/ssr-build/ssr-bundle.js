module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// CONCATENATED MODULE: ../node_modules/preact-router/dist/preact-router.es.js


var EMPTY$1 = {};

function preact_router_es_assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.props;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.props.default ? 0 : rank(vnode.props.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (preact_router_es_canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function preact_router_es_canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}
	routeFromLink(e.currentTarget || e.target || this);
	return prevent(e);
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href')) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var preact_router_es_Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		var children = Object(preact_min["toChildArray"])(this.props.children);
		return this.getMatchingChildren(children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this.setState({ url: url });

		var didRoute = this.canRoute(url);

		// trigger a manual re-route if we're not in the middle of an update:
		if (!this.updating) {
			this.forceUpdate();
		}

		return didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.props.path, vnode.props);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					preact_router_es_assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(preact_min["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(Object(preact_min["toChildArray"])(children), url, true);

		var current = active[0] || null;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact_min["Component"]);

var preact_router_es_Link = function Link(props) {
	return Object(preact_min["createElement"])('a', preact_router_es_assign({ onClick: handleLinkClick }, props));
};

var preact_router_es_Route = function Route(props) {
	return Object(preact_min["createElement"])(props.component, props);
};

preact_router_es_Router.subscribers = subscribers;
preact_router_es_Router.getCurrentUrl = getCurrentUrl;
preact_router_es_Router.route = route;
preact_router_es_Router.Router = preact_router_es_Router;
preact_router_es_Router.Route = preact_router_es_Route;
preact_router_es_Router.Link = preact_router_es_Link;
preact_router_es_Router.exec = exec;

/* harmony default export */ var preact_router_es = (preact_router_es_Router);
//# sourceMappingURL=preact-router.es.js.map
// EXTERNAL MODULE: ./components/email_button/style.css
var style = __webpack_require__("rQtc");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./components/email_button/index.js




var _ref = Object(preact_min["h"])(
  'a',
  { href: 'mailto: b@brendantang.net', 'class': 'email-button', ontouchstart: '' },
  ' b@brendantang.net '
);

var EmailButton = function EmailButton() {
  return _ref;
};

/* harmony default export */ var email_button = (EmailButton);
// CONCATENATED MODULE: ./components/layout/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var layout__ref = Object(preact_min["h"])(
  'div',
  null,
  Object(preact_min["h"])(
    'div',
    { 'class': 'layout' },
    Object(preact_min["h"])(email_button, null)
  )
);

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Layout.prototype.render = function render() {
    return layout__ref;
  };

  return Layout;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./styles/style.css
var styles_style = __webpack_require__("iVor");
var styles_style_default = /*#__PURE__*/__webpack_require__.n(styles_style);

// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var app__ref = Object(preact_min["h"])(Layout, null);

var App = function (_Component) {
  app__inherits(App, _Component);

  function App() {
    app__classCallCheck(this, App);

    return app__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return app__ref;
  };

  return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js


/* harmony default export */ var index = __webpack_exports__["default"] = (App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports) {

!function () {
  var n,
      l,
      u,
      t,
      i,
      o,
      r,
      e,
      f = {},
      c = [],
      a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n, l) {
    for (var u in l) {
      n[u] = l[u];
    }return n;
  }function v(n) {
    var l = n.parentNode;l && l.removeChild(n);
  }function h(n, l, u) {
    var t,
        i = arguments,
        o = {};for (t in l) {
      "key" !== t && "ref" !== t && (o[t] = l[t]);
    }if (arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) {
      u.push(i[t]);
    }if (null != u && (o.children = u), "function" == typeof n && null != n.defaultProps) for (t in n.defaultProps) {
      void 0 === o[t] && (o[t] = n.defaultProps[t]);
    }return y(n, o, l && l.key, l && l.ref, null);
  }function y(l, u, t, i, o) {
    var r = { type: l, props: u, key: t, ref: i, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: o };return null == o && (r.__v = r), n.vnode && n.vnode(r), r;
  }function p(n) {
    return n.children;
  }function d(n, l) {
    this.props = n, this.context = l;
  }function _(n, l) {
    if (null == l) return n.__ ? _(n.__, n.__.__k.indexOf(n) + 1) : null;for (var u; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    }return "function" == typeof n.type ? _(n) : null;
  }function m(n) {
    var l, u;if (null != (n = n.__) && null != n.__c) {
      for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
        if (null != (u = n.__k[l]) && null != u.__e) {
          n.__e = n.__c.base = u.__e;break;
        }
      }return m(n);
    }
  }function k(l) {
    (!l.__d && (l.__d = !0) && u.push(l) && !w.__r++ || i !== n.debounceRendering) && ((i = n.debounceRendering) || t)(w);
  }function w() {
    for (var n; w.__r = u.length;) {
      n = u.sort(function (n, l) {
        return n.__v.__b - l.__v.__b;
      }), u = [], n.some(function (n) {
        var l, u, t, i, o, r, e;n.__d && (r = (o = (l = n).__v).__e, (e = l.__P) && (u = [], (t = s({}, o)).__v = t, i = N(e, o, t, l.__n, void 0 !== e.ownerSVGElement, null, u, null == r ? _(o) : r), z(u, o), i != r && m(o)));
      });
    }
  }function g(n, l, u, t, i, o, r, e, a, s) {
    var h,
        d,
        m,
        k,
        w,
        g,
        x,
        C = t && t.__k || c,
        A = C.length;for (a == f && (a = null != r ? r[0] : A ? _(t, 0) : null), u.__k = [], h = 0; h < l.length; h++) {
      if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k ? y(null, k, null, null, k) : Array.isArray(k) ? y(p, { children: k }, null, null, null) : null != k.__e || null != k.__c ? y(k.type, k.props, k.key, null, k.__v) : k)) {
        if (k.__ = u, k.__b = u.__b + 1, null === (m = C[h]) || m && k.key == m.key && k.type === m.type) C[h] = void 0;else for (d = 0; d < A; d++) {
          if ((m = C[d]) && k.key == m.key && k.type === m.type) {
            C[d] = void 0;break;
          }m = null;
        }w = N(n, k, m = m || f, i, o, r, e, a, s), (d = k.ref) && m.ref != d && (x || (x = []), m.ref && x.push(m.ref, null, k), x.push(d, k.__c || w, k)), null != w ? (null == g && (g = w), a = b(n, k, m, C, r, w, a), "option" == u.type ? n.value = "" : "function" == typeof u.type && (u.__d = a)) : a && m.__e == a && a.parentNode != n && (a = _(m));
      }
    }if (u.__e = g, null != r && "function" != typeof u.type) for (h = r.length; h--;) {
      null != r[h] && v(r[h]);
    }for (h = A; h--;) {
      null != C[h] && j(C[h], C[h]);
    }if (x) for (h = 0; h < x.length; h++) {
      $(x[h], x[++h], x[++h]);
    }
  }function b(n, l, u, t, i, o, r) {
    var e, f, c;if (void 0 !== l.__d) e = l.__d, l.__d = void 0;else if (i == u || o != r || null == o.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(o), e = null;else {
      for (f = r, c = 0; (f = f.nextSibling) && c < t.length; c += 2) {
        if (f == o) break n;
      }n.insertBefore(o, r), e = r;
    }return void 0 !== e ? e : o.nextSibling;
  }function x(n, l, u, t, i) {
    var o;for (o in u) {
      "children" === o || "key" === o || o in l || A(n, o, null, u[o], t);
    }for (o in l) {
      i && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || A(n, o, l[o], u[o], t);
    }
  }function C(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === a.test(l) ? u + "px" : null == u ? "" : u;
  }function A(n, l, u, t, i) {
    var o, r, e, f, c;if (i ? "className" === l && (l = "class") : "class" === l && (l = "className"), "style" === l) {
      if (o = n.style, "string" == typeof u) o.cssText = u;else {
        if ("string" == typeof t && (o.cssText = "", t = null), t) for (f in t) {
          u && f in u || C(o, f, "");
        }if (u) for (c in u) {
          t && u[c] === t[c] || C(o, c, u[c]);
        }
      }
    } else "o" === l[0] && "n" === l[1] ? (r = l !== (l = l.replace(/Capture$/, "")), e = l.toLowerCase(), l = (e in n ? e : l).slice(2), u ? (t || n.addEventListener(l, P, r), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, P, r)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
  }function P(l) {
    this.l[l.type](n.event ? n.event(l) : l);
  }function E(n, l, u) {
    var t, i;for (t = 0; t < n.__k.length; t++) {
      (i = n.__k[t]) && (i.__ = n, i.__e && ("function" == typeof i.type && i.__k.length > 1 && E(i, l, u), l = b(u, i, i, n.__k, null, i.__e, l), "function" == typeof n.type && (n.__d = l)));
    }
  }function N(l, u, t, i, o, r, e, f, c) {
    var a,
        v,
        h,
        y,
        _,
        m,
        k,
        w,
        b,
        x,
        C,
        A = u.type;if (void 0 !== u.constructor) return null;(a = n.__b) && a(u);try {
      n: if ("function" == typeof A) {
        if (w = u.props, b = (a = A.contextType) && i[a.__c], x = a ? b ? b.props.value : a.__ : i, t.__c ? k = (v = u.__c = t.__c).__ = v.__E : ("prototype" in A && A.prototype.render ? u.__c = v = new A(w, x) : (u.__c = v = new d(w, x), v.constructor = A, v.render = F), b && b.sub(v), v.props = w, v.state || (v.state = {}), v.context = x, v.__n = i, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != A.getDerivedStateFromProps && (v.__s == v.state && (v.__s = s({}, v.__s)), s(v.__s, A.getDerivedStateFromProps(w, v.__s))), y = v.props, _ = v.state, h) null == A.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
          if (null == A.getDerivedStateFromProps && w !== y && null != v.componentWillReceiveProps && v.componentWillReceiveProps(w, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(w, v.__s, x) || u.__v === t.__v) {
            v.props = w, v.state = v.__s, u.__v !== t.__v && (v.__d = !1), v.__v = u, u.__e = t.__e, u.__k = t.__k, v.__h.length && e.push(v), E(u, f, l);break n;
          }null != v.componentWillUpdate && v.componentWillUpdate(w, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
            v.componentDidUpdate(y, _, m);
          });
        }v.context = x, v.props = w, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (i = s(s({}, i), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (m = v.getSnapshotBeforeUpdate(y, _)), C = null != a && a.type == p && null == a.key ? a.props.children : a, g(l, Array.isArray(C) ? C : [C], u, t, i, o, r, e, f, c), v.base = u.__e, v.__h.length && e.push(v), k && (v.__E = v.__ = null), v.__e = !1;
      } else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = T(t.__e, u, t, i, o, r, e, c);(a = n.diffed) && a(u);
    } catch (l) {
      u.__v = null, n.__e(l, u, t);
    }return u.__e;
  }function z(l, u) {
    n.__c && n.__c(u, l), l.some(function (u) {
      try {
        l = u.__h, u.__h = [], l.some(function (n) {
          n.call(u);
        });
      } catch (l) {
        n.__e(l, u.__v);
      }
    });
  }function T(n, l, u, t, i, o, r, e) {
    var a,
        s,
        v,
        h,
        y,
        p = u.props,
        d = l.props;if (i = "svg" === l.type || i, null != o) for (a = 0; a < o.length; a++) {
      if (null != (s = o[a]) && ((null === l.type ? 3 === s.nodeType : s.localName === l.type) || n == s)) {
        n = s, o[a] = null;break;
      }
    }if (null == n) {
      if (null === l.type) return document.createTextNode(d);n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, d.is && { is: d.is }), o = null, e = !1;
    }if (null === l.type) p !== d && n.data != d && (n.data = d);else {
      if (null != o && (o = c.slice.call(n.childNodes)), v = (p = u.props || f).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !e) {
        if (null != o) for (p = {}, y = 0; y < n.attributes.length; y++) {
          p[n.attributes[y].name] = n.attributes[y].value;
        }(h || v) && (h && v && h.__html == v.__html || (n.innerHTML = h && h.__html || ""));
      }x(n, d, p, i, e), h ? l.__k = [] : (a = l.props.children, g(n, Array.isArray(a) ? a : [a], l, u, t, "foreignObject" !== l.type && i, o, r, f, e)), e || ("value" in d && void 0 !== (a = d.value) && a !== n.value && A(n, "value", a, p.value, !1), "checked" in d && void 0 !== (a = d.checked) && a !== n.checked && A(n, "checked", a, p.checked, !1));
    }return n;
  }function $(l, u, t) {
    try {
      "function" == typeof l ? l(u) : l.current = u;
    } catch (l) {
      n.__e(l, t);
    }
  }function j(l, u, t) {
    var i, o, r;if (n.unmount && n.unmount(l), (i = l.ref) && (i.current && i.current !== l.__e || $(i, null, u)), t || "function" == typeof l.type || (t = null != (o = l.__e)), l.__e = l.__d = void 0, null != (i = l.__c)) {
      if (i.componentWillUnmount) try {
        i.componentWillUnmount();
      } catch (l) {
        n.__e(l, u);
      }i.base = i.__P = null;
    }if (i = l.__k) for (r = 0; r < i.length; r++) {
      i[r] && j(i[r], u, t);
    }null != o && v(o);
  }function F(n, l, u) {
    return this.constructor(n, u);
  }function H(l, u, t) {
    var i, r, e;n.__ && n.__(l, u), r = (i = t === o) ? null : t && t.__k || u.__k, l = h(p, null, [l]), e = [], N(u, (i ? u : t || u).__k = l, r || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : r ? null : u.childNodes.length ? c.slice.call(u.childNodes) : null, e, t || f, i), z(e, l);
  }n = { __e: function __e(n, l) {
      for (var u, t; l = l.__;) {
        if ((u = l.__c) && !u.__) try {
          if (u.constructor && null != u.constructor.getDerivedStateFromError && (t = !0, u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (t = !0, u.componentDidCatch(n)), t) return k(u.__E = u);
        } catch (l) {
          n = l;
        }
      }throw n;
    } }, l = function l(n) {
    return null != n && void 0 === n.constructor;
  }, d.prototype.setState = function (n, l) {
    var u;u = this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && s(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
  }, d.prototype.forceUpdate = function (n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
  }, d.prototype.render = p, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, w.__r = 0, o = f, r = 0, e = { render: H, hydrate: function hydrate(n, l) {
      H(n, l, o);
    }, createElement: h, h: h, Fragment: p, createRef: function createRef() {
      return { current: null };
    }, isValidElement: l, Component: d, cloneElement: function cloneElement(n, l) {
      var u, t;for (t in l = s(s({}, n.props), l), arguments.length > 2 && (l.children = c.slice.call(arguments, 2)), u = {}, l) {
        "key" !== t && "ref" !== t && (u[t] = l[t]);
      }return y(n.type, u, l.key || n.key, l.ref || n.ref, null);
    }, createContext: function createContext(n) {
      var l = {},
          u = { __c: "__cC" + r++, __: n, Consumer: function Consumer(n, l) {
          return n.children(l);
        }, Provider: function Provider(n) {
          var t,
              i = this;return this.getChildContext || (t = [], this.getChildContext = function () {
            return l[u.__c] = i, l;
          }, this.shouldComponentUpdate = function (n) {
            i.props.value !== n.value && t.some(function (l) {
              l.context = n.value, k(l);
            });
          }, this.sub = function (n) {
            t.push(n);var l = n.componentWillUnmount;n.componentWillUnmount = function () {
              t.splice(t.indexOf(n), 1), l && l.call(n);
            };
          }), n.children;
        } };return u.Consumer.contextType = u, u.Provider.__ = u, u;
    }, toChildArray: function n(l) {
      return null == l || "boolean" == typeof l ? [] : Array.isArray(l) ? c.concat.apply([], l.map(n)) : [l];
    }, __u: j, options: n }, typeof module < "u" ? module.exports = e : self.preact = e;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "iVor":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rQtc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"email-button":"email-button__1a-Zm"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map