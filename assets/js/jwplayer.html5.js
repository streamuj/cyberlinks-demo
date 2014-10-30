(function(g) {
    g.html5 = {};
    g.html5.version = "6.8.4616"
})(jwplayer);
(function(g) {
    var h = document;
    g.parseDimension = function(a) {
        return "string" == typeof a ? "" === a ? 0 : -1 < a.lastIndexOf("%") ? a : parseInt(a.replace("px", ""), 10) : a
    };
    g.timeFormat = function(a) {
        if (0 < a) {
            var c = Math.floor(a / 3600),
                e = Math.floor((a - 3600 * c) / 60);
            a = Math.floor(a % 60);
            return (c ? c + ":" : "") + (10 > e ? "0" : "") + e + ":" + (10 > a ? "0" : "") + a
        }
        return "00:00"
    };
    g.bounds = function(a) {
        var c = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!a || !h.body.contains(a)) return c;
        if (a.getBoundingClientRect) {
            a = a.getBoundingClientRect(a);
            var e = window.pageYOffset,
                b = window.pageXOffset;
            if (!a.width && !a.height && !a.left && !a.top) return c;
            c.left = a.left + b;
            c.right = a.right + b;
            c.top = a.top + e;
            c.bottom = a.bottom + e;
            c.width = a.right - a.left;
            c.height = a.bottom - a.top
        } else {
            c.width = a.offsetWidth | 0;
            c.height = a.offsetHeight | 0;
            do c.left += a.offsetLeft | 0, c.top += a.offsetTop | 0; while (a = a.offsetParent);
            c.right = c.left + c.width;
            c.bottom = c.top + c.height
        }
        return c
    };
    g.empty = function(a) {
        if (a)
            for (; 0 < a.childElementCount;) a.removeChild(a.children[0])
    }
})(jwplayer.utils);
(function(g) {
    function h(a, b, c) {
        if (!e.exists(b)) return "";
        c = c ? " !important" : "";
        return isNaN(b) ? b.match(/png|gif|jpe?g/i) && 0 > b.indexOf("url") ? "url(" + b + ")" : b + c : 0 === b || "z-index" === a || "opacity" === a ? "" + b + c : /color/i.test(a) ? "#" + e.pad(b.toString(16).replace(/^0x/i, ""), 6) + c : Math.ceil(b) + "px" + c
    }

    function a(a, b) {
        for (var c = 0; c < a.length; c++) {
            var d = a[c],
                e, f;
            for (e in b) {
                f = e;
                f = f.split("-");
                for (var h = 1; h < f.length; h++) f[h] = f[h].charAt(0).toUpperCase() + f[h].slice(1);
                f = f.join("");
                d.style[f] !== b[e] && (d.style[f] = b[e])
            }
        }
    }

    function c(a) {
        var c = b[a].sheet,
            d, e, h;
        if (c) {
            d = c.cssRules;
            e = l[a];
            h = a;
            var u = f[h];
            h += " { ";
            for (var m in u) h += m + ": " + u[m] + "; ";
            h += "}";
            if (void 0 !== e && e < d.length && d[e].selectorText === a) {
                if (h === d[e].cssText) return;
                c.deleteRule(e)
            } else e = d.length, l[a] = e;
            c.insertRule(h, e)
        }
    }
    var e = g.utils,
        b = {},
        d, f = {},
        u = null,
        l = {},
        m = e.css = function(a, e, l) {
            f[a] || (f[a] = {});
            var j = f[a];
            l = l || !1;
            var m = !1,
                g, w;
            for (g in e) w = h(g, e[g], l), "" !== w ? w !== j[g] && (j[g] = w, m = !0) : void 0 !== j[g] && (delete j[g], m = !0);
            if (m) {
                if (!b[a]) {
                    if (!d || 5E4 < d.sheet.cssRules.length) e =
                        document.createElement("style"), e.type = "text/css", document.getElementsByTagName("head")[0].appendChild(e), d = e;
                    b[a] = d
                }
                null !== u ? u.styleSheets[a] = f[a] : c(a)
            }
        };
    m.style = function(b, c, d) {
        if (!(void 0 === b || null === b)) {
            void 0 === b.length && (b = [b]);
            var e = {},
                f;
            for (f in c) e[f] = h(f, c[f]);
            if (null !== u && !d) {
                c = (c = b.__cssRules) || {};
                for (var l in e) c[l] = e[l];
                b.__cssRules = c;
                0 > u.elements.indexOf(b) && u.elements.push(b)
            } else a(b, e)
        }
    };
    m.block = function(a) {
        null === u && (u = {
            id: a,
            styleSheets: {},
            elements: []
        })
    };
    m.unblock = function(b) {
        if (u &&
            (!b || u.id === b)) {
            for (var d in u.styleSheets) c(d);
            for (b = 0; b < u.elements.length; b++) d = u.elements[b], a(d, d.__cssRules);
            u = null
        }
    };
    e.clearCss = function(a) {
        for (var d in f) 0 <= d.indexOf(a) && delete f[d];
        for (var e in b) 0 <= e.indexOf(a) && c(e)
    };
    e.transform = function(a, b) {
        var c = {};
        b = b || "";
        c.transform = b;
        c["-webkit-transform"] = b;
        c["-ms-transform"] = b;
        c["-moz-transform"] = b;
        c["-o-transform"] = b;
        "string" === typeof a ? m(a, c) : m.style(a, c)
    };
    e.dragStyle = function(a, b) {
        m(a, {
            "-webkit-user-select": b,
            "-moz-user-select": b,
            "-ms-user-select": b,
            "-webkit-user-drag": b,
            "user-select": b,
            "user-drag": b
        })
    };
    e.transitionStyle = function(a, b) {
        navigator.userAgent.match(/5\.\d(\.\d)? safari/i) || m(a, {
            "-webkit-transition": b,
            "-moz-transition": b,
            "-o-transition": b,
            transition: b
        })
    };
    e.rotate = function(a, b) {
        e.transform(a, "rotate(" + b + "deg)")
    };
    e.rgbHex = function(a) {
        a = String(a).replace("#", "");
        3 === a.length && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
        return "#" + a.substr(-6)
    };
    e.hexToRgba = function(a, b) {
        var c = "rgb",
            d = [parseInt(a.substr(1, 2), 16), parseInt(a.substr(3, 2), 16), parseInt(a.substr(5,
                2), 16)];
        void 0 !== b && 100 !== b && (c += "a", d.push(b / 100));
        return c + "(" + d.join(",") + ")"
    };
    m(".jwplayer ".slice(0, -1) + " div span a img ul li video".split(" ").join(", .jwplayer ") + ", .jwclick", {
        margin: 0,
        padding: 0,
        border: 0,
        color: "#000000",
        "font-size": "100%",
        font: "inherit",
        "vertical-align": "baseline",
        "background-color": "transparent",
        "text-align": "left",
        direction: "ltr",
        "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)"
    });
    m(".jwplayer ul", {
        "list-style": "none"
    })
})(jwplayer);
(function(g) {
    var h = g.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    };
    g.scale = function(a, c, e, b, d) {
        var f = "";
        c = c || 1;
        e = e || 1;
        b |= 0;
        d |= 0;
        if (1 !== c || 1 !== e) f = "scale(" + c + ", " + e + ")";
        if (b || d) f = "translate(" + b + "px, " + d + "px)";
        g.transform(a, f)
    };
    g.stretch = function(a, c, e, b, d, f) {
        if (!c || !e || !b || !d || !f) return !1;
        a = a || h.UNIFORM;
        var u = 2 * Math.ceil(e / 2) / d,
            l = 2 * Math.ceil(b / 2) / f,
            m = "video" === c.tagName.toLowerCase(),
            r = !1,
            n = "jw" + a.toLowerCase();
        switch (a.toLowerCase()) {
            case h.FILL:
                u > l ? l = u : u = l;
                r = !0;
                break;
            case h.NONE:
                u = l = 1;
            case h.EXACTFIT:
                r = !0;
                break;
            default:
                u > l ? 0.95 < d * l / e ? (r = !0, n = "jwexactfit") : (d *= l, f *= l) : 0.95 < f * u / b ? (r = !0, n = "jwexactfit") : (d *= u, f *= u), r && (u = 2 * Math.ceil(e / 2) / d, l = 2 * Math.ceil(b / 2) / f)
        }
        m ? (a = {
            left: "",
            right: "",
            width: "",
            height: ""
        }, r ? (e < d && (a.left = a.right = Math.ceil((e - d) / 2)), b < f && (a.top = a.bottom = Math.ceil((b - f) / 2)), a.width = d, a.height = f, g.scale(c, u, l, 0, 0)) : (r = !1, g.transform(c)), g.css.style(c, a)) : c.className = c.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "") + " " + n;
        return r
    }
})(jwplayer.utils);
(function(g) {
    g.dfxp = function() {
        var h = jwplayer.utils.seconds;
        this.parse = function(a) {
            var c = [{
                begin: 0,
                text: ""
            }];
            a = a.replace(/^\s+/, "").replace(/\s+$/, "");
            var e = a.split("\x3c/p\x3e"),
                b = a.split("\x3c/tt:p\x3e"),
                d = [];
            for (a = 0; a < e.length; a++) 0 <= e[a].indexOf("\x3cp") && (e[a] = e[a].substr(e[a].indexOf("\x3cp") + 2).replace(/^\s+/, "").replace(/\s+$/, ""), d.push(e[a]));
            for (a = 0; a < b.length; a++) 0 <= b[a].indexOf("\x3ctt:p") && (b[a] = b[a].substr(b[a].indexOf("\x3ctt:p") + 5).replace(/^\s+/, "").replace(/\s+$/, ""), d.push(b[a]));
            e = d;
            for (a = 0; a < e.length; a++) {
                b = e[a];
                d = {};
                try {
                    var f = b.indexOf('begin\x3d"'),
                        b = b.substr(f + 7),
                        f = b.indexOf('" end\x3d"');
                    d.begin = h(b.substr(0, f));
                    b = b.substr(f + 7);
                    f = b.indexOf('"');
                    d.end = h(b.substr(0, f));
                    f = b.indexOf('"\x3e');
                    b = b.substr(f + 2);
                    d.text = b
                } catch (u) {}
                b = d;
                b.text && (c.push(b), b.end && (c.push({
                    begin: b.end,
                    text: ""
                }), delete b.end))
            }
            if (1 < c.length) return c;
            throw {
                message: "Invalid DFXP file:"
            };
        }
    }
})(jwplayer.parsers);
(function(g) {
    g.srt = function() {
        var h = jwplayer.utils,
            a = h.seconds;
        this.parse = function(c, e) {
            var b = e ? [] : [{
                begin: 0,
                text: ""
            }];
            c = h.trim(c);
            var d = c.split("\r\n\r\n");
            1 == d.length && (d = c.split("\n\n"));
            for (var f = 0; f < d.length; f++)
                if ("WEBVTT" != d[f]) {
                    var u, l = d[f];
                    u = {};
                    var m = l.split("\r\n");
                    1 == m.length && (m = l.split("\n"));
                    try {
                        l = 1;
                        0 < m[0].indexOf(" --\x3e ") && (l = 0);
                        var r = m[l].indexOf(" --\x3e ");
                        0 < r && (u.begin = a(m[l].substr(0, r)), u.end = a(m[l].substr(r + 5)));
                        if (m[l + 1]) {
                            u.text = m[l + 1];
                            for (l += 2; l < m.length; l++) u.text += "\x3cbr/\x3e" +
                                m[l]
                        }
                    } catch (n) {}
                    u.text && (b.push(u), u.end && !e && (b.push({
                        begin: u.end,
                        text: ""
                    }), delete u.end))
                }
            if (1 < b.length) return b;
            throw {
                message: "Invalid SRT file"
            };
        }
    }
})(jwplayer.parsers);
(function(g) {
    var h = g.utils,
        a = h.css,
        c = !0,
        e = !1,
        b = g.events,
        d = 80,
        f = 30;
    g.html5.adskipbutton = function(u, l, m, r) {
        function n(a) {
            if (!(0 > p)) {
                var b = v.getContext("2d");
                b.clearRect(0, 0, d, f);
                w(b, 0, 0, d, f, 5, c, e, e);
                w(b, 0, 0, d, f, 5, e, c, e);
                b.fillStyle = "#979797";
                b.globalAlpha = 1;
                var k = v.width / 2,
                    j = v.height / 2;
                b.textAlign = "center";
                b.font = "Bold 11px Sans-Serif";
                b.fillText(m.replace(/xx/gi, Math.ceil(p - a)), k, j + 4)
            }
        }

        function g(a, b) {
            if ("number" == h.typeOf(F)) p = F;
            else if ("%" == F.slice(-1)) {
                var c = parseFloat(F.slice(0, -1));
                b && !isNaN(c) &&
                    (p = b * c / 100)
            } else "string" == h.typeOf(F) ? p = h.seconds(F) : isNaN(F) || (p = F)
        }

        function j() {
            k && x.sendEvent(b.JWPLAYER_AD_SKIPPED)
        }

        function q() {
            if (k) {
                var a = v.getContext("2d");
                a.clearRect(0, 0, d, f);
                w(a, 0, 0, d, f, 5, c, e, c);
                w(a, 0, 0, d, f, 5, e, c, c);
                a.fillStyle = "#FFFFFF";
                a.globalAlpha = 1;
                var b = v.height / 2,
                    j = v.width / 2;
                a.textAlign = "center";
                a.font = "Bold 12px Sans-Serif";
                a.fillText(r + "     ", j, b + 4);
                a.drawImage(A, v.width - (v.width - a.measureText(r).width) / 2 - 4, (f - s.height) / 2)
            }
        }

        function C() {
            if (k) {
                var a = v.getContext("2d");
                a.clearRect(0,
                    0, d, f);
                w(a, 0, 0, d, f, 5, c, e, e);
                w(a, 0, 0, d, f, 5, e, c, e);
                a.fillStyle = "#979797";
                a.globalAlpha = 1;
                var b = v.height / 2,
                    j = v.width / 2;
                a.textAlign = "center";
                a.font = "Bold 12px Sans-Serif";
                a.fillText(r + "     ", j, b + 4);
                a.drawImage(s, v.width - (v.width - a.measureText(r).width) / 2 - 4, (f - s.height) / 2)
            }
        }

        function w(a, b, d, e, k, j, f, h, r) {
            "undefined" == typeof h && (h = c);
            "undefined" === typeof j && (j = 5);
            a.beginPath();
            a.moveTo(b + j, d);
            a.lineTo(b + e - j, d);
            a.quadraticCurveTo(b + e, d, b + e, d + j);
            a.lineTo(b + e, d + k - j);
            a.quadraticCurveTo(b + e, d + k, b + e - j, d + k);
            a.lineTo(b +
                j, d + k);
            a.quadraticCurveTo(b, d + k, b, d + k - j);
            a.lineTo(b, d + j);
            a.quadraticCurveTo(b, d, b + j, d);
            a.closePath();
            h && (a.strokeStyle = "white", a.globalAlpha = r ? 1 : 0.25, a.stroke());
            f && (a.fillStyle = "#000000", a.globalAlpha = 0.5, a.fill())
        }

        function t(a, b) {
            var c = document.createElement(a);
            b && (c.className = b);
            return c
        }
        var D, v, x = new b.eventdispatcher,
            p = -1,
            k = e,
            B, F = 0,
            s, A;
        h.extend(this, x);
        this.updateSkipTime = function(b, l) {
            var u = v.getContext("2d");
            g(b, l);
            if (0 <= p)
                if (a.style(D, {
                    visibility: B ? "visible" : "hidden"
                }), 0 < p - b) n(b);
                else if (!k) {
                k =
                    c;
                u.clearRect(0, 0, d, f);
                w(u, 0, 0, d, f, 5, c, e, e);
                w(u, 0, 0, d, f, 5, e, c);
                u.fillStyle = "#979797";
                u.globalAlpha = 1;
                var m = v.height / 2,
                    x = v.width / 2;
                u.textAlign = "center";
                u.font = "Bold 12px Sans-Serif";
                u.fillText(r + "     ", x, m + 4);
                u.drawImage(s, v.width - (v.width - u.measureText(r).width) / 2 - 4, (f - s.height) / 2);
                h.isMobile() ? (new h.touch(D)).addEventListener(h.touchEvents.TAP, j) : (D.addEventListener("click", j), D.addEventListener("mouseover", q), D.addEventListener("mouseout", C));
                D.style.cursor = "pointer"
            }
        };
        this.reset = function(a) {
            k = !1;
            F = a;
            g(0, 0);
            n(0)
        };
        this.show = function() {
            B = !0;
            0 < p && a.style(D, {
                visibility: "visible"
            })
        };
        this.hide = function() {
            B = !1;
            a.style(D, {
                visibility: "hidden"
            })
        };
        this.element = function() {
            return D
        };
        s = new Image;
        s.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkE0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRjk0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAZXX0AAABYSURBVHjafI2BCcAwCAQ/kr3ScRwjW+g2SSezCi0kYHpwKLy8JCLDbWaGTM+MAFzuVNXhNiTQsh+PS9QhZ7o9JuFMeUVNwjsamDma4K+3oy1cqX/hxyPAAAQwNKV27g9PAAAAAElFTkSuQmCC";
        s.className = "jwskipimage jwskipout";
        A = new Image;
        A.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkU0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRkQ0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvgIj/QAAABYSURBVHjadI6BCcAgDAS/0jmyih2tm2lHSRZJX6hQQ3w4FP49LKraSHV3ZLDzAuAi3cwaqUhSfvft+EweznHneUdTzPGRmp5hEJFhAo3LaCnjn7blzCvAAH9YOSCL5RZKAAAAAElFTkSuQmCC";
        A.className = "jwskipimage jwskipover";
        D = t("div", "jwskip");
        D.id = u.id + "_skipcontainer";
        v = t("canvas");
        D.appendChild(v);
        this.width = v.width = d;
        this.height = v.height = f;
        D.appendChild(A);
        D.appendChild(s);
        a.style(D, {
            visibility: "hidden",
            bottom: l
        })
    };
    a(".jwskip", {
        position: "absolute",
        "float": "right",
        display: "inline-block",
        width: d,
        height: f,
        right: 10
    });
    a(".jwskipimage", {
        position: "relative",
        display: "none"
    })
})(window.jwplayer);
(function(g) {
    var h = g.utils,
        a = g.events,
        c = a.state,
        e = g.parsers,
        b = h.css,
        d = "playing",
        f = document;
    g.html5.captions = function(b, l) {
        function m(a) {
            h.log("CAPTIONS(" + a + ")")
        }

        function r(a) {
            (H = a.fullscreen) ? (n(), setTimeout(n, 500)) : C(!0)
        }

        function n() {
            var a = x.offsetHeight,
                b = x.offsetWidth;
            0 !== a && 0 !== b && B.resize(b, Math.round(0.94 * a))
        }

        function z(a, b) {
            h.ajax(a, function(a) {
                var c = a.responseXML ? a.responseXML.firstChild : null;
                K++;
                if (c) {
                    "xml" == e.localName(c) && (c = c.nextSibling);
                    for (; c.nodeType == c.COMMENT_NODE;) c = c.nextSibling
                }
                c =
                    c && "tt" == e.localName(c) ? new g.parsers.dfxp : new g.parsers.srt;
                try {
                    var d = c.parse(a.responseText);
                    s < A.length && (A[b].data = d);
                    C(!1)
                } catch (k) {
                    m(k.message + ": " + A[b].file)
                }
                K == A.length && (0 < I && (t(I), I = -1), q())
            }, j, !0)
        }

        function j(a) {
            K++;
            m(a);
            K == A.length && (0 < I && (t(I), I = -1), q())
        }

        function q() {
            for (var b = [], c = 0; c < A.length; c++) b.push(A[c]);
            P.sendEvent(a.JWPLAYER_CAPTIONS_LOADED, {
                captionData: b
            })
        }

        function C(a) {
            !A.length || Q ? B.hide() : F == d && 0 < G ? (B.show(), H ? r({
                fullscreen: !0
            }) : (w(), a && setTimeout(w, 500))) : B.hide()
        }

        function w() {
            B.resize()
        }

        function t(b) {
            0 < b ? (s = b - 1, G = b, s >= A.length || (A[s].data ? B.populate(A[s].data) : K == A.length ? (m("file not loaded: " + A[s].file), 0 != G && D(a.JWPLAYER_CAPTIONS_CHANGED, A, 0), G = 0) : I = b, C(!1))) : (G = 0, C(!1))
        }

        function D(a, b, c) {
            P.sendEvent(a, {
                type: a,
                tracks: b,
                track: c
            })
        }

        function v() {
            for (var a = [{
                label: "Off"
            }], b = 0; b < A.length; b++) a.push({
                label: A[b].label
            });
            return a
        }
        var x, p = {
                back: !0,
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Arial,sans-serif",
                fontOpacity: 100,
                backgroundColor: "#000",
                backgroundOpacity: 100,
                edgeStyle: null,
                windowColor: "#FFFFFF",
                windowOpacity: 0
            },
            k = {
                fontStyle: "normal",
                fontWeight: "normal",
                textDecoration: "none"
            },
            B, F, s, A = [],
            K = 0,
            I = -1,
            G = 0,
            H = !1,
            P = new a.eventdispatcher,
            Q = h.isAndroid(4) && !h.isChrome();
        h.extend(this, P);
        this.element = function() {
            return x
        };
        this.getCaptionsList = function() {
            return v()
        };
        this.getCurrentCaptions = function() {
            return G
        };
        this.setCurrentCaptions = function(b) {
            0 <= b && (G != b && b <= A.length) && (t(b), b = v(), h.saveCookie("captionLabel", b[G].label), D(a.JWPLAYER_CAPTIONS_CHANGED, b, G))
        };
        x = f.createElement("div");
        x.id = b.id + "_caption";
        x.className = "jwcaptions";
        b.jwAddEventListener(a.JWPLAYER_PLAYER_STATE, function(a) {
            switch (a.newstate) {
                case c.IDLE:
                    F = "idle";
                    C(!1);
                    break;
                case c.PLAYING:
                    F = d, C(!1)
            }
        });
        b.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function() {
            s = 0;
            A = [];
            B.update(0);
            K = 0;
            if (!Q) {
                for (var c = b.jwGetPlaylist()[b.jwGetPlaylistIndex()].tracks, d = [], e = 0, k = "", j = 0, k = "", e = 0; e < c.length; e++) k = c[e].kind.toLowerCase(), ("captions" == k || "subtitles" == k) && d.push(c[e]);
                for (e = G = 0; e < d.length; e++)
                    if (k = d[e].file) d[e].label || (d[e].label = e.toString()),
                        A.push(d[e]), z(A[e].file, e);
                for (e = 0; e < A.length; e++)
                    if (A[e]["default"]) {
                        j = e + 1;
                        break
                    }
                if (k = h.getCookies().captionLabel) {
                    c = v();
                    for (e = 0; e < c.length; e++)
                        if (k == c[e].label) {
                            j = e;
                            break
                        }
                }
                0 < j && t(j);
                C(!1);
                D(a.JWPLAYER_CAPTIONS_LIST, v(), G)
            }
        });
        b.jwAddEventListener(a.JWPLAYER_MEDIA_ERROR, m);
        b.jwAddEventListener(a.JWPLAYER_ERROR, m);
        b.jwAddEventListener(a.JWPLAYER_READY, function() {
            h.foreach(p, function(a, b) {
                l && (void 0 !== l[a] ? b = l[a] : void 0 !== l[a.toLowerCase()] && (b = l[a.toLowerCase()]));
                k[a] = b
            });
            B = new g.html5.captions.renderer(k,
                x);
            C(!1)
        });
        b.jwAddEventListener(a.JWPLAYER_MEDIA_TIME, function(a) {
            B.update(a.position)
        });
        b.jwAddEventListener(a.JWPLAYER_FULLSCREEN, r);
        b.jwAddEventListener(a.JWPLAYER_RESIZE, function() {
            C(!1)
        })
    };
    b(".jwcaptions", {
        position: "absolute",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    })
})(jwplayer);
(function(g) {
    var h = g.utils,
        a = h.css.style;
    g.html5.captions.renderer = function(c, e) {
        function b(b) {
            b = b || "";
            q = "hidden";
            a(m, {
                visibility: q
            });
            n.innerHTML = b;
            b.length && (q = "visible", setTimeout(d, 16))
        }

        function d() {
            if ("visible" === q) {
                var b = m.clientWidth,
                    d = Math.pow(b / 400, 0.6),
                    e = c.fontSize * d;
                a(n, {
                    maxWidth: b + "px",
                    fontSize: Math.round(e) + "px",
                    lineHeight: Math.round(1.4 * e) + "px",
                    padding: Math.round(1 * d) + "px " + Math.round(8 * d) + "px"
                });
                c.windowOpacity && a(r, {
                    padding: Math.round(5 * d) + "px",
                    borderRadius: Math.round(5 * d) + "px"
                });
                a(m, {
                    visibility: q
                })
            }
        }

        function f() {
            for (var a = -1, c = 0; c < l.length; c++)
                if (l[c].begin <= j && (c == l.length - 1 || l[c + 1].begin >= j)) {
                    a = c;
                    break
                } - 1 == a ? b("") : a != g && (g = a, b(l[c].text))
        }

        function u(a, b, c) {
            c = h.hexToRgba("#000000", c);
            "dropshadow" === a ? b.textShadow = "0 2px 1px " + c : "raised" === a ? b.textShadow = "0 0 5px " + c + ", 0 1px 5px " + c + ", 0 2px 5px " + c : "depressed" === a ? b.textShadow = "0 -2px 1px " + c : "uniform" === a && (b.textShadow = "-2px 0 1px " + c + ",2px 0 1px " + c + ",0 -2px 1px " + c + ",0 2px 1px " + c + ",-1px 1px 1px " + c + ",1px 1px 1px " + c + ",1px -1px 1px " +
                c + ",1px 1px 1px " + c)
        }
        var l, m, r, n, g, j, q = "visible",
            C = -1;
        this.hide = function() {
            clearInterval(C);
            a(m, {
                display: "none"
            })
        };
        this.populate = function(a) {
            g = -1;
            l = a;
            f()
        };
        this.resize = function() {
            d()
        };
        this.show = function() {
            a(m, {
                display: "block"
            });
            d();
            clearInterval(C);
            C = setInterval(d, 250)
        };
        this.update = function(a) {
            j = a;
            l && f()
        };
        var w = c.fontOpacity,
            t = c.windowOpacity,
            D = c.edgeStyle,
            v = c.backgroundColor,
            x = {
                display: "inline-block"
            },
            p = {
                color: h.hexToRgba(h.rgbHex(c.color), w),
                display: "inline-block",
                fontFamily: c.fontFamily,
                fontStyle: c.fontStyle,
                fontWeight: c.fontWeight,
                textAlign: "center",
                textDecoration: c.textDecoration,
                wordWrap: "break-word"
            };
        t && (x.backgroundColor = h.hexToRgba(h.rgbHex(c.windowColor), t));
        u(D, p, w);
        c.back ? p.backgroundColor = h.hexToRgba(h.rgbHex(v), c.backgroundOpacity) : null === D && u("uniform", p);
        m = document.createElement("div");
        r = document.createElement("div");
        n = document.createElement("span");
        a(m, {
            display: "block",
            height: "auto",
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            width: "100%"
        });
        a(r, x);
        a(n, p);
        r.appendChild(n);
        m.appendChild(r);
        e.appendChild(m)
    }
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils,
        c = g.events,
        e = c.state,
        b = a.css,
        d = a.transitionStyle,
        f = a.isMobile(),
        u = a.isAndroid(4) && !a.isChrome(),
        l = "button",
        m = "text",
        r = "slider",
        n = "none",
        z = "100%",
        j = {
            display: n
        },
        q = {
            display: "block"
        },
        C = {
            display: x
        },
        w = "array",
        t = !1,
        D = !0,
        v = null,
        x, p = window,
        k = document;
    h.controlbar = function(d, F) {
        function s(a, b, c) {
            return {
                name: a,
                type: b,
                className: c
            }
        }

        function A(c) {
            b.block($);
            if (c.duration == Number.POSITIVE_INFINITY || !c.duration && a.isSafari() && !f) Z.setText(J.jwGetPlaylist()[J.jwGetPlaylistIndex()].title || "Live broadcast");
            else {
                var d;
                E.elapsed && (d = a.timeFormat(c.position), E.elapsed.innerHTML = d);
                E.duration && (d = a.timeFormat(c.duration), E.duration.innerHTML = d);
                0 < c.duration ? X(c.position / c.duration) : X(0);
                va = c.duration;
                wa || Z.setText()
            }
        }

        function K() {
            var a = J.jwGetMute();
            Ka = J.jwGetVolume() / 100;
            S("mute", a || 0 === Ka);
            V(a ? 0 : Ka)
        }

        function I() {
            b.style(E.hd, j);
            b.style(E.cc, j);
            Pa();
            sa()
        }

        function G(a) {
            Qa = a.currentQuality | 0;
            E.hd && (E.hd.querySelector("button").className = 2 === fa.length && 0 === Qa ? "off" : "");
            ma && 0 <= Qa && ma.setActive(a.currentQuality)
        }

        function H(a) {
            ga && (La = a.track | 0, E.cc && (E.cc.querySelector("button").className = 2 === ga.length && 0 === La ? "off" : ""), na && 0 <= La && na.setActive(a.track))
        }

        function P() {
            la = a.extend({}, Xa, oa.getComponentSettings("controlbar"), F);
            xa = N("background").height;
            var c = ta ? 0 : la.margin;
            b.style(W, {
                height: xa,
                bottom: c,
                left: c,
                right: c,
                "max-width": ta ? "" : la.maxwidth
            });
            b(Q(".jwtext"), {
                font: la.fontsize + "px/" + N("background").height + "px " + la.font,
                color: la.fontcolor,
                "font-weight": la.fontweight
            });
            b(Q(".jwoverlay"), {
                bottom: xa
            })
        }

        function Q(a) {
            return "#" +
                $ + (a ? " " + a : "")
        }

        function M() {
            return k.createElement("span")
        }

        function y(c, d, e, j, k) {
            var f = M(),
                h = N(c);
            j = j ? " left center" : " center";
            var r = aa(h);
            f.className = "jw" + c;
            f.innerHTML = "\x26nbsp;";
            if (h && h.src) return e = e ? {
                background: "url('" + h.src + "') repeat-x " + j,
                "background-size": r,
                height: k ? h.height : x
            } : {
                background: "url('" + h.src + "') no-repeat" + j,
                "background-size": r,
                width: h.width,
                height: k ? h.height : x
            }, f.skin = h, b(Q((k ? ".jwvertical " : "") + ".jw" + c), a.extend(e, d)), E[c] = f
        }

        function R(a, c, d, e) {
            c && c.src && (b(a, {
                width: c.width,
                background: "url(" + c.src + ") no-repeat center",
                "background-size": aa(c)
            }), d.src && !f && b(a + ":hover," + a + ".off:hover", {
                background: "url(" + d.src + ") no-repeat center",
                "background-size": aa(d)
            }), e && e.src && b(a + ".off", {
                background: "url(" + e.src + ") no-repeat center",
                "background-size": aa(e)
            }))
        }

        function T(a) {
            return function(b) {
                rb[a] && (rb[a](), f && Ma.sendEvent(c.JWPLAYER_USER_ACTION));
                b.preventDefault && b.preventDefault()
            }
        }

        function ca(b) {
            a.foreach(gb, function(a, c) {
                a != b && ("cc" == a && (clearTimeout(Da), Da = x), "hd" == a && (clearTimeout(Ea),
                    Ea = x), c.hide())
            })
        }

        function ba() {
            !ta && !wa && (b.block($), Ha.show(), Ca("volume", Ha), ca("volume"))
        }

        function S(b, c) {
            a.exists(c) || (c = !hb[b]);
            E[b] && (E[b].className = "jw" + b + (c ? " jwtoggle jwtoggling" : " jwtoggling"), setTimeout(function() {
                E[b].className = E[b].className.replace(" jwtoggling", "")
            }, 100));
            hb[b] = c
        }

        function aa(a) {
            return a ? parseInt(a.width, 10) + "px " + parseInt(a.height, 10) + "px" : "0 0"
        }

        function Y() {
            fa && 2 < fa.length && (ib && (clearTimeout(ib), ib = x), b.block($), ma.show(), Ca("hd", ma), ca("hd"))
        }

        function qa() {
            ga &&
                2 < ga.length && (jb && (clearTimeout(jb), jb = x), b.block($), na.show(), Ca("cc", na), ca("cc"))
        }

        function da(a) {
            0 <= a && a < fa.length && (J.jwSetCurrentQuality(a), clearTimeout(Ea), Ea = x, ma.hide())
        }

        function Ra(a) {
            0 <= a && a < ga.length && (J.jwSetCurrentCaptions(a), clearTimeout(Da), Da = x, na.hide())
        }

        function ha() {
            2 == ga.length && Ra((La + 1) % 2)
        }

        function kb() {
            2 == fa.length && da((Qa + 1) % 2)
        }

        function Ia(a) {
            a.preventDefault();
            k.onselectstart = function() {
                return t
            }
        }

        function Ya(a) {
            Sa();
            ya = a;
            p.addEventListener("mouseup", O, t)
        }

        function Sa() {
            p.removeEventListener("mouseup",
                O);
            ya = v
        }

        function Ta() {
            E.timeRail.className = "jwrail";
            J.jwGetState() != e.IDLE && (J.jwSeekDrag(D), Ya("time"), za(), Ma.sendEvent(c.JWPLAYER_USER_ACTION))
        }

        function Na(b) {
            if (ya) {
                var d = (new Date).getTime();
                50 < d - lb && (Za(b), lb = d);
                var e = E[ya].querySelector(".jwrail"),
                    e = a.bounds(e),
                    e = b.x / e.width;
                100 < e && (e = 100);
                b.type == a.touchEvents.DRAG_END ? (J.jwSeekDrag(t), E.timeRail.className = "jwrail jwsmooth", Sa(), $a.time(e), ua()) : (X(e), 500 < d - mb && (mb = d, $a.time(e)));
                Ma.sendEvent(c.JWPLAYER_USER_ACTION)
            }
        }

        function U(b) {
            var d = E.time.querySelector(".jwrail"),
                d = a.bounds(d);
            b = b.x / d.width;
            100 < b && (b = 100);
            J.jwGetState() != e.IDLE && ($a.time(b), Ma.sendEvent(c.JWPLAYER_USER_ACTION))
        }

        function L(a) {
            return function(b) {
                b.button || (E[a + "Rail"].className = "jwrail", "time" == a ? J.jwGetState() != e.IDLE && (J.jwSeekDrag(D), Ya(a)) : Ya(a))
            }
        }

        function O(b) {
            var c = (new Date).getTime();
            50 < c - lb && (Za(b), lb = c);
            if (ya && !b.button) {
                var d = E[ya].querySelector(".jwrail"),
                    e = a.bounds(d),
                    d = ya,
                    e = E[d].vertical ? (e.bottom - b.pageY) / e.height : (b.pageX - e.left) / e.width;
                "mouseup" == b.type ? ("time" == d && J.jwSeekDrag(t),
                    E[d + "Rail"].className = "jwrail jwsmooth", Sa(), $a[d.replace("H", "")](e)) : ("time" == ya ? X(e) : V(e), 500 < c - mb && (mb = c, $a[ya.replace("H", "")](e)));
                return !1
            }
        }

        function za() {
            pa && (va && !ta && !f) && (b.block($), pa.show(), Ca("time", pa))
        }

        function ua() {
            pa && pa.hide()
        }

        function Za(b) {
            ia = a.bounds(W);
            if ((ab = a.bounds(sb)) && 0 !== ab.width) {
                var c = b.x;
                b.pageX && (c = b.pageX - ab.left);
                0 <= c && c <= ab.width && (pa.positionX(Math.round(c)), Oa(va * c / ab.width))
            }
        }

        function Oa(c) {
            var d = bb.updateTimeline(c, function(a) {
                b.style(pa.element(), {
                    width: a
                });
                Ca("time", pa)
            });
            Ua ? (c = Ua.text) && b.style(pa.element(), {
                width: 32 < c.length ? 160 : ""
            }) : (c = a.timeFormat(c), d || b.style(pa.element(), {
                width: ""
            }));
            cb.innerHTML !== c && (cb.innerHTML = c);
            Ca("time", pa)
        }

        function Aa() {
            a.foreach(db, function(a, c) {
                var d = {};
                d.left = -1 < c.position.toString().search(/^[\d\.]+%$/) ? c.position : (100 * c.position / va).toFixed(2) + "%";
                b.style(c.element, d)
            })
        }

        function nb() {
            jb = setTimeout(na.hide, 500)
        }

        function ja() {
            ib = setTimeout(ma.hide, 500)
        }

        function ra(a, c, d, e) {
            if (!f) {
                var j = a.element();
                c.appendChild(j);
                c.addEventListener("mousemove", d, t);
                e ? c.addEventListener("mouseout", e, t) : c.addEventListener("mouseout", a.hide, t);
                b.style(j, {
                    left: "50%"
                })
            }
        }

        function eb(b, d, e, j) {
            if (f) {
                var k = b.element();
                d.appendChild(k);
                (new a.touch(d)).addEventListener(a.touchEvents.TAP, function() {
                    var a = e;
                    "cc" == j ? (2 == ga.length && (a = ha), Da ? (clearTimeout(Da), Da = x, b.hide()) : (Da = setTimeout(function() {
                        b.hide();
                        Da = x
                    }, 4E3), a()), Ma.sendEvent(c.JWPLAYER_USER_ACTION)) : "hd" == j && (2 == fa.length && (a = kb), Ea ? (clearTimeout(Ea), Ea = x, b.hide()) : (Ea = setTimeout(function() {
                        b.hide();
                        Ea = x
                    }, 4E3), a()), Ma.sendEvent(c.JWPLAYER_USER_ACTION))
                })
            }
        }

        function Va(c) {
            var d = M();
            d.className = "jwgroup jw" + c;
            Fa[c] = d;
            if (Ga[c]) {
                var d = Ga[c],
                    e = Fa[c];
                if (d && 0 < d.elements.length)
                    for (var I = 0; I < d.elements.length; I++) {
                        var p;
                        a: {
                            p = d.elements[I];
                            var g = c;
                            switch (p.type) {
                                case m:
                                    g = void 0;
                                    p = p.name;
                                    var g = {},
                                        G = N(("alt" == p ? "elapsed" : p) + "Background");
                                    if (G.src) {
                                        var q = M();
                                        q.id = $ + "_" + p;
                                        "elapsed" == p || "duration" == p ? (q.className = "jwtext jw" + p + " jwhidden", pb.push(q)) : q.className = "jwtext jw" + p;
                                        g.background = "url(" + G.src + ") repeat-x center";
                                        g["background-size"] = aa(N("background"));
                                        b.style(q, g);
                                        q.innerHTML = "alt" != p ? "00:00" : "";
                                        g = E[p] = q
                                    } else g = null;
                                    p = g;
                                    break a;
                                case l:
                                    if ("blank" != p.name) {
                                        p = p.name;
                                        G = g;
                                        if (!N(p + "Button").src || f && ("mute" == p || 0 === p.indexOf("volume")) || u && /hd|cc/.test(p)) p = v;
                                        else {
                                            var g = M(),
                                                q = M(),
                                                A = void 0,
                                                A = ka,
                                                s = y(A.name);
                                            s || (s = M(), s.className = "jwblankDivider");
                                            A.className && (s.className += " " + A.className);
                                            A = s;
                                            s = k.createElement("button");
                                            g.style += " display:inline-block";
                                            g.className = "jw" + p + " jwbuttoncontainer";
                                            "left" == G ? (g.appendChild(q),
                                                g.appendChild(A)) : (g.appendChild(A), g.appendChild(q));
                                            f ? "hd" != p && "cc" != p && (new a.touch(s)).addEventListener(a.touchEvents.TAP, T(p)) : s.addEventListener("click", T(p), t);
                                            s.innerHTML = "\x26nbsp;";
                                            q.appendChild(s);
                                            G = N(p + "Button");
                                            q = N(p + "ButtonOver");
                                            A = N(p + "ButtonOff");
                                            R(Q(".jw" + p + " button"), G, q, A);
                                            (G = xb[p]) && R(Q(".jw" + p + ".jwtoggle button"), N(G + "Button"), N(G + "ButtonOver"));
                                            p = E[p] = g
                                        }
                                        break a
                                    }
                                    break;
                                case r:
                                    g = void 0;
                                    A = p.name;
                                    if (f && 0 === A.indexOf("volume")) g = void 0;
                                    else {
                                        p = M();
                                        var q = "volume" == A,
                                            w = A + ("time" == A ? "Slider" :
                                                "") + "Cap",
                                            G = q ? "Top" : "Left",
                                            g = q ? "Bottom" : "Right",
                                            s = y(w + G, v, t, t, q),
                                            B = y(w + g, v, t, t, q),
                                            C;
                                        C = A;
                                        var H = q,
                                            D = G,
                                            Ka = g,
                                            ha = M(),
                                            K = ["Rail", "Buffer", "Progress"],
                                            F = void 0,
                                            ca = void 0;
                                        ha.className = "jwrail jwsmooth";
                                        for (var da = 0; da < K.length; da++) {
                                            var ca = "time" == C ? "Slider" : "",
                                                P = C + ca + K[da],
                                                Y = y(P, v, !H, 0 === C.indexOf("volume"), H),
                                                ba = y(P + "Cap" + D, v, t, t, H),
                                                J = y(P + "Cap" + Ka, v, t, t, H),
                                                S = N(P + "Cap" + D),
                                                O = N(P + "Cap" + Ka);
                                            if (Y) {
                                                var ia = M();
                                                ia.className = "jwrailgroup " + K[da];
                                                ba && ia.appendChild(ba);
                                                ia.appendChild(Y);
                                                J && (ia.appendChild(J), J.className +=
                                                    " jwcap" + (H ? "Bottom" : "Right"));
                                                b(Q(".jwrailgroup." + K[da]), {
                                                    "min-width": H ? x : S.width + O.width
                                                });
                                                ia.capSize = H ? S.height + O.height : S.width + O.width;
                                                b(Q("." + Y.className), {
                                                    left: H ? x : S.width,
                                                    right: H ? x : O.width,
                                                    top: H ? S.height : x,
                                                    bottom: H ? O.height : x,
                                                    height: H ? "auto" : x
                                                });
                                                2 == da && (F = ia);
                                                2 == da && !H ? (Y = M(), Y.className = "jwprogressOverflow", Y.appendChild(ia), E[P] = Y, ha.appendChild(Y)) : (E[P] = ia, ha.appendChild(ia))
                                            }
                                        }
                                        if (D = y(C + ca + "Thumb", v, t, t, H)) b(Q("." + D.className), {
                                                opacity: "time" == C ? 0 : 1,
                                                "margin-top": H ? D.skin.height / -2 : x
                                            }),
                                            D.className += " jwthumb", (H && F ? F : ha).appendChild(D);
                                        f ? (H = new a.touch(ha), H.addEventListener(a.touchEvents.DRAG_START, Ta), H.addEventListener(a.touchEvents.DRAG, Na), H.addEventListener(a.touchEvents.DRAG_END, Na), H.addEventListener(a.touchEvents.TAP, U)) : (F = C, "volume" == F && !H && (F += "H"), ha.addEventListener("mousedown", L(F), t));
                                        "time" == C && !f && (ha.addEventListener("mousemove", za, t), ha.addEventListener("mouseout", ua, t));
                                        C = E[C + "Rail"] = ha;
                                        ha = N(w + G);
                                        w = N(w + G);
                                        p.className = "jwslider jw" + A;
                                        s && p.appendChild(s);
                                        p.appendChild(C);
                                        B && (q && (B.className += " jwcapBottom"), p.appendChild(B));
                                        b(Q(".jw" + A + " .jwrail"), {
                                            left: q ? x : ha.width,
                                            right: q ? x : w.width,
                                            top: q ? ha.height : x,
                                            bottom: q ? w.height : x,
                                            width: q ? z : x,
                                            height: q ? "auto" : x
                                        });
                                        E[A] = p;
                                        p.vertical = q;
                                        "time" == A ? (pa = new h.overlay($ + "_timetooltip", oa), bb = new h.thumbs($ + "_thumb"), cb = k.createElement("div"), cb.className = "jwoverlaytext", ob = k.createElement("div"), g = bb.element(), ob.appendChild(g), ob.appendChild(cb), pa.setContents(ob), sb = C, Oa(0), g = pa.element(), C.appendChild(g), E.timeSliderRail || b.style(E.time,
                                            j), E.timeSliderThumb && b.style(E.timeSliderThumb, {
                                            "margin-left": N("timeSliderThumb").width / -2
                                        }), g = N("timeSliderCue"), G = {
                                            "z-index": 1
                                        }, g && g.src ? (y("timeSliderCue"), G["margin-left"] = g.width / -2) : G.display = n, b(Q(".jwtimeSliderCue"), G), Ja(0), X(0), X(0), Ja(0)) : 0 === A.indexOf("volume") && (A = p, s = "volume" + (q ? "" : "H"), B = q ? "vertical" : "horizontal", b(Q(".jw" + s + ".jw" + B), {
                                            width: N(s + "Rail", q).width + (q ? 0 : N(s + "Cap" + G).width + N(s + "RailCap" + G).width + N(s + "RailCap" + g).width + N(s + "Cap" + g).width),
                                            height: q ? N(s + "Cap" + G).height + N(s +
                                                "Rail").height + N(s + "RailCap" + G).height + N(s + "RailCap" + g).height + N(s + "Cap" + g).height : x
                                        }), A.className += " jw" + B);
                                        g = p
                                    }
                                    p = g;
                                    break a
                            }
                            p = void 0
                        }
                        p && ("volume" == d.elements[I].name && p.vertical ? (Ha = new h.overlay($ + "_volumeOverlay", oa), Ha.setContents(p)) : e.appendChild(p))
                    }
            }
        }

        function sa() {
            clearTimeout(tb);
            tb = setTimeout(Z.redraw, 0)
        }

        function Pa() {
            1 < J.jwGetPlaylist().length && (!k.querySelector("#" + J.id + " .jwplaylist") || J.jwGetFullscreen()) ? (b.style(E.next, C), b.style(E.prev, C)) : (b.style(E.next, j), b.style(E.prev, j))
        }

        function Ca(b,
            c) {
            ia || (ia = a.bounds(W));
            c.constrainX(ia, !0)
        }

        function Ja(a) {
            E.timeSliderBuffer && (a = Math.min(Math.max(0, a), 1), b.style(E.timeSliderBuffer, {
                width: (100 * a).toFixed(1) + "%",
                opacity: 0 < a ? 1 : 0
            }))
        }

        function Ba(a, c) {
            if (E[a]) {
                var d = E[a].vertical,
                    e = a + ("time" === a ? "Slider" : ""),
                    j = 100 * Math.min(Math.max(0, c), 1) + "%",
                    k = E[e + "Progress"],
                    e = E[e + "Thumb"],
                    f;
                k && (f = {}, d ? (f.height = j, f.bottom = 0) : f.width = j, "volume" !== a && (f.opacity = 0 < c || ya ? 1 : 0), b.style(k, f));
                e && (f = {}, d ? f.top = 0 : f.left = j, b.style(e, f))
            }
        }

        function V(a) {
            Ba("volume", a);
            Ba("volumeH",
                a)
        }

        function X(a) {
            Ba("time", a)
        }

        function N(a) {
            var b = "controlbar",
                c = a;
            0 === a.indexOf("volume") && (0 === a.indexOf("volumeH") ? c = a.replace("volumeH", "volume") : b = "tooltip");
            return (a = oa.getSkinElement(b, c)) ? a : {
                width: 0,
                height: 0,
                src: "",
                image: x,
                ready: t
            }
        }

        function ea(b) {
            b = (new g.parsers.srt).parse(b.responseText, !0);
            if (a.typeOf(b) !== w) return fb("Invalid data");
            Z.addCues(b)
        }

        function fb(b) {
            a.log("Cues failed to load: " + b)
        }
        var J, oa, ka = s("divider", "divider"),
            Xa = {
                margin: 8,
                maxwidth: 800,
                font: "Arial,sans-serif",
                fontsize: 11,
                fontcolor: 15658734,
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [s("play", l), s("prev", l), s("next", l), s("elapsed", m)]
                    },
                    center: {
                        position: "center",
                        elements: [s("time", r), s("alt", m)]
                    },
                    right: {
                        position: "right",
                        elements: [s("duration", m), s("hd", l), s("cc", l), s("mute", l), s("volume", r), s("volumeH", r), s("fullscreen", l)]
                    }
                }
            },
            la, Ga, E, xa, W, $, va, fa, Qa, ga, La, Ka, Ha, ia, sb, ab, pa, ob, bb, cb, ib, Ea, ma, jb, Da, na, tb, Wa = -1,
            ta = t,
            qb = t,
            ya = v,
            mb = 0,
            lb = 0,
            db = [],
            Ua, wa = t,
            Ma = new c.eventdispatcher,
            xb = {
                play: "pause",
                mute: "unmute",
                fullscreen: "normalscreen"
            },
            hb = {
                play: t,
                mute: t,
                fullscreen: t
            },
            rb = {
                play: function() {
                    hb.play ? J.jwPause() : J.jwPlay()
                },
                mute: function() {
                    var a = !hb.mute;
                    J.jwSetMute(a);
                    !a && 0 === Ka && J.jwSetVolume(20);
                    K()
                },
                fullscreen: function() {
                    J.jwSetFullscreen()
                },
                next: function() {
                    J.jwPlaylistNext()
                },
                prev: function() {
                    J.jwPlaylistPrev()
                },
                hd: kb,
                cc: ha
            },
            $a = {
                time: function(a) {
                    J.jwSeek(Ua ? Ua.position : a * va)
                },
                volume: function(a) {
                    V(a);
                    0.1 > a && (a = 0);
                    0.9 < a && (a = 1);
                    J.jwSetVolume(100 * a)
                }
            },
            gb = {},
            pb = [],
            Z = this;
        a.extend(Z, Ma);
        Z.setText = function(a) {
            b.block($);
            var c = E.alt,
                d = E.time;
            E.timeSliderRail ? b.style(d, a ? j : q) : b.style(d, j);
            c && (b.style(c, a ? q : j), c.innerHTML = a || "");
            sa()
        };
        var Fa = {};
        Z.redraw = function(c) {
            b.block($);
            c && Z.visible && Z.show(D);
            P();
            c = top !== window.self && a.isMSIE();
            b.style(E.fullscreen, {
                display: ta || qb || c ? n : ""
            });
            b(Q(".jwvolumeH"), {
                display: ta || wa ? "block" : n
            });
            b(Q(".jwmute .jwoverlay"), {
                display: !ta && !wa ? "block" : n
            });
            b.style(E.hd, {
                display: !ta && !wa && fa && 1 < fa.length && ma ? "" : n
            });
            b.style(E.cc, {
                display: !ta && !wa && ga && 1 < ga.length && na ? "" : n
            });
            Aa();
            b.unblock($);
            if (Z.visible) {
                c = N("capLeft");
                var d = N("capRight");
                c = {
                    left: Math.round(a.parseDimension(Fa.left.offsetWidth) + c.width),
                    right: Math.round(a.parseDimension(Fa.right.offsetWidth) + d.width)
                };
                b.style(Fa.center, c)
            }
        };
        Z.audioMode = function(a) {
            a != ta && (ta = a, sa())
        };
        Z.instreamMode = function(a) {
            a != wa && (wa = a)
        };
        Z.hideFullscreen = function(a) {
            a != qb && (qb = a, sa())
        };
        Z.element = function() {
            return W
        };
        Z.margin = function() {
            return parseInt(la.margin, 10)
        };
        Z.height = function() {
            return xa
        };
        Z.show = function(c) {
            if (!Z.visible || c) {
                Z.visible = !0;
                c = {
                    display: "inline-block"
                };
                var d = la.maxwidth | 0;
                !ta && d && (W.parentNode && a.isIETrident()) && (c.width = W.parentNode.clientWidth > d + (la.margin | 0) ? d : "");
                b.style(W, c);
                ia = a.bounds(W);
                W && E.alt && (W.parentNode && 320 <= W.parentNode.clientWidth ? b.style(pb, C) : b.style(pb, j));
                b.block($);
                K();
                sa();
                clearTimeout(Wa);
                Wa = -1;
                Wa = setTimeout(function() {
                    b.style(W, {
                        opacity: 1
                    })
                }, 0)
            }
        };
        Z.showTemp = function() {
            this.visible || (W.style.opacity = 0, W.style.display = "inline-block")
        };
        Z.hideTemp = function() {
            this.visible || (W.style.display = n)
        };
        Z.addCues =
            function(b) {
                a.foreach(b, function(a, b) {
                    if (b.text) {
                        var c = b.begin,
                            d = b.text;
                        if (0 <= c.toString().search(/^[\d\.]+%?$/)) {
                            var e = y("timeSliderCue"),
                                j = E.timeSliderRail,
                                k = {
                                    position: c,
                                    text: d,
                                    element: e
                                };
                            e && j && (j.appendChild(e), e.addEventListener("mouseover", function() {
                                Ua = k
                            }, !1), e.addEventListener("mouseout", function() {
                                Ua = v
                            }, !1), db.push(k))
                        }
                        Aa()
                    }
                })
            };
        Z.hide = function() {
            Z.visible && (Z.visible = !1, b.style(W, {
                opacity: 0
            }), clearTimeout(Wa), Wa = -1, Wa = setTimeout(function() {
                b.style(W, {
                    display: n
                })
            }, 250))
        };
        E = {};
        J = d;
        $ = J.id + "_controlbar";
        va = 0;
        W = M();
        W.id = $;
        W.className = "jwcontrolbar";
        oa = J.skin;
        Ga = oa.getComponentLayout("controlbar");
        Ga || (Ga = Xa.layout);
        a.clearCss(Q());
        b.block($ + "build");
        P();
        var ub = y("capLeft"),
            vb = y("capRight"),
            wb = y("background", {
                position: "absolute",
                left: N("capLeft").width,
                right: N("capRight").width,
                "background-repeat": "repeat-x"
            }, D);
        wb && W.appendChild(wb);
        ub && W.appendChild(ub);
        Va("left");
        Va("center");
        Va("right");
        W.appendChild(Fa.left);
        W.appendChild(Fa.center);
        W.appendChild(Fa.right);
        E.hd && (ma = new h.menu("hd", $ + "_hd", oa,
            da), f ? eb(ma, E.hd, Y, "hd") : ra(ma, E.hd, Y, ja), gb.hd = ma);
        E.cc && (na = new h.menu("cc", $ + "_cc", oa, Ra), f ? eb(na, E.cc, qa, "cc") : ra(na, E.cc, qa, nb), gb.cc = na);
        E.mute && (E.volume && E.volume.vertical) && (Ha = new h.overlay($ + "_volumeoverlay", oa), Ha.setContents(E.volume), ra(Ha, E.mute, ba), gb.volume = Ha);
        b.style(Fa.right, {
            right: N("capRight").width
        });
        vb && W.appendChild(vb);
        b.unblock($ + "build");
        J.jwAddEventListener(c.JWPLAYER_MEDIA_TIME, A);
        J.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, function(a) {
            switch (a.newstate) {
                case e.BUFFERING:
                case e.PLAYING:
                    E.timeSliderThumb &&
                        b.style(E.timeSliderThumb, {
                            opacity: 1
                        });
                    S("play", D);
                    break;
                case e.PAUSED:
                    ya || S("play", t);
                    break;
                case e.IDLE:
                    S("play", t), E.timeSliderThumb && b.style(E.timeSliderThumb, {
                        opacity: 0
                    }), E.timeRail && (E.timeRail.className = "jwrail", setTimeout(function() {
                        E.timeRail.className += " jwsmooth"
                    }, 100)), Ja(0), A({
                        position: 0,
                        duration: 0
                    })
            }
        });
        J.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, function(b) {
            if (!wa) {
                b = J.jwGetPlaylist()[b.index].tracks;
                var c = t,
                    d = E.timeSliderRail;
                a.foreach(db, function(a, b) {
                    d.removeChild(b.element)
                });
                db.length =
                    0;
                if (a.typeOf(b) == w && !f)
                    for (var e = 0; e < b.length; e++)
                        if (!c && (b[e].file && b[e].kind && "thumbnails" == b[e].kind.toLowerCase()) && (bb.load(b[e].file), c = D), b[e].file && b[e].kind && "chapters" == b[e].kind.toLowerCase()) {
                            var j = b[e].file;
                            j ? a.ajax(j, ea, fb, D) : db.length = 0
                        }
                c || bb.load()
            }
        });
        J.jwAddEventListener(c.JWPLAYER_MEDIA_MUTE, K);
        J.jwAddEventListener(c.JWPLAYER_MEDIA_VOLUME, K);
        J.jwAddEventListener(c.JWPLAYER_MEDIA_BUFFER, function(a) {
            Ja(a.bufferPercent / 100)
        });
        J.jwAddEventListener(c.JWPLAYER_FULLSCREEN, function(a) {
            S("fullscreen",
                a.fullscreen);
            Pa();
            Z.visible && Z.show(D)
        });
        J.jwAddEventListener(c.JWPLAYER_PLAYLIST_LOADED, I);
        J.jwAddEventListener(c.JWPLAYER_MEDIA_LEVELS, function(a) {
            fa = a.levels;
            if (!wa && fa && 1 < fa.length && ma) {
                b.style(E.hd, C);
                ma.clearOptions();
                for (var c = 0; c < fa.length; c++) ma.addOption(fa[c].label, c);
                G(a)
            } else b.style(E.hd, j);
            sa()
        });
        J.jwAddEventListener(c.JWPLAYER_MEDIA_LEVEL_CHANGED, G);
        J.jwAddEventListener(c.JWPLAYER_CAPTIONS_LIST, function(a) {
            ga = a.tracks;
            if (!wa && ga && 1 < ga.length && na) {
                b.style(E.cc, C);
                na.clearOptions();
                for (var c = 0; c < ga.length; c++) na.addOption(ga[c].label, c);
                H(a)
            } else b.style(E.cc, j);
            sa()
        });
        J.jwAddEventListener(c.JWPLAYER_CAPTIONS_CHANGED, H);
        J.jwAddEventListener(c.JWPLAYER_RESIZE, function() {
            ia = a.bounds(W);
            0 < ia.width && Z.show(D)
        });
        f || (W.addEventListener("mouseover", function() {
            p.addEventListener("mousemove", O, t);
            p.addEventListener("mousedown", Ia, t)
        }, !1), W.addEventListener("mouseout", function() {
            p.removeEventListener("mousemove", O);
            p.removeEventListener("mousedown", Ia);
            k.onselectstart = null
        }, !1));
        setTimeout(K,
            0);
        I();
        Z.visible = !1
    };
    b("span.jwcontrolbar", {
        position: "absolute",
        margin: "auto",
        opacity: 0,
        display: n
    });
    b("span.jwcontrolbar span", {
        height: z
    });
    a.dragStyle("span.jwcontrolbar span", n);
    b("span.jwcontrolbar .jwgroup", {
        display: "inline"
    });
    b("span.jwcontrolbar span, span.jwcontrolbar .jwgroup button,span.jwcontrolbar .jwleft", {
        position: "relative",
        "float": "left"
    });
    b("span.jwcontrolbar .jwright", {
        position: "relative",
        "float": "right"
    });
    b("span.jwcontrolbar .jwcenter", {
        position: "absolute"
    });
    b("span.jwcontrolbar buttoncontainer,span.jwcontrolbar button", {
        display: "inline-block",
        height: z,
        border: n,
        cursor: "pointer"
    });
    b("span.jwcontrolbar .jwcapRight,span.jwcontrolbar .jwtimeSliderCapRight,span.jwcontrolbar .jwvolumeCapRight", {
        right: 0,
        position: "absolute"
    });
    b("span.jwcontrolbar .jwcapBottom", {
        bottom: 0,
        position: "absolute"
    });
    b("span.jwcontrolbar .jwtime", {
        position: "absolute",
        height: z,
        width: z,
        left: 0
    });
    b("span.jwcontrolbar .jwthumb", {
        position: "absolute",
        height: z,
        cursor: "pointer"
    });
    b("span.jwcontrolbar .jwrail", {
        position: "absolute",
        cursor: "pointer"
    });
    b("span.jwcontrolbar .jwrailgroup", {
        position: "absolute",
        width: z
    });
    b("span.jwcontrolbar .jwrailgroup span", {
        position: "absolute"
    });
    b("span.jwcontrolbar .jwdivider+.jwdivider", {
        display: n
    });
    b("span.jwcontrolbar .jwtext", {
        padding: "0 5px",
        "text-align": "center"
    });
    b("span.jwcontrolbar .jwalt", {
        display: n,
        overflow: "hidden"
    });
    b("span.jwcontrolbar .jwalt", {
        position: "absolute",
        left: 0,
        right: 0,
        "text-align": "left"
    }, D);
    b("span.jwcontrolbar .jwoverlaytext", {
        padding: 3,
        "text-align": "center"
    });
    b("span.jwcontrolbar .jwvertical *", {
        display: "block"
    });
    b("span.jwcontrolbar .jwvertical .jwvolumeProgress", {
        height: "auto"
    }, D);
    b("span.jwcontrolbar .jwprogressOverflow", {
        position: "absolute",
        overflow: "hidden"
    });
    d("span.jwcontrolbar", "opacity .25s, background .25s, visibility .25s");
    d("span.jwcontrolbar button", "opacity .25s, background .25s, visibility .25s");
    d("span.jwcontrolbar .jwtime .jwsmooth span", "opacity .25s, background .25s, visibility .25s, width .25s linear, left .05s linear");
    d("span.jwcontrolbar .jwtoggling", n)
})(window.jwplayer);
(function(g) {
    var h = g.utils,
        a = g.events,
        c = a.state,
        e = g.playlist,
        b = !0,
        d = !1;
    g.html5.controller = function(f, u) {
        function l() {
            return f.getVideo()
        }

        function m(a) {
            x.sendEvent(a.type, a)
        }

        function r(c) {
            z(b);
            switch (h.typeOf(c)) {
                case "string":
                    var d = new e.loader;
                    d.addEventListener(a.JWPLAYER_PLAYLIST_LOADED, function(a) {
                        r(a.playlist)
                    });
                    d.addEventListener(a.JWPLAYER_ERROR, function(a) {
                        r([]);
                        a.message = "Could not load playlist: " + a.message;
                        m(a)
                    });
                    d.load(c);
                    break;
                case "object":
                case "array":
                    v.setPlaylist(new g.playlist(c));
                    break;
                case "number":
                    v.setItem(c)
            }
        }

        function n(e) {
            h.exists(e) || (e = b);
            if (!e) return j();
            try {
                0 <= k && (r(k), k = -1);
                if (!B && (B = b, x.sendEvent(a.JWPLAYER_MEDIA_BEFOREPLAY), B = d, A)) {
                    A = d;
                    F = null;
                    return
                }
                if (v.state == c.IDLE) {
                    if (0 === v.playlist.length) return d;
                    l().load(v.playlist[v.item])
                } else v.state == c.PAUSED && l().play();
                return b
            } catch (f) {
                x.sendEvent(a.JWPLAYER_ERROR, f), F = null
            }
            return d
        }

        function z(e) {
            F = null;
            try {
                return v.state != c.IDLE ? l().stop() : e || (s = b), B && (A = b), b
            } catch (j) {
                x.sendEvent(a.JWPLAYER_ERROR, j)
            }
            return d
        }

        function j(e) {
            F =
                null;
            h.exists(e) || (e = b);
            if (!e) return n();
            try {
                switch (v.state) {
                    case c.PLAYING:
                    case c.BUFFERING:
                        l().pause();
                        break;
                    default:
                        B && (A = b)
                }
                return b
            } catch (j) {
                x.sendEvent(a.JWPLAYER_ERROR, j)
            }
            return d
        }

        function q(a) {
            h.css.block(v.id + "_next");
            r(a);
            n();
            h.css.unblock(v.id + "_next")
        }

        function C() {
            q(v.item + 1)
        }

        function w() {
            v.state == c.IDLE && (s ? s = d : (F = w, v.repeat ? C() : v.item == v.playlist.length - 1 ? (k = 0, z(b), setTimeout(function() {
                x.sendEvent(a.JWPLAYER_PLAYLIST_COMPLETE)
            }, 0)) : C()))
        }

        function t(a) {
            return function() {
                p ? D(a, arguments) :
                    K.push({
                        method: a,
                        arguments: arguments
                    })
            }
        }

        function D(a, b) {
            var c = [],
                d;
            for (d = 0; d < b.length; d++) c.push(b[d]);
            a.apply(this, c)
        }
        var v = f,
            x = new a.eventdispatcher(v.id, v.config.debug),
            p = d,
            k = -1,
            B, F, s = d,
            A, K = [];
        h.extend(this, x);
        this.play = t(n);
        this.pause = t(j);
        this.seek = t(function(a) {
            v.state != c.PLAYING && n(b);
            l().seek(a)
        });
        this.stop = function() {
            s = b;
            t(z)()
        };
        this.load = t(r);
        this.next = t(C);
        this.prev = t(function() {
            q(v.item - 1)
        });
        this.item = t(q);
        this.setVolume = t(v.setVolume);
        this.setMute = t(v.setMute);
        this.setFullscreen = t(function(a) {
            u.fullscreen(a)
        });
        this.detachMedia = function() {
            try {
                return v.getVideo().detachMedia()
            } catch (a) {
                return null
            }
        };
        this.attachMedia = function(a) {
            try {
                v.getVideo().attachMedia(a), "function" == typeof F && F()
            } catch (b) {
                return null
            }
        };
        this.setCurrentQuality = t(function(a) {
            l().setCurrentQuality(a)
        });
        this.getCurrentQuality = function() {
            return l() ? l().getCurrentQuality() : -1
        };
        this.getQualityLevels = function() {
            return l() ? l().getQualityLevels() : null
        };
        this.setCurrentCaptions = t(function(a) {
            u.setCurrentCaptions(a)
        });
        this.getCurrentCaptions = function() {
            return u.getCurrentCaptions()
        };
        this.getCaptionsList = function() {
            return u.getCaptionsList()
        };
        this.checkBeforePlay = function() {
            return B
        };
        this.playerReady = function(a) {
            if (!p) {
                u.completeSetup();
                x.sendEvent(a.type, a);
                g.utils.exists(window.jwplayer.playerReady) && g.playerReady(a);
                v.addGlobalListener(m);
                u.addGlobalListener(m);
                x.sendEvent(g.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: g(v.id).getPlaylist()
                });
                x.sendEvent(g.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: v.item
                });
                r();
                v.autostart && !h.isMobile() && n();
                for (p = b; 0 < K.length;) a = K.shift(), D(a.method,
                    a.arguments)
            }
        };
        v.addEventListener(a.JWPLAYER_MEDIA_BUFFER_FULL, function() {
            l().play()
        });
        v.addEventListener(a.JWPLAYER_MEDIA_COMPLETE, function() {
            setTimeout(w, 25)
        });
        v.addEventListener(a.JWPLAYER_MEDIA_ERROR, function(b) {
            b = h.extend({}, b);
            b.type = a.JWPLAYER_ERROR;
            x.sendEvent(b.type, b)
        })
    }
})(jwplayer);
(function(g) {
    g.html5.defaultskin = function() {
        this.text = '\x3c?xml version\x3d"1.0" ?\x3e\x3cskin author\x3d"JW Player" name\x3d"Six" target\x3d"6.7" version\x3d"3.0"\x3e\x3ccomponents\x3e\x3ccomponent name\x3d"controlbar"\x3e\x3csettings\x3e\x3csetting name\x3d"margin" value\x3d"10"/\x3e\x3csetting name\x3d"maxwidth" value\x3d"800"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xd2d2d2"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAN0lEQVR42mMQFRW/x2RiYqLI9O3bNwam////MzAxAAESARQCsf6jcmFiOLkIoxAGEGIBmSAHAQBWYyX2FoQvwgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAtElEQVR42tWRQQrCMBBFvzDJRltcmDTURYO3kHoK71K8hGfxFh7DnS2atXSRpozbViwVRNS3frw/MMTM0NpYADsAOYAZOpDWZgXgEMfxwlqrpJSyJwAooihSWZalbduirms8CnmSJCqEgGcQgJkQQmAAwgivCcyjBf78xLs3/MUEM3/9WT9QuDVNE4gEDQlH564mTZdqSNh779dVVU6U0nMi6pXIuctJa7P13hdled4AmHaFO61WQkab+AHPAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAtklEQVR42tWTMQrCUBBE35evhX2UYJGTeACx8y4eQvRW6jWSVBJ/BCXEFMmStRISNKQSdWCrnZ0ZdlnjedOQNnLgCGycS2KzWCy12S3LsozjOM2y7AKsbFEUrXFjzCgIglkUReR5vh6oKs2q6xoRwff9CTAf0AFr7RAYdxKe6CVY1R4C6Ict+hX6MvyHhap++1g/rSBSCVB0KpzPyRXYv2xSRCRN3a2qqhOwM2+e9w4cgK1zSfgA16hp3sNEmiwAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"playButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAABIklEQVR42u3VoWqFUBjAcWFpaWn11qULew8RmQg+wnwAH0NBQYPFcosXdooYTH7FZhIEDQoaDIJJVDQ5bTeIHO8UFjzwR9sPPcdPYhxH4siIEziB/YFpvU69T71NvRAbFw5wybLsJgjC93T/sRXCAa5VVcEwDBCG4c9WCAf4zPMc5sqyhL7vN0FYQJIk8FhRFNB1HRaEBURRBEvNT9W27SqEBQRBAGulaQpN0yxCWIDv+4BTHMdQ1/V8vWua9jUfcSzA8zzYkm3bd0mSGGzAdV3AyTAMxHEcv/kVOY4Da+m6jliW5Z/eZMuyYClVVRHDMPyfjylCCB6TZRnRNM3v9aFdTdOEOVEUEUVR/N6j4qIoyo0kSf6oYXfsuD5/mSfw/4BfzM60PxpdNhsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"playButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAABIklEQVR42u3VoWqFUBjAccPi4uIe4D7A4g3rIoIIvsRd8ymmgoIGi9liEYPJZDMJgm4o6MCJYBIVTd+03SByzqaw4IE/2n7oOX4SAEAcGXECJ7A/MK/Huee5p7kHAnOhAJc8zz94nn+f719wIRTg2jQNTNMEURR940IowGtRFLBU1zWM44gFIQFpmsJ9ZVnCMAxIEBIQxzGstTxV3/ebEBIQhiFslWUZdF23CiEBQRAASkmSQNu2y7XQNO22HHEkwPd9wMlxnC9Jkt6QAc/zACXDMCqO4wTsV+S6Lmyl63rFsqzw6022bRvWUlW1YhhG+PMxtSwL7pNluaJpWtjrQ7uapglLoihWFEUJe4+Ki6IonyRJCkcNu2PH9fnLPIH/B/wA5fzQF959z6UAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"pauseButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAAmUlEQVR42u2WTQoCMQxGX8RlDzAX9FRezXXxAN30B+KmIDilmQHLKNNsCt8jPAg0RFSVkXVhcE3BCQTXVigiDlgAV6MAPOtLzVdcVcMmAbCo6v1DegMeG7kpcN77VbaDmwJKKd3ZWtwU5Jy7jRY/XpBS6jZa/HhBjLHbaPETjGi44O//QWisgrCDv5dg66r45rqWebZMwe8LXlPydRVUwjqdAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"pauseButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAAn0lEQVR42u2VSwrFIAxFr9AFuIRuoftxz+0SOnLs1A/cN3H0WhILlVJqJkIO4ZCIcSKJnjGhcwzBVwXGGAtgBmBrKgDY64maP3CSobWDmeT6J10AbI1cFVjv/SF3get3UEoRZ6txVZBzFgs1/rwgpSQWavx5QYxRLNT4B0bUXfD6dxBOVkG4wFXB7pxbTtZ1K5cFda9vQucaH3/yENwYP2sBdLsTPIMJAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"prevButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAA6UlEQVR42mP4//8/AzUww6hBowYNaoOAgAeIJaA0OmAGYn4gFgViTkIGqQDp/SAaiwHqJSUl6Q8ePFgMZMsRMsjg0aNHIIMM0A24cuXKmh8/fux/+fIlSF6XoEG3bt0CKbRHNuDbt2/7Hz9+vB8kB5U3IGjQ+fPn96enp5feuHFj5efPn/ffvn17P0gMGRNl0JEjR/YnJSWVbdmyZSWIjQ0TZdCuXbvgXgsNDc2YPXv2WpAYMibKoPXr12MEdkBAQMbEiRPXguSg8gQDW2X58uU4o9/X1zdj8uTJREU/dRLkaO4fNWhYGAQACIKTdMKw1gUAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"prevButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAA6UlEQVR42mP4//8/AzUww6hBowYNaoOAQACIFaA0OmABYhEglgFiHkIGGfyHMAywGGBSUlLS9eDBg5tAtgYhgxwePXoEYjigG3DlypVnP378+P/y5UuQvA1Bg27dugVihCAb8O3bt/+PHz/+D5KDyjsQNOj8+fP/09PT59y4cePh58+f/9++ffs/SAwZE2XQkSNH/iclJc3dsmXLIxAbGybKoF27dsG9Fhoa2j179uznIDFkTJRB69evxwjsgICA7okTJz4HyUHlCQa2wfLly3FGv6+vb/fkyZNvERP91EmQo7l/1KBhYRAAuDSgTOE1ffsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"nextButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAYAAADKO/UvAAAA6klEQVR42mP4//8/A6WYYdSQUUMGxBAg4ARiUSDmB2JmBkzAA8QSIBqfIXIPHjxYXFJSkg5kq2MxTAWobj+UxmmI7suXL/f/+PFj/5UrV9ZgMczg0aNHIEMM8BlicOvWrf0g/Pjx4/3fvn1DN8weJEfQkPPnz+9Hxrdv397/+fPn/Tdu3FiZnp5eChIjaMiRI0f2Y8NbtmxZmZSUVAZiEzRk165d+5Hx7Nmz14aGhmbAvAMSI2SI7vr16/eD8MSJE9cGBARkoAcsSI6QIXKTJ09e7Ovrm4EripcvX04wiilPbKO5eNSQQW8IAG8yOc7bkjJcAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"nextButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAYAAADKO/UvAAAA6klEQVR42mP4//8/A6WYYdSQUUMGxBAg4AFiGSAWAWIWBkwgAMQKIBqfIRoPHjy4WVJS0gVkm2AxzOA/RKEBPkNsXr58+f/Hjx//r1y58gyLYQ6PHj0CKXTAZ4jDrVu3/oPw48eP/3/79g3dsBCQHEFDzp8//x8Z3759+//nz5//37hx42F6evockBhBQ44cOfIfG96yZcujpKSkuSA2QUN27dr1HxnPnj37eWhoaDfMOyAxQobYrF+//j8IT5w48XlAQEA3esCC5AgZojF58uRbvr6+3biiePny5QSjmPLENpqLRw0Z9IYAAGB2RqagdTNIAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"elapsedBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAFklEQVR42mP4//8/AzbMMCoxKjHcJAArFxoDYgoNvgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"durationBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAFklEQVR42mP4//8/AzbMMCoxKjHcJAArFxoDYgoNvgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAM0lEQVR42pWNIRLAIADD0vrJwv9f2gkONJhcokJbDFyDZNbJwLYPhKWdkpaRzNL242X0A7ayDBvOWGKEAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAoUlEQVR42t3RTQrCMBCG4SwKgrhttaSkFAppS9Mk/VEPoTvBC7nyUIpnKq4/JwGDeANdPJt3MZMhDAD7xv4ixvH6SG5kfocL5wJlKVHXrQ+HLBNoGoW21R5Lks1dyhpdZwMXZ60tjOkDH40ZYO0YsDTlDzdvGLYBq6rmJESBvp8wjjvPPSnK8+JKoJTGNO3DFQsKZzeKdjw/z4vIkqx++o9eChh4OrGutekAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAqElEQVR42t3RTQrCMBCG4VkIgritWlpaCoW2oc1Pf9RD6E48kSsPpXim6vpzphAX3kAXz+ZNMiSEANA3+ukYBOuR3djhE6uqRp4XiKIEvHCZYl0bCKUaxPG0cCStHbyiUFitNneytoVnjJM4knM9PGs7iU/qui08mRuG0YP6fgfRtgOSJENZqhMNwx5NY5CmmbjylWbEM15yRGt75jD3z1yyhez4iz96A9GweD4LqeZmAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBuffer" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALUlEQVR42mP+//8/A3NDQwOJxNy58/8zCwkJNyARwsJglgiIBSPevn3TSLrxAICJLIFssC4FAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBufferCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAbElEQVR42mP8//8/AzpgHL6CMjJyvoyMDJlAIVuwoKysvA8TE9NCRkZGISCGqJSXV9wKFPQCC8AElZRUPgEFeVHMVFFR/QRUgSqoqqq+Dcj2RBFUU9PwBbIXALEQipOAEn5ACugkBlvGkREdAE2UZQboCcvbAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBufferCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAaUlEQVR42t3QuxGAIBBFUfoA+S1oM1KudkUi5s8VwXEcKzC4yXlLggAg3on/oVK6KDUsUg7zjdZ6GOOgtc18kCp6H+Ac4Rx5WCsSRfR43CqGENEjCqXhiEfX8xgntDKXOu7c2uGnP/+FB8gXjGr6cT/xAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALklEQVR42p3MsQ0AQAjDQCv7z8gakCo0LPDfnFyZJAh4J6oqZBt19zEzV7bhb792VRs5A8JlWAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAYklEQVR42mP8//8/AzpgHNaCvkCcCcS2MEGfb9++Lfz48aPQz58/ISpfv3699c2bN14o2s+dO/cJyOZFETx69Cim4N69e7cB2Z4oglu2bAHZvACIhVCctHbtWj90Jw3z6AAAdAV63jcCcQsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAZUlEQVR42t3QIQ7AIAyFYQ44boojQ1VisVgcggQzhn5ryraQ7QaIz/xJ85IqAOpLLRkb29n2xpQScs7ovVcOWmKMEY9SipMYQsDkkOi9x6RJJCJMxrm1FrfKxpAx5mSO6bU//3MBeArIus+/eXoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAABm0lEQVR42u2UTUsCURSGJ0kNV1MghjuhVhYEbSPoY5WbWhV90pd/SfwPulDc6c6vvYrjQl2kLdQ/IDhwe8/wTsQ04ZSbFg48Mtzzvsdzz71nNKWUtgjaMsF/SOB4VoAPrIIAWCMBrvmocX0k6Afr4BBcgRdyCQ4Y81P7zRwEO+CpUCjkJpPJ0DTNmTAejweyhtgjNcGvSWzzLkh2u11jNBqpXq+nDMOw6Pf7CkmUxERD7WcSKSki/9xqtYxOp6Pa7bYrEhONaMEmvVoIHGUymfxPRifZbDYPzzG9mg6ua7XawGuCer0+hOeGXi0snW42mzOvCbCNGTyv9Fp7+VWCRqMxheeZXuvntlKpeN5CtVodwHPH5ltlnKXTac9NFC08CXsL0oi4lFQsFo15ZtGw/LjdRDmKqBylXJJSqWTMMSepjdrH6GemGDiVhqZSqRz2+Y5um2jutFwuv8ka5+KEWt2+SPZV3mBgH1yABx6VcA/OGYtR6zoPOkvb5tDsEXnfYkx3mp3jHKIozCOO8F1nzHWc//5BWX6VF0/wATCN7PmY+qrmAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderCue" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAfElEQVR42mP4//8/AyWYYdSAUQOGuQGiouJZQHwEirNIMgCkwcbG7klra/tvEAaxcRmCy4Aj1dV1v3Nz8/+DMIgNEiPJgLS0jN+ZmTn/QRjEBoodJckLRkYmT5KSUn8nJqb8BrGBYtmkBmI2yFYgPgTEmaMpcdSAUQPwYwAtmWpcwU8bfwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"hdButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABiElEQVR42u2Vu0oDQRSGF1SwiIVCspfZnb1rEcxFCOmNzdb2PoIvpCCxEyJYqdU+gbVtKmMeQavx/KMDg4I4GxACU/wcZjL/+ebMzNk4Qgjnv+VYqIVa6HpC2223Ii1IYgXBX5lAF0HARBjyxoIfeUygIo5TkSQZmUO5c8TvY70yzwskDGsg+DFvBE3TXGRZoYw7jIWPnCcCEWM1D9V1vTcajSvX9edRFEsf/MZQGBWU5Pg+eyAJRIzVPOmS9ESw8XB4dIKKda8RNM9LKZW81xtMut3DM0QdSpB7xiJBVd5Mp9dbNPeme42gRVFKqeR0h+cEuEDUoag8ijhO4I7GG6R33WsI3ZfSK8JDQdShtIkrqvKZTgFtNsHx6l4jaFkeSOkVcR7/uFNavz2b3e7Sho5pPMdj072NoLgv1SK4p99aBi8XFTaCdjreK3oNRtwNXiKASIioXifaAus+2yuXvykg5inP8s/Qfn9wCsMqn0HyvyCPyQd/k9RSzd9Qra889q/NQi10DaEfbVCWtJniLegAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"hdButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABwklEQVR4nO2Uz0oCURTGXZigT+Br+ALiKyi4UAMJDAaEFkGLVrkM3BjkQiSFGElE0IUIIgrCLERUEkFJyD+ghLS1aVWn88kEg7i4KcwiRvhxzvngOx/cuV4LEVmMxvBAM9QM/Weh/DthnIyLcTOeA3Brfuw5EQl1xmKx+HK5VDebDR0K/NiDfSKhrul0qq5WKxgPBn7swT6RUPdisaDZbHY02IN9IqGeyWRCeli7y+fza/SomDX9mjmz2+2Xfr//UVEUdY/XIxQ6HA5JD2vnlUplgh4Vs6aHa7Wa0u/33wKBwK3X633Y4xUL7Xa7pIe1QCQSuZEk6QkVs6ZHi8XifDAYULlcHlmt1mi73f7a8YqF8jGRHtZOE4mEnM1mn1Exa3o0l8vN0cuy/GKz2S5ardb3jlcstNFokB7WpEKh8NrpdAgVs6aHM5mMwto7H+99KBSSm83mrlcstFqtkh5cnGQyuUaPilnTtxfJ4XBc+Xw+mUM+93iFQt2lUon0jMdjqtfr2x4V868ORqMR9Xo9XDLa9Yr+ZVz87VQ+MjoW7BF9HJz8beLpdFrlS0KHkkqlPoLBoPAzaPyDbwRmqBlqhv6JH8CLXqCC55PmAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"ccButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAB10lEQVR42u1Vu0oDQRQNmEZQSGHMYzebZHcTg0IeFlZaCIpGRI2itb+hEOMnWEasbGLlo/EHJDY21jYWvhURH5UijudMEomI4CQgBLY4zMxhzj1z78zddQkhXP8Nl2PqmDqmrWnq9fqywBUgmgD1WRXTq2BQE7puNAzqGUfFVITDURGJmBKhUFj4/UGZQXe3X2ha6Afv8wW+eIJ68kqm0aglTNMWhhGh0XUymV4olba8udxsn6bpOzSA0Vk6nZnZ3t7pmpycSoHfJ08d9cqmFBKBgCYQeBrmE+DPYbRRLK57cJD7TKZ/FNnOgb8Av1YorHaBf64dWNnUsmISmL/l8yvtCHZQd1cPWN9ibxvGI/LgPsgD73VaNVPbjklg/gq4cXdlwwjL4CjjLjI74V6Mx1X+nWXHIR4ty65pVU3jEtWHMpxI9M4j4A2y2qyW8Qn8QDyeWMT8DuUvLi0tezF/YZbUKpvGYj0SfEi8S4zZcvnQMzY2HsVaPiSMpzAYIT84OGRjvcdS17QNm/LELF99y+h65YV+bxm/7E/ub8iULcJeq4lZLtO0ZBsQlTuL/8pTQz2v48+mqVR6joJmPoPQXzKOygffDXQAnU2goxrH+bU5po5pC5p+AoMCobNnBGFcAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"ccButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAACIklEQVR42u2VO4saURiGbVZERC39AVZ2U9jK/gERCxG1sdIiAZukCWSxs1hZlE0jLtEQb9FCUfF+v4DXFTR4KxSDE9ikSDM72WTRk3OGGIatDgpLihGewo953+c4Z+bIAwDwnhseJ+WknPQkKfycQWQQAqKCnB+B6m8e9ZzhSGV2u/1yu93SFEWBY0F51IP6cKTEarWiSZJEwaNBedSD+nCkqs1mA9br9cmgHtSHIz1fLpeATa/X+2U2m+NisfiCIAhXIBD4gubtdvunyWSKiUSit0ql8joSiZBPs6gPSzqZTAAbg8HwyWKxvJ/P51Q4HP4sFAo9nU7nQavV+m0228fFYkH5/f5biURy0+12d+wstnQwGIADsGQPJa+LxSI5Go3AdDoFUPLYaDTQfr2s1Wp3hzlc1GO/3wfsPLa01WqBA/V6fS8QCF7FYrGv6Huz2QRut/sulUr9gNe+SCQS39EcLmLvcrm+5fP5HTuPLS2Xy+BApVIBer0+BPf0QzKZvHc6nRN4G68LhcJvtVp9Y7VaI3ABtMPhuJVKpe+y2eyOnceWZjIZwKZarT7odLoon89/I5fLnaFQaJvL5dCCaI1GE0ZzhUJxBR8kZs7O4kpV8XgcsIG/hNmf2WzGPBylUomZp9NpMBwOmfl4PP43Z4P7yhA+n4+ORqPgVFAP7uEgg+/epdfrpYPBIDgWj8dzbzQasY/B5z/wuT9xTspJ/zvpH7Snd5Nr6YMeAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"muteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAACPUlEQVR42mP4//8/Az0ww6hFoxYNvEVkAiYgZgZiRpgALSxijIuL4zt58qQNkM0Fs4xci0CaWYCYHUoji7G4u7sLv337dtaKFStsoWrIsghkILu1tbXCixcvmoBsXqg4C9AXphs3bjQEsvnKysr0gZYtlJaWFgUFJakWgcKet7Oz0/bdu3crX758uR/IF4f6hHXmzJna79+/X+Dl5SUD5AsdP368+uDBgwEghxFjERtIExBLALHMjh070r58+bL7zp07+69evQqySPbChQu2ycnJIAsFNm3alHDt2rUcEHvq1KnWt2/fbgX5kBiLhID0fhgGBsf+ixcv7j9//jwYA+Xljh49Gvb48eN6kOGenp7yQEfMA7KFOTk5xYCWLgKxibFI4sSJE/txYaC8FCj4rly5shhkIAifOnVqAYwNjLcFRFsEDOf9uDBQXpqDg0Pi8OHDMItEgGy4RTA2UUG3a9eu/bgwUF7+5s2b8evXr68EBV1kZKTSvn375oIMFxQUFNu/f/9CaPCTlhgaGxtTgEl495YtW/aDMCgxbNiwwdDU1BSkRgAYfxmLFy9OA7HXrFljv27duiZiEwN68uaJjo62Ahq2EmgILHmDihtWIN8QaNE8PT09SZDjLl++3DBjxgwvYpM31gyroaEhDzSkHjnDbtu2Ta+qqkoT5IMJEyaYHjp0aC4w5QmTk2EJFUEgn7EkJiaKAUuN+SUlJZaUFEEEC1UzMzOurq4uM2oUqgQtI7maGK3KRy0aPhYBAK/+y9iyNfpJAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"muteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAACW0lEQVR42mP4//8/Az0ww6hFoxYNvEVkAlYg5gBiFpgALSxitLOzk122bFkikC0NxMyUWMQIxNxALALEXFAxFiibS1tbW+vx48fX6urqcqFqyLII5EIRJSUlr8uXL+8HslWg4pwrVqwI7ezsDAGyVf38/OKBlj3k5+c3BgUlqRaxAbFiXFxc+YMHD96/fPkSpMAOZAkQ8+Xm5gY+e/bsvo6OjgOQr79p06btc+bMaQE5jBiLBIDYAIhBmn0mTJiw9uPHj3/u3Lnz/+rVqyAFfkADE4DxYghka02dOnXmnj17lgLZOvn5+VnHjx8/BGSrEWORwX8k8Pbt2/8XL178f/78eTAGygesXLmy/cKFCzuBbE1g/HhcunTpLpBtyMrKanHu3LmHIDYxFjmcOHHiPy4MlHcDYtszZ848AdJGQGxy8ODBB0AaFDfGBw4cALOJsgio8T8uDJR3Z2Fhsd+9ezfIIlDwmQLZcItgbKKCbteuXf9xYaB84L59+ybOnz9/EyjozMzMvLds2QIOOk5OTqtt27Y9hAY/aYkhNTV19fr16/8ADfsPwkAx3/7+/kAFBQUNIFt748aNi7u7u+eDEkNTU1M+0AH7QMmdnOStYGtrWzJr1qz369atAymwBWJ2IOYFGhwBjLc7UlJS1iDH7d+/f29FRUUtkC1MboYVFhMT8wS6fDeQrQzLsMCk7RMdHe0F8kFKSkrazp077wBTngE5GRZfEcQMLUg5gT7Wu3fv3t2wsLB0kKNoVqjKy8tLFhQURALZUpQWqoQACzTemImuJkar8lGLho9FAFfb1pYP/NUtAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAA2klEQVR42mP4//8/Az0ww6hFoxaNWkR9i3AARiBmAWJ2EE0ri0CWsFtbWys8e/asCcjmpYVFTCCD29rabN69e7cSiPcD+WLUsogNiIWAWAKIZbZv357y9evX3Y8ePdp/584dkEUS1LJICEjvh2GQL65evbr/8uXLYExNiyROnjy5HxemqkUHDhzYjwtTNei2bdu2HxempkUoiaG6ujpl1apVO9euXbsfhKlpEXry5gkPD7eaM2fOymXLllE1eWPNsMrKynITJ06sp1WGpV0RNFpNjFo0atHgtQgANKFe0TzIhR0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"unmuteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAA2klEQVR42mP4//8/Az0ww6hFoxaNWkR9i3AARiDmBmIRIOailUXMIAuUlJS8Ll26tBfIVqaFRWxArBgTE1P64MGD9+/evQMpsKKWRQJAbADEDkDs09/fv/rTp09/Hj169P/OnTsgBQ7UssjgPxIA+eLq1av/L1++DMbUtMjh5MmT/3Fhqlp04MCB/7gwVYNu27Zt/3FhalqEkhgSExNXLV++/M/atWv/gzA1LUJP3grW1tbFkyZNer9s2TKQAktaZlhhIPBoaWnZTasMS7siaLSaGLVo1KLBaxEAvQpqyzzc7aAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"fullscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABX0lEQVR42u2UQYuCQBTHFTxJUJ0LJWiPQp/Dm126+x3yLi3YKU/dO+ilgx2iyETesXuelESNuvcN3HkwLh6WRXZYlgUHfoyg/ObN/43DlWXJ/QZcK27Ffyj+ZvAEkSATFMKEMiZ0mMSz2Ux+PB4O+Q7qoJy14p4kSdPL5eKTBaACK2cRCxjDarVa3O93yLLsE1Zxd7PZzF+vFyRJAnEcAxk+PmPmLOK+53lWFEVwvV7BMIz34XA4DcPQwZ00EfM1cPtdzBY7T3hbr9eWaZoGPR09VVVxFpuIRU3TZCqTcfun08lCKZX36TuhXkQTsVwUhTMajaa2bS+ezyekaQrn89mi0i9HE7FCjhPcbjcfu388HuFwOMByuZzTWH4snux2OwiCAHAmDQNd1xc0U4FJvN1uoYI0yx8MBhrNlWcRj13XhYr9fg95njv4O7OKO/RiqS4ZhcYgMonbi74V/0PxB6RCFmvPDfJxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"fullscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABaklEQVR42u2UIWzCQBSGAYFsEGwISBNkp5hHoHFV9dXD1tehiqpjSQ0GwS2hNE0bUokHBYUUmtbXVb7dS66IZVkaLsuypJd86aXiu3f/u7saANR+g1olrsR/KP5h1CkCRaIMKSPGgNLiETcURZGSJAnhy0A5b8XPoihOdrtdTheAAqycR9zEGAzDIHEcQxRFd3jFbcuy5lmWwel0guPxCEEQ5DjHzHnEndVqZR8OB9jv96Bp2kev15tst9sQd1JGjFk22Be338ZssfOUV9M0bV3X3+n8Bf+Px2M8JUIZsSDLssRkEm7fdV0bpUzeoTyxRe9FlBFLt9st7Pf7k9lsRtI0hcvlAp7n2Uz67SgjHtLjBOfzOcfuO44Dm80GptPpnMXysHhECAHf9wG/tGGgqiphN67JJV4ul1BAm5V3u903lnmdRzxYLBZQsF6v4Xq9hnidWaMeFrfYw1I8MkMWg8BVcfXQV+J/KP4EGwslGEtzWUAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"normalscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABX0lEQVR42u3VMYvCMBQHcPXw1K3oKfclzqGlU7+MWye3c3Lph+gmdHGuW8WpGUrrarEIrlZEBKEtdPbegxeQG3pHglsDf0hJ+6N5adLG4/FovCKNGq7havgfrfmUFqQD6ULecFAGbs/n8w/ClCAIJofD4Rv6A8RlYCXLsoVhGOP1em2WZekXRcEAn8FYTwYe3W43dr/fXUTP5zOD+JvNZoJlkYE/Ebter4yjy+XSxJlgzaXgNE0ZT5Ikrq7rX1TzpgzcP51OjOdyuTCsuWVZQ1n4HXF8c8qIytD+C27STQo9xIE+oZWtEsZp5Xm+gGv2HMLFYVwITdPGURS5sDiMh95cGMZtqnieZx6PR3+/3zMeWbiD2xQ2gB/HMYP4cO1in2ouDPe22+1st9sxiG/btqmq6jgMwwUtqDCMp9RgtVrNHMeZENadTqdD+lqEYY736Ehs/ToqxeD611TDr4V/ALfMb7vGw5DiAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"normalscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABbklEQVR42u3VMauCUBQH8GqIN8UbImlocHSrPeR9haYWV7fX6NRniIbCqUDQwRpycVC/hFMNXSKzoD0Cx/PugeMbGnwPL21e+KOg/jj36L3WAKD2jtQquIKL4X+MOk+Djk2eNk+H5wMvisCt0WikEKZYlrUKgsDn5wPERWDler0yWZYn8/ncez6f8Hg8IIoixCUReHi/3+F0OmUIJkkC5/MZTNNcYVtE4C/GGFwuF8Dj8XiE6XTq4Uyw50Lwfr+HPLwFWa/X+6ae10XgfhzHkOdwOECapmw8HmPFDRH4E3GsnDKkNrT+qrhONyn0UA70CS0cRXADp3W73Ri8DMJLw1hxp9vtTtbrdeb7PuShykvDuEyV2WzmhWEIu93uN6JwG5cpXwCw3W7BdV1YLpfZZrMB6nlpWOKw7zgO2LYNmqZ5kiRNFosFoxdaGsZdamAYhq/r+oqwjqqq+SdVGs5xibbE5stWWQ6ufk0V/F74Bzh6cDMaFwHFAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAAWElEQVR42u3VsQ3AIBBDUW4ASpQGIRS4sP+EzgzpYun/CV5lh6TiUAAFChQoUKD/grZ2WUij9+EBnfP2gK6VHtC9baCPBzTzeEBt5klS5ZmAAgUKFCjQr71HYkzTWoeyuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAgUlEQVR42tXQQQqDMBAF0MFdwa02xBDTSWK3dW+X9rYt9GTV9gDfmUDBK7h4kPn5kCEEgPboOEHTnFUWT7HqcBUfYyyc86C2NS9rHfr+ghAY2lj1wJwQYy6NL3NESrmgrnNv74MMQ0HTdL9Ja/mH+nY1z49Rm3LxK3toKE6iPs4XboLWK4v24Kf0AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAgUlEQVR42tWQTQrCMBCFB3dCt60hDWmcJHWr+7qst1XwZCp1/3wjCF6hiw/m/cAMIwDkH1mP0ba7F7mS+jVCiHDOg8aDHCQlxTDs4X1A17mb5FyhWmABG4uUUmGoZmu8aYwwYkzo+3CXn2D6nKbzUTgslszz5cS1GzumIVsT63rhB+kPMQcishPoAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAASElEQVR42u3UsQnAQAwEwRe4/wLVh5TqWzDGiWC2guGCi5k5GwpQUFBQUFDQr9AV0sjMFdCnqg7on9DutqgfBQUFBQUFBX3bBU4WWutcf3kcAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAATklEQVR42mP8//8/AzJgHB4CfUCcDBb4/fv3hDdv3uR/+/YNouLy5csf//79ywfXcvTo0Y9ANkJg9+7dE4HsPBRDN2zYMAFIJTEOoxADAG38dDtrd5P1AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAT0lEQVR42t3QIQ6AMAxG4d5fkHGS+un6JtXV84Cr+TfKQuAIID7z5CMA9ETfDtuw3MHd0VpDRJQMqoqTmR0ZRATTFWqtmNYMzLwP5SeDXjqg+Gveu5kMqgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"display"\x3e\x3csettings\x3e\x3csetting name\x3d"bufferrotation" value\x3d"90"/\x3e\x3csetting name\x3d"bufferinterval" value\x3d"125"/\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xffffff"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAZUlEQVR42u2VwQ3AMAgDebBClEUYt8NV+XUBvnQKq0UcC1jYZ9nX2pcJzyNiSwUy06QCJj6vMvUH1dwiBEZgSg+gCIv6Y0rIAygi5D8UjUUjA/aAyZwwOPIP2mMKRd9bdM79KAVee0AqrmZ58iQAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"backgroundOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAZklEQVR42u2VsQ3AQAgDKVjhlS5TsH+dMV4MQUumsBL0xwIW9ln2ta7HhOcRcUsFqsqkAiY+7zb1Bz3cIgSOwJQeQBEWzceUkA+giJD/UDQWjQzYAybzhMGRfzAeUyj63qLMnUqBF2JaKtp629puAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA7ElEQVR42u3XvQqDMBQFYCPYWLWIiNFFUePvUju2e/sA9Vnsmzj2WbXXQktxkWgoIjlwudtH7pDhoL7vpSGEeBWsG0wEgyXGoAEC5G5ZVk0I0XRdV2RZRsyQ47hHQB6+75td173hzytZoYbS+IyxynzOGGrzvAjmnDOGnmVZutLCCOjfUFGsDyoENAHBp90ulK8MyjIBTUMZHyhNBTQFJUkqoAmI0mSrUBxzg+jKoChaHxTzgUJuUMgNirhAbRCEAYIshRrX9S6qut8thSpN0xvbts0lxeZb/ACrDeOgYYyVOWeinyp6gnWdW0Vft69cndg2ea8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capLeftOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA50lEQVR42mP8//8/AwiIiUnYAKlIINYCYk4GEgEL1JAMQUHBTDExMV5ubm42JiAg2SCQS0CGyMrKCv/794/p58+fDDBXkuqiSCEhQZ4/f/6Q7Ap0gzRZWNjYyXAEhkFcTEyMQNdQZhITA5XAqEFEpmxKo576LqI0DY3G2pD22qCK/mEc2IMv1kYDm+gwGi0hR2YYUS2LjBa1dC/YqOai/4PMa9/+/fv/j5GRkYnSWLv+8+ePX9SI/uWfgeDfv7//IF4kDzO9evXiyLdvX6e/BYLv33/8AHoTXKqQihmRuqK2QCqC3K4oAL0UgwtgxUxZAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA8klEQVR42u1XQQ6CQAwEUlfjTRLAC4k/8MIX/IDv8w16l1foA9RwUjhw2JW4IWFt9QPAokHcJk2zPUw6nWyTAc8LNlbzkJhnzH2aXo/UgCiKgqYoVVUpIUSQZdnS9+dbBNtBURSNx7ExGGPjMAwZPtcIdoIWtCyl1CtxMtt1Z9M8z1eAb60AYCMsC5xID8lxbBvLBKyOwgDVANKV/xPUlFHtB1UbrPyDXnbfVDPLrrMjcyH/eEcdfhFzar932DqbqHfy66qm3p9Vaqsm5aMk76ZFjXwb55x8WtyKGtGRUpZCcLR7dzJ+B0iSy03DisYEQo0nc8B4p9SUlywAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capRightOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA7klEQVR42u1XMQ6CMBSF5qdGEwdJQBfY3Rm9iEfwRHoDL8LgAYyzYTIwMFCrOFBfPQFQNKh9yU/TDi///Zf+5JHvzw9Oe9xQJ9Q+yy6JfqA4jqO2LDUghIjyPF8FwWILsh1JKVu347ou45yPwzAc4boB2ZE6yHKUUq9CY8zzZtOiKNaEuxGIOMexREdmTIy5DMeEnJ5giRoQmdr/DmnKuvaFrv2s/T897KG5ZofdZEZ2Q/7xjHr8InbVfm6x9dbR4Ow3dQ1/tdaxy9i1qro/dHYzkqZzWwnoANhJGuSoChCiLKW86uCXUJqe0z6i6BMdqXhIR7IE5AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"bufferIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAABTElEQVR42u3WPUtCURzH8Xt92HRwCJokNAOJqKVcitBF0pr0FfRAay+gqDFobXaoKXsD6SY4Nbk7CA4OUa/h9jvwjy6XfDjdw+UIP+EzXfR+z/3fc9DxPM+xicMgBjGIQQxiEIPsC6rAGD6gYUPQ0Pv9fIIbVVAcknOCvqIKOoaBqP8xshFMoBm45soilJjJoHd5EkpfY8UJX1DSZFDPF9S1IagEHXiDXY0gV6ISpkfGg3EpgnbgCdpwYOBmKSiI1H+CWvISK69hDzzYgKJYDxvUtiFoG57hBfYNjCwddmTcZUsdtAW3cA15jRtk4BDKsGIy6B4exY1GkIo5EVVTQWq7P/iC7jT/3v4EHS1ydCz6w3sSpZ7UZuBaDi5EcJyrElKDrOmXetrqzuBKXE75XizKXXbqCzq3YdtnJUpZ48HIIAYxiEEMYhCDZvsG/QUNjWGQyWIAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"bufferIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAABTElEQVR42u3WPUtCURzH8Xt92HRwCJokNAOJqKVcitBF0pr0FfRAay+gqDFobXaoKXsD6SY4Nbk7CA4OUa/h9jvwjy6XfDjdw+UIP+EzXfR+z/3fc9DxPM+xicMgBjGIQQxiEIPsC6rAGD6gYUPQ0Pv9fIIbVVAcknOCvqIKOoaBqP8xshFMoBm45soilJjJoHd5EkpfY8UJX1DSZFDPF9S1IagEHXiDXY0gV6ISpkfGg3EpgnbgCdpwYOBmKSiI1H+CWvISK69hDzzYgKJYDxvUtiFoG57hBfYNjCwddmTcZUsdtAW3cA15jRtk4BDKsGIy6B4exY1GkIo5EVVTQWq7P/iC7jT/3v4EHS1ydCz6w3sSpZ7UZuBaDi5EcJyrElKDrOmXetrqzuBKXE75XizKXXbqCzq3YdtnJUpZ48HIIAYxiEEMYhCDZvsG/QUNjWGQyWIAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"errorIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAACs0lEQVR42u2XTWsaURSGbWtKqbQULJiGbrppN666K3EhNF11IYhZJnSrCO0P6MKG/gEX7SKbiKKCEUQEC4pCIKCoqPUThJDqSg1C6CoQwu15B0fMdBzHkDEhXOGB8dxz7zzOdeZVHWNMd5vQcSEuxIW4EBfiQndJ6IqvFeLpmJXbILS6u7v7FeD4poUeGY3G991u97TX652aTKYN1G5K6D7xyufzJfv9PgN7e3u/UMPYTQg9sVqtnwaDwTldHQZwjBrGli30gDBns9kmbRc7Pj4WwDFqGEPPMoWMTqfzG10RdnR0dAnU3G73DnqWJfRQr9e/q9Vqw06nw+TAGHrQq7XQPeKl1+sNY4tarZaAzWbzA/E9xtCDXszRUuix2Wy20wnP6vU6E6H6RzBdQw96qW7QSgi3+etYLJZrNBqsUqlMoLoVTNfQE4/H81R/s8hjYBGhZ5ubm5/pk1+USiU2jSgkraMXczD3uoWQV29zudyfQqHA8vn8JUQhaR29mIO5anNOrdCqx+P50Ww22eHh4X+IQnJjmENzf6rNOTVCyKsNunv+HhwcMDlEoVnjmLu2tvZBTc7NE5rkFV16lslkZBGFZo1jrtqcmyck5FW73T5PpVJsFuJtr9SDNdTknJKQkFfpdLqJBZPJ5Ey2t7f9W1tbfqUerIG1xjmnv4qQ0eVy7ZTLZZZIJBQZjUYC8/qwFuXcd1r7+aJCQl4Vi8UhPQjZdUKPAsWckxOa5BX9lGDRaHQuFotlH6jpxZpKOScnJORVtVo9i0QiTA12u32fiKjtx9qzck4qNMkrXN5wOKyK4XDITk5OVPePt08256RCQl7RPl8Eg0GmJfT9vHA4HF+kOScVevGbXqFQiAUCAU2BFM6FcyoJGbBlxLr49NWQ9fG5DPy/PRfiQlyIC3EhLqQh/wBHF7waCbYO0QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"errorIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAACs0lEQVR42u2XTWsaURSGbWtKqbQULJiGbrppN666K3EhNF11IYhZJnSrCO0P6MKG/gEX7SKbiKKCEUQEC4pCIKCoqPUThJDqSg1C6CoQwu15B0fMdBzHkDEhXOGB8dxz7zzOdeZVHWNMd5vQcSEuxIW4EBfiQndJ6IqvFeLpmJXbILS6u7v7FeD4poUeGY3G991u97TX652aTKYN1G5K6D7xyufzJfv9PgN7e3u/UMPYTQg9sVqtnwaDwTldHQZwjBrGli30gDBns9kmbRc7Pj4WwDFqGEPPMoWMTqfzG10RdnR0dAnU3G73DnqWJfRQr9e/q9Vqw06nw+TAGHrQq7XQPeKl1+sNY4tarZaAzWbzA/E9xtCDXszRUuix2Wy20wnP6vU6E6H6RzBdQw96qW7QSgi3+etYLJZrNBqsUqlMoLoVTNfQE4/H81R/s8hjYBGhZ5ubm5/pk1+USiU2jSgkraMXczD3uoWQV29zudyfQqHA8vn8JUQhaR29mIO5anNOrdCqx+P50Ww22eHh4X+IQnJjmENzf6rNOTVCyKsNunv+HhwcMDlEoVnjmLu2tvZBTc7NE5rkFV16lslkZBGFZo1jrtqcmyck5FW73T5PpVJsFuJtr9SDNdTknJKQkFfpdLqJBZPJ5Ey2t7f9W1tbfqUerIG1xjmnv4qQ0eVy7ZTLZZZIJBQZjUYC8/qwFuXcd1r7+aJCQl4Vi8UhPQjZdUKPAsWckxOa5BX9lGDRaHQuFotlH6jpxZpKOScnJORVtVo9i0QiTA12u32fiKjtx9qzck4qNMkrXN5wOKyK4XDITk5OVPePt08256RCQl7RPl8Eg0GmJfT9vHA4HF+kOScVevGbXqFQiAUCAU2BFM6FcyoJGbBlxLr49NWQ9fG5DPy/PRfiQlyIC3EhLqQh/wBHF7waCbYO0QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"playIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAABzElEQVR42u3XTYtBURjA8VuzmdWsZmk7GzWfxL1IJMs5n8GXkISFzCQz5pSUlMUjC2WhLCyUBclLXkIkNt5ZmXt3FpLn3nPRdE796y5/dc+rcDwehUdK4CAO4iAO4iAO+o8geTzLvcq9yD0JOg0MyNDv9z/dbveH/P2mFwwDMs7nczgcDlCr1X71gmFA76PRCJRmsxns93tdYCjQYDCA06bTKXMYCtTr9eBck8kEdrsdExgK1Ol04FLj8VgzDAVqtVpwTcPhELbbrSoYClSv1wGTvE3AZrNBwVCgarUKaup2u7Ber6+CoUCVSgW01G63YbVaXYShQOVyGVjUbDZhuVyehaFApVIJWKbMs8ViAY1G4zsUConKeYkCFYtF0KNMJvPj8/kkNKhQKADLYrEYdblcRPUvy+fzwKJoNEqdTifRPKlzuRxoKRKJUIfDQZgt+2w2C2oKh8PUbrcT5hsjIIe8cqjNZiO6HR3pdBquKRgMUqvVSnQ/XFOpFFzK7/dTi8VCbnb9SCaTcC55D6Fms5nc/IKWSCTgNK/XSyVJIve6whrj8TgoeTweKooiufcl3xAIBL5MJhN5lGfQYz0U+duegziIgziIgzhIfX+1FIqPwZcb/gAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"playIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAAByklEQVR42u3XuWoCQRzHcYuUKVPmAXyAlBbpPRFFfIek8yXMIGohFiLYiCCChWIhWAgWFoKFIh54RGUH0cZbq192OwsR/+uuSpiBL2z5gZ3TAMDwTBkESIAESIAESID+I0ger3Lvcm9yLwadBgVkHI1GHZ/P9yN/f+gFo4BMi8UCx+MRzWZT0gtGAX1Op1MozedzHA4HXWAk0Hg8xmmz2UxzGAk0HA5xLs459vu9JjASqN/v41KSJN0MI4G63S6uaTKZYLfbqYKRQK1WC5TkbQLb7ZYEI4EajQbUNBgMsNlsroKRQPV6HbfU6/WwXq8vwkigWq0GLep0OlitVmdhJFC1WoWWKfNsuVyi3W7/RiKRL+W8JIEqlQr0KJ/PjwOBwDcZVC6XoWWJRIJ7vV6m+peVSiVoUTwe5x6Ph908qYvFIm4pFotxt9vNNFv2hUIBaopGo9zlcjHNN8ZcLgdK8srhTqeT6XZ0ZLNZXFM4HOYOh4PpfrhmMhlcKhgMcrvdzu52/Uin0ziXvIdwm83G7n5BS6VSOI0xxq1WK3vUFdaUTCah5Pf7ucViYY++5BtDoVDXbDazZ3kGPddDUbztBUiABEiABEiA1PcHSCzm64IZEhcAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"replayIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAAEwUlEQVR42u1YW0icRxR2o6k2pmyMa0NJjRrRtWgp3rA00ifJpuqqL1FEpGLxQQVJIaUVgnZViqIglHh5UHej4mXpqruj4v2CFwTxLgjiFRUUUby8KCL2fMv8QYKa/Lsb0sL+8OHvzJxvvn/OmTln1ubi4sLmvwQbqyCrIKsgqyCroP+jIBMeB8J9wheEWx9q9DEFPVxeXi5JSUmJo3c3wh2C5FMK+mZ/f5+dnJywoaGhsvDw8J8gkq+c5FMI+nZra4sBXJiBMVYUEhLyI/U9IHx2lTBLCZLwL5cR3AlygnJjY4MJ2NzcZAcHB+zo6Ki5pqYmx83NLYjGOBPsLClIwmPDNTIyUlFXV6eanp5W7+7u6k5PTw3r6+vsXUDc4eEh29nZ+ae0tPSlo6PjY75aZgvCl8mUSuXT4eHhcgjACmxvbxsnXVtbY6urq9cCY46Pj9n4+Hgm8dw1V9BtBGhubm46uaAFIpaWlkRhcHCwPiMjIwWra+4KYWVcNRrNKxJjJF9cXDSitbX1jUqlylQoFEpyxXOh/TJoRXTZ2dm/29vb+xKP1NwYQsy4FBUVvdjb22MLCwtG9Pf3a5OTk3+hPm8eqAjw74R+YGpqSl9cXPyXh4dHCA9+O0ts+zsIXnKRfn5+ngEtLS3VNMkT6rtHsL18DqF/dnaWVVVVvabtHkZtX13a7sKG+FIqlT7gHyFKEAhcBwYGyubm5tjMzAzr6urSent7h1K74xVnysO2trbXUVFRz+n9EeHzS2PwVxodHR1GG+LvycnJYvr/a7SLEeRA5M9WVlYMRMAmJiZYfHz8zzwOJDfksrtX5LJbCQkJ/rTLWrAbwQlu2IgRJKuurv6TghKByejMeUNtXu+46UMffMDjhoYGjcAHbswhRpA7uUg9NjbGgKysrEwewKY+zuAQ+MCNOcQIklOS1JHPGRAREaEUAtHExwEcAh+4MYcYQb5kaKADDYcac3Z2DjbRXW/jSCaTBQl8IyMjBswhSlBPT4+hr6+PAT4+Pj+YK8jFxSVI4Ovt7RUtSN7U1KTr7u5mQFxcXLSZLrOnbR8p8IFbrMvcKysr1R0dHQwoKCj4jW9rU5/7hYWFLwW+iooK0UEty8nJUdFhxwAi0Zix7WHj1dnZqRH4KFGL3vYOYWFhz/R6vYEeNjo6ytLS0m46GG86g6SwBQe4wAlusQcjiB7l5+eXNzc3M4BSiNbPz++61HGdGEfYUI5rFHjAydOLRHRyDQ0NVdTX1+t1Oh0OM0YVYrVcLn/CV8r2PW6SYixsYAsOcIGTJ1rTyo+kpKQXjY2NTKvVovRABajl7vPige7A85ctf8eJ7oUxGAsb2IIDXOAUVtjkAi01NfUVfR2jfMTa29sZ1dGoeTRlZWV/xMTEKJ2cnII9PT2/pwQcQ7VzJvowBmNhA9v09PQsXjHaWaSEjY2NTafKsYUSLZKt8YBDBYla+fz8nJ2dnRkLerShTxhHNvrExMRfuZjblrp1GIv8wMDAp1SSltPVxlBbW8tuAo1hGBsQEKDgbrKz9L3s7TXI399fQW5U5eXlqUtKSnRqtdoA4B1t6AsODg7nu+naa/XHvCj6csh5m+x912hRgqy/D1kFWQVZBVkFWQVdj38BAk7AFyu8ie8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"replayIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAAE2ElEQVR42u1YaUhcVxi1xirttDHWpbQxtSKoSRTiVoUaKFQquBOCVkQwkmmrVqH9FyiKC1TRYv+o+eFWNW513zruiguCdRcUcWXGRhFFR1q143j7neG+IMFJ88YJaWEuHHze5bzz7v22O0aMMaP/EowMggyCDIIMggyC/o+CdGjvED4kvEe48rKLXqUgp5WVlXmpVPoDPbsQrhKMX6egT/f29tjx8TEbGhpaCAgI+Ib6HAkSwhuvQ9Bnm5ubDODC1K2trWPe3t5f0pg94a2LhOlLkDH/cluCK8GbkCiXy5kAhULB9vf3mVKp/Lu8vLzTzs4ugOZcJ5jqU5Axt41bQUFB0srKStn09LR8Z2fnr5OTk7ONjQ32PCDu4OCAbW9v/5mfn/9EIpHc4bt1aUFvEm4EBwc/HB4eXoQA7MDW1pbmpevr62xtbU0rMOfw8JCNj4/XE4/FZQWZwYvS09Mf0xGoIGJ5eVkUBgcH95KSkn7G7l52h7AzN0tLS5tJjIZ8aWlJg7a2tj9SU1Pr/P39k+goHgn950E7cpSSklJjZmZ2l3hsOJ/ONgSb+SgnJ6dkd3eXLSwsaNDf36+MjY39icY+4YYKA/9cGAempqZOc3Nz++3t7UO58Zvqw+2vwnjpiE7n5+cZ0NTU9JRecp/G3ieYnI9DGJ+dnWXFxcVz5O4PqM/hnLsLDvGxubm5Pf8IUYJAcGtgYGBhbm6OzczMsK6uLqWjo2M49V+7IKY4tbe3z4WEhDyi59uEd89Favy1CQ0NfUAOMT05Ofk7/e+MfjGCJET+1erq6hkRsImJCRYZGfkjt4OLIq+E5zKLC3LZlaioqC/Iy1TwRnCCG2vECLItKyv7jYwShsko5mxSn9dzx/SyDTt0p7q6WiHwgRvvECPIlY5IPjY2xoDk5OQ6bsC6tuvgEPjAjXeIEeRDSfKIzpwBgYGBiYIh6tgk4BD4wI13iBF0lxaqKaAhqDFLS8tAHY/rmR1ZWVkFCHwjIyNqvEOUoJ6eHnVfXx8DnJ2d711WkLW1dYDA19vbK1qQT0NDw1F3dzcDIiIivuNVoa7tbXL7bwU+cIs9MteioiK5TCZjQFZWViV3a13bB9nZ2U8EvsLCQtFGbZuWliajYMcAIlFQn6eOx4Y1np2dnQqBjxK1aLeX+Pn5fd3c3HzW0tLCRkdHWXx8/IsCo7aGuTZYCw5wgRPcYgMjgtntzMzMxcbGRgZQClG6uLhoSx3axFzDGspxBwIPOHl6MRadXH19faVVVVWn9fX1CGaMKsSnTk5O9/lOmfzLMdlgLtZgLTjABU6eaHUrP2JiYkpqampYbW0tSg9UgEp+fJ7c0CU8f5lwT0RE98QczMUarAUHuMApJF5dCjTUMTfj4uKa6esY5SPW0dHBqI5GzaMoKCj4NSwsLNHCwiLQwcEhjBLw91Q712EMczAXa7A2ISGhDVzna6NLlbDh4eGPqXJUUaJFstUEOFSQqJXVajVTqVSagh59GBPm0ZrT6OjoX3j5aqavW4emyPfw8HhIJekiXW3OKioq2ItAcxjmuru7S/kxmer7XvbsGuTm5ialY5RlZGTI8/LyjkpKSs4APKMPY15eXnHcm7Req1/VRdEHeYnDh/fd4AZurJe7veH3IYMggyCDIIMggyDt+AeCTA8AFSrCbwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"dock"\x3e\x3csettings\x3e\x3csetting name\x3d"iconalpha" value\x3d"1"/\x3e\x3csetting name\x3d"iconalphaactive" value\x3d"1"/\x3e\x3csetting name\x3d"iconalphaover" value\x3d"1"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"button" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAzUlEQVR42u2YMQ7CMAxF7aRiSQckWtGOHKMLR2DimFyAE3CUdqWiQ4ucYANXqIiRv+T96ek7kYx1vS8A4MzT8QTIMxPPjefyhm2a5tS2bem9xxxpiSj1fV8Pw/AU4K6qduWyLJhSylIvcoSRgY8CHIgiQsb5ihTG4EBZDHjtFJ+OKANmZKuEAWvtsE7DmpbOKmGVsEr8xrB9zSsbVvdKWCVs6cywGf4bwwI8EcXknMv6+hNjFKuTD6HcIsJhw5EbVq6w43h/zPN8RW3n1hcs+1ICqMmZZQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"buttonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAA1UlEQVR42u2YMQ4CIRBFgV1LoXA3snoht/MOtnoarbyF1R5ptxRsDAngTKKtnWbYzE8+oXz8/IGEum3XCyHECbwDa0FTD/AAPtewHK21h67rTFVViiJtjDGN47iZpumJwH3TrEwIQeWcScYrpVTICMB7BNZwACUI6x0kMupaFCYG/gsw0Vn7lnDmSjBw4R3moeNKcCW4EjO7h/lp/nHCxd0SXAkeOk6YE55Vwj7GlBSIMmgCISsCD97ft1obQxUaYb13DrY3BL445yS4h/2SaMCf79brC0M0WI9LC6AuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"buttonActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAyklEQVR42u2YPQ4CIRSEccF2fwIbKz2T23kKaz2BVt7Dai9G4kJls+CbRDtbzWPzJhlCqL5MBkie6fvNWil1Ju/JreKpQB7JF0PLyTl3tNZ2WuuKI20iee+35CeAB86wUEUCIwEfANziIOesOAuMYDWqMAnwX4CZ1/dbwlkqIcCFd1gunVRCKiGVWNg7LF/zjxMu7pWQSsilk4Ql4UUlPM1zSu/JClthvgZWAI8xTru6bjqu0ICNMTxoewfwNYSwIg+0b5gG/Bm33l7CZ0/XNL9BmAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAgCAYAAAA1zNleAAAAFUlEQVR42mP4//8/AzJmGBUYFUBgAEE5fpDLFJZbAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"playlist"\x3e\x3csettings\x3e\x3csetting name\x3d"backgroundcolor" value\x3d"0x3c3c3e"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0x848489"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"0xb2b2b6"/\x3e\x3csetting name\x3d"overcolor" value\x3d"0xb2b2b6"/\x3e\x3csetting name\x3d"titlecolor" value\x3d"0xb9b9be"/\x3e\x3csetting name\x3d"titlesize" value\x3d"12"/\x3e\x3csetting name\x3d"titleweight" value\x3d"bold"/\x3e\x3csetting name\x3d"titleactivecolor" value\x3d"0xececf4"/\x3e\x3csetting name\x3d"titleovercolor" value\x3d"0xececf4"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"item" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAIAAACnG28HAAAAoElEQVR42u3SQQkAAAwDsQor8y9rJvYZBKLguLQD5yIBxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJY/LSgjDi3dpmB4AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"itemActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAIAAACnG28HAAAAoElEQVR42u3SQQkAAAwDsToq829uJvYZBKLguLQD5yIBxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJY/LRBziyQuYSeagAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"itemImage" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA2CAIAAAC3LQuFAAAB9UlEQVR42u3ZiWrCQBAGYF9CzWnu05hDbX3/N+tfBqdrjEIptNL9YQo5hKQfuzM7m9V6vWU8iRX+zucLYzEIRCACEYhABCIQgQjEIBCBCEQgAv0s6nrveQGBHgZ0CHSpqtZ1fc8Lu24wr+MUr5qmudVAbXvQrbzt1j0e3/RWHKe4iB9YDeT7obndud/3ch1Sm42DKybZ/wfK8wr/dlFUcjoMx9l+cNN013nX4NT3dxZVMeWAkYwLeD0CQkrCaZ6XFgFlWaEQko9dN1gEOhxG82e2AKFUKUTbdn0/3n9yEaAkyWSgnU7vtgANw4TnOo4nqRcQWVYuAml6DsPYipV0GEZ9PxVFjedilqGW40DWPlcXxwTCLTkuy9oKIIyaNC2CIMJzISVAcZwpCu6aQFr4MQctGUExjPBQaRpmcwocOmRkiOmi0ZZmVXONLH9mQHXdmkCSfRBRlNoChMWxJJpxPM2AMExQp2RNOAuo2QIEAnRVZdnoGxgT6nMdKPl7FqJp436QTiIcTNN5EQgFzt4NMy1S6DOuDdp8QfTLWxyvBYSUhKK228W6Sr4H0p6eW643Zc7M3AT6CnOhiEiS/A9f5hWBZkkarTyBbsJs69G48bPP8iBC6kG/JoWfQPxwSCACEYhBIAIRiEAEIhCBCMQg0HeBGE/iA2Oi1tFMiSX7AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAABCAIAAAAkUWeUAAAAEUlEQVR42mPQ1zccRaOIzggAmuR1T+nadMkAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAIklEQVR42mP6//8/Az4sKir+X0lJ5b+ysioKBomB5AjpBwAxrjrJQvfEawAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAGUlEQVR42mP4//8/Ay0xw6gFoxaMWkB7CwB2As1P8WmmAwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAGUlEQVR42mP4//8/Ay0xw6gFoxaMWkB7CwB2As1P8WmmAwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAYUlEQVR42q2PSwqAMBBDe4mqrVL7sXh6vZoUDxAnxX0LungQEpJhFADVQusxC4dQXqhzT7dnfBcuY2Y4t1ao6TH7fGAYptPaBd5HhJAq1PSY/fFB4WCMG1LKFWp6kt2t/gOk+eeZy1KEHQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAYElEQVR42mP4//8/Az4sJibxSUlJ5b+ysioKBokB5b4Q0s9ASIG0tMxGWVl5DAtAYiA5ii2wsbE1ALr0A8hAkKtBGMQGiYHkKLYAiJlcXd0MQa4FGvoZhEFskBhIjpB+AF4F6qfhUR58AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAKElEQVR4XmP8//8/AyHw+PHj/z9+/GD4+vUrGH/79g1MBwQEMBLSCwC4sRX/S7kwJwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderThumbCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAASElEQVR42q3NoQ0AMAgFUfYXrIJH4/FIFmg6wS/1TUqaipOXRwDoVmbOiIC7w8ygqhCR2XmpCfAB4G/ArgAuYBQwCuDu1wZeW0osItX5QArCAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderThumbCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAWUlEQVR42rWNoQ1AIQwF2V8QHAJJKlAoSHVJ6qpI2IMwwPsrIPji3F3OAXB/ci221nytdRPRTin5p4MxRlBViAiYGaUUxBjDs8Gcc6+1YGYQEfTekXM+N+0HR/gfgjnWeYEAAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"tooltip"\x3e\x3csettings\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xacacac"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"0xffffff"/\x3e\x3csetting name\x3d"overcolor" value\x3d"0xffffff"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAACCAYAAABsfz2XAAAAEklEQVR42mOwtnV8RgpmIFUDAFr3JukT6L+UAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"arrow" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAADCAYAAACnI+4yAAAAEklEQVR42mP4//8/AymYgeYaABssa5WUTzsyAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAHUlEQVR42mMUFRU/wUACYHR1935GkgZrW0faagAAqHQGCWgiU9QAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGElEQVR42mOwtnV8RgpmoL0GUVHxE6RgAO7IRsl4Cw8cAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mMQFRU/YW3r+AwbZsAnCQBUPRWHq8l/fAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mOwtnV8hg2LioqfYMAnCQBwXRWHw2Rr1wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capTopLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR4XmMQFRVnBeIiIN4FxCeQMQOQU6ijq3/VycXjiau79zNkDJLcZWvv9MTGzumZta0jCgZJnkAXhPEBnhkmTDF7/FAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capTopRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR42mMQFRU/gYZ3A3ERELMyuLp7P0PGTi4eT3R09a8CJbMYrG0dnyFjGzunZ7b2Tk+AkrswJGEYZAUA8XwmRnLnEVMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottomLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAMklEQVR42mMQFRU/YW3r+AwbZgBK7rK0snuCS7JQXUP7qqW1/RNskqxAXATEu0FWIGMAFlYlnOJtim4AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottomRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAANUlEQVR42mOwtnV8hg2LioqfYMAmYWll9wQouQtD0tLa/om6hvZVoGQ2A0g7Gt4NxEVAzAoAZzolltlSH50AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"menuOption" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAdklEQVR42mP4//8/AzGYYdgpFBUVlwPiXUD8GUrLYVUoJiaxR1JS+r+srNx/EA3kH8Bl4md5ecX/iorK/xUUlP4D+T+xKgSask9GRu6/srLqfxAN5B/CqtDb21cdpBho5VcQ7enprYHL10xAzAXEPFCaaVhHIQBeKc15eWl8jgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"menuOptionOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAdklEQVR42mP4//8/AzGYYdgpFBUVlwPiXUD8GUrLYVUoJiaxR1JS+r+srNx/EA3kH8Bl4md5ecX/iorK/xUUlP4D+T+xKgSask9GRu6/srLqfxAN5B/CqtDb21cdpBho5VcQ7enprYHL10xAzAXEPFCaaVhHIQBeKc15eWl8jgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"menuOptionActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAqklEQVR42mP4//8/AzGYYSgohAIZIHYE4lAoDeJjKJR1c3PLffTo0aXfv39/B9EgPlBcDl2h0/379y+/fv36/9OnT/+DaKDiq0BxF3SFoc+ePQOZ9B+Gnz9//hsoHo6u0GX//v2Xr1279h+GDx48CDLRDV2hkq2tbe6uXbsunz9//geItre3B7lRGV0hMxCrAbEHEIdBaRCfGVvwgBRzADE3lGbGCJ4hENcAI1indUdh01cAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42n2NWwqAIBRE3YSmJT4KafW1tZAWMN2RPkSojwPDPO5VAFSP1lMRDqG+UJexN4524bJ2hvehQU2P2efQGHs6tyCEhBhzg5oes7+PlcWUVuS8Nah5QLK77z7Bcm/CZuJM1AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42mP4//8/AwyLiUl8UlVV/6+mpoGCQWJAuS/IahmQOdLSMhvl5RUxNILEQHI4NdrY2BoATf4AUgiyBYRBbJAYSA6nRiBmcnV1MwSZDlT8GYRBbJAYSA5ZLQArC3Oj7DuqswAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAXklEQVR42mP5//8/AwyIiUn85+bmZmBkZGRABiA1X79+ZXj16gVcgoUBDaBrwiWGoZFYMCg0MpKnkZFxCPlxVONw0MjIyDgaOCM7AdC7lBuNjtGiY1TjqMbRwooijQBUhw3jnmCdzgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAT0lEQVR42u3LIQ4AQQhDUe5/FjJ4NH48ggQu0rWbGbEH2Iqanz4BIO9VFTITe29EBNwdqorzJ2fo7guutb7hzFzQzAgJCQkJCQkJCQn/AR/HKvJmqR7XwAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgressCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAWUlEQVR42p2LoQoAIRAF/f8gNsNGMZhMK+YVtpkW/A/xA9714+COC1OGGQfA/eFRMrOvte6c8yYi/2kcYwRVhYig945SCmKM4XU0s73WwpwTIoLWGlJK595da8On65TYLg8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAASElEQVR42o3LIQ4AMQgFUe6v6EnwaDweyQ3aPcBf6poNyVaMm0cA6CwzZ0TA3WFmUFWIyPP9qIGjgeMX7gpywVVwFeTuaeFNL2bLq1AT4lm+AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAABQElEQVR42p2SsWqDUBSGTYgpEqlLqNCxdHMoGTp079Y1kFJohrR5mzyCm4PpA2Rw1MlZg7gk6eSWXcxgzy//BWkbLBU+uZzz/derHq2ua+0/tK+e0BcGwlC4IEPW+nR+hNAcCffCVFiQKWsjOr12SBeuhJnv++uiKHZVVZUAa9TQo6OrMHa5FJ6DINgcj8f6cDjUeZ43YI0aenAEixnNEB48z/P3+32dZdmvoAcHLjPNDrM4jnfnQgo4PDIy2lhYbrfbU1cwTdOTuO/MaPZfg0mSlOK+MdPcXsIw7DwqHLgqiMc+rlardVcQDlx1VLzorfDquu7mXAg9ceZ0LfU78OgJGrLrRxRFn/IhSoA1agxN6BpqAEzhWnCEJ0pLMmfNoWOqAVAjZ3K3G0p3xGHNpqN/n9cBj2Dx5W0yZs1oD/kXpOphz005RgUAAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3c/components\x3e\x3c/skin\x3e';
        this.xml =
            g.utils.parseXML(this.text);
        return this
    }
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils,
        c = g.events,
        e = c.state,
        b = a.css,
        d = a.isMobile(),
        f = document,
        u = ".jwpreview",
        l = !0,
        m = !1;
    h.display = function(r, g) {
        function z(b) {
            if (aa && (r.jwGetControls() || r.jwGetState() == e.PLAYING)) aa(b);
            else if ((!d || !r.jwGetControls()) && S.sendEvent(c.JWPLAYER_DISPLAY_CLICK), r.jwGetControls()) {
                var j = (new Date).getTime();
                Y && 500 > j - Y ? (r.jwSetFullscreen(), Y = void 0) : Y = (new Date).getTime();
                var k = a.bounds(p.parentNode.querySelector(".jwcontrolbar")),
                    f = a.bounds(p),
                    j = k.left - 10 - f.left,
                    h = k.left + 30 -
                    f.left,
                    g = f.bottom - 40,
                    l = f.bottom,
                    n = k.right - 30 - f.left,
                    k = k.right + 10 - f.left;
                if (d && !(b.x >= j && b.x <= h && b.y >= g && b.y <= l)) {
                    if (b.x >= n && b.x <= k && b.y >= g && b.y <= l) {
                        r.jwSetFullscreen();
                        return
                    }
                    S.sendEvent(c.JWPLAYER_DISPLAY_CLICK);
                    if (M) return
                }
                switch (r.jwGetState()) {
                    case e.PLAYING:
                    case e.BUFFERING:
                        r.jwPause();
                        break;
                    default:
                        r.jwPlay()
                }
            }
        }

        function j(a, b) {
            ba.showicons && (a || b ? (R.setRotation("buffer" == a ? parseInt(ba.bufferrotation, 10) : 0, parseInt(ba.bufferinterval, 10)), R.setIcon(a), R.setText(b)) : R.hide())
        }

        function q(a) {
            s !=
                a ? (s && x(u, m), (s = a) ? (a = new Image, a.addEventListener("load", t, m), a.src = s) : (b("#" + p.id + " " + u, {
                    "background-image": void 0
                }), x(u, m), A = K = 0)) : s && !M && x(u, l);
            w(r.jwGetState())
        }

        function C(a) {
            clearTimeout(qa);
            qa = setTimeout(function() {
                w(a.newstate)
            }, 100)
        }

        function w(a) {
            a = T ? T : r ? r.jwGetState() : e.IDLE;
            if (a != ca) switch (ca = a, R && R.setRotation(0), a) {
                case e.IDLE:
                    !H && !P && (s && !I && x(u, l), a = !0, r._model && !1 === r._model.config.displaytitle && (a = !1), j("play", F && a ? F.title : ""));
                    break;
                case e.BUFFERING:
                    H = m;
                    G.error && G.error.setText();
                    P = m;
                    j("buffer");
                    break;
                case e.PLAYING:
                    j();
                    break;
                case e.PAUSED:
                    j("play")
            }
        }

        function t() {
            A = this.width;
            K = this.height;
            w(r.jwGetState());
            v();
            s && b("#" + p.id + " " + u, {
                "background-image": "url(" + s + ")"
            })
        }

        function D(a) {
            H = l;
            j("error", a.message)
        }

        function v() {
            0 < p.clientWidth * p.clientHeight && a.stretch(r.jwGetStretching(), k, p.clientWidth, p.clientHeight, A, K)
        }

        function x(c, d) {
            a.exists(Q[c]) || (Q[c] = !1);
            Q[c] != d && (Q[c] = d, b("#" + p.id + " " + c, {
                opacity: d ? 1 : 0,
                visibility: d ? "visible" : "hidden"
            }))
        }
        var p, k, B, F, s, A, K, I = m,
            G = {},
            H = m,
            P = m,
            Q = {},
            M, y, R, T, ca, ba = a.extend({
                showicons: l,
                bufferrotation: 45,
                bufferinterval: 100,
                fontcolor: "#ccc",
                overcolor: "#fff",
                fontsize: 15,
                fontweight: ""
            }, r.skin.getComponentSettings("display"), g),
            S = new c.eventdispatcher,
            aa, Y;
        a.extend(this, S);
        this.clickHandler = z;
        var qa;
        this.forceState = function(a) {
            T = a;
            w(a);
            this.show()
        };
        this.releaseState = function(a) {
            T = null;
            w(a);
            this.show()
        };
        this.hidePreview = function(a) {
            I = a;
            x(u, !a);
            a && (M = !0)
        };
        this.setHiding = function() {
            M = !0
        };
        this.element = function() {
            return p
        };
        this.redraw = v;
        this.show = function(a) {
            if (R &&
                (a || (T ? T : r ? r.jwGetState() : e.IDLE) != e.PLAYING)) clearTimeout(y), y = void 0, p.style.display = "block", R.show(), M = !1
        };
        this.hide = function() {
            R && (R.hide(), M = !0)
        };
        this.setAlternateClickHandler = function(a) {
            aa = a
        };
        this.revertAlternateClickHandler = function() {
            aa = void 0
        };
        p = f.createElement("div");
        p.id = r.id + "_display";
        p.className = "jwdisplay";
        k = f.createElement("div");
        k.className = "jwpreview jw" + r.jwGetStretching();
        p.appendChild(k);
        r.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, C);
        r.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM,
            function() {
                H = m;
                G.error && G.error.setText();
                var a = (F = r.jwGetPlaylist()[r.jwGetPlaylistIndex()]) ? F.image : "";
                ca = void 0;
                q(a)
            });
        r.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, function() {
            P = l;
            j("replay");
            var a = r.jwGetPlaylist()[0];
            q(a.image)
        });
        r.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, D);
        r.jwAddEventListener(c.JWPLAYER_ERROR, D);
        d ? (B = new a.touch(p), B.addEventListener(a.touchEvents.TAP, z)) : p.addEventListener("click", z, m);
        B = {
            font: ba.fontweight + " " + ba.fontsize + "px/" + (parseInt(ba.fontsize, 10) + 3) + "px Arial, Helvetica, sans-serif",
            color: ba.fontcolor
        };
        R = new h.displayicon(p.id + "_button", r, B, {
            color: ba.overcolor
        });
        p.appendChild(R.element());
        C({
            newstate: e.IDLE
        })
    };
    b(".jwdisplay", {
        position: "absolute",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    });
    b(".jwdisplay .jwpreview", {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "no-repeat center",
        overflow: "hidden",
        opacity: 0
    });
    b(".jwdisplay, .jwdisplay *", {
        "-webkit-transition": "opacity .25s, background-image .25s, color .25s",
        "-moz-transition": "opacity .25s, background-image .25s, color .25s",
        "-o-transition": "opacity .25s, background-image .25s, color .25s"
    })
})(jwplayer);
(function(g) {
    var h = g.utils,
        a = h.css,
        c = document,
        e = "none",
        b = "100%";
    g.html5.displayicon = function(d, f, u, l) {
        function m(a, b, d, e) {
            var j = c.createElement("div");
            j.className = a;
            b && b.appendChild(j);
            w && r(j, a, "." + a, d, e);
            return j
        }

        function r(b, c, d, e, j) {
            var k = n(c);
            "replayIcon" == c && !k.src && (k = n("playIcon"));
            k.src ? (e = h.extend({}, e), 0 < c.indexOf("Icon") && (s = k.width | 0), e.width = k.width, e["background-image"] = "url(" + k.src + ")", e["background-size"] = k.width + "px " + k.height + "px", j = h.extend({}, j), k.overSrc && (j["background-image"] =
                "url(" + k.overSrc + ")"), h.isMobile() || a("#" + f.id + " .jwdisplay:hover " + d, j), a.style(w, {
                display: "table"
            })) : a.style(w, {
                display: "none"
            });
            e && a.style(b, e);
            F = k
        }

        function n(a) {
            var b = C.getSkinElement("display", a);
            a = C.getSkinElement("display", a + "Over");
            return b ? (b.overSrc = a && a.src ? a.src : "", b) : {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function z() {
            var b = x || 0 === s;
            a.style(p, {
                display: p.innerHTML && b ? "" : e
            });
            K = b ? 30 : 0;
            j()
        }

        function j() {
            clearTimeout(A);
            0 < K-- && (A = setTimeout(j, 33));
            var c = "px " + b,
                d = Math.ceil(Math.max(F.width, h.bounds(w).width -
                    v.width - D.width)),
                c = {
                    "background-size": [D.width + c, d + c, v.width + c].join(", ")
                };
            w.parentNode && (c.left = 1 == w.parentNode.clientWidth % 2 ? "0.5px" : "");
            a.style(w, c)
        }

        function q() {
            H = (H + G) % 360;
            h.rotate(k, H)
        }
        var C = f.skin,
            w, t, D, v, x, p, k, B = {},
            F, s = 0,
            A = -1,
            K = 0;
        this.element = function() {
            return w
        };
        this.setText = function(a) {
            var b = p.style;
            p.innerHTML = a ? a.replace(":", ":\x3cbr\x3e") : "";
            b.height = "0";
            b.display = "block";
            if (a)
                for (; 2 < Math.floor(p.scrollHeight / c.defaultView.getComputedStyle(p, null).lineHeight.replace("px", ""));) p.innerHTML =
                    p.innerHTML.replace(/(.*) .*$/, "$1...");
            b.height = "";
            b.display = "";
            z()
        };
        this.setIcon = function(a) {
            var b = B[a];
            b || (b = m("jwicon"), b.id = w.id + "_" + a);
            r(b, a + "Icon", "#" + b.id);
            w.contains(k) ? w.replaceChild(b, k) : w.appendChild(b);
            k = b
        };
        var I, G = 0,
            H;
        this.setRotation = function(a, b) {
            clearInterval(I);
            H = 0;
            G = a | 0;
            0 === G ? q() : I = setInterval(q, b)
        };
        var P = this.hide = function() {
            w.style.opacity = 0
        };
        this.show = function() {
            w.style.opacity = 1
        };
        w = m("jwdisplayIcon");
        w.id = d;
        t = n("background");
        D = n("capLeft");
        v = n("capRight");
        x = 0 < D.width * v.width;
        var Q = {
            "background-image": "url(" + D.src + "), url(" + t.src + "), url(" + v.src + ")",
            "background-position": "left,center,right",
            "background-repeat": "no-repeat",
            padding: "0 " + v.width + "px 0 " + D.width + "px",
            height: t.height,
            "margin-top": t.height / -2
        };
        a("#" + d + " ", Q);
        h.isMobile() || (t.overSrc && (Q["background-image"] = "url(" + D.overSrc + "), url(" + t.overSrc + "), url(" + v.overSrc + ")"), a("#" + f.id + " .jwdisplay:hover " + ("#" + d + " "), Q));
        p = m("jwtext", w, u, l);
        k = m("jwicon", w);
        f.jwAddEventListener(g.events.JWPLAYER_RESIZE, j);
        P();
        z()
    };
    a(".jwplayer .jwdisplayIcon", {
        display: "table",
        cursor: "pointer",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%"
    });
    a(".jwplayer .jwdisplayIcon div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": "center"
    });
    a(".jwplayer .jwdisplayIcon div", {
        "vertical-align": "middle"
    }, !0);
    a(".jwplayer .jwdisplayIcon .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": "center",
        "-webkit-user-select": e,
        "-moz-user-select": e,
        "-ms-user-select": e,
        "user-select": e
    })
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils,
        c = a.css,
        e = a.bounds,
        b = ".jwdockbuttons",
        d = document,
        f = "none",
        u = "block";
    h.dock = function(g, m) {
        function r(a) {
            return !a || !a.src ? {} : {
                background: "url(" + a.src + ") center",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function n(b, d) {
            var e = q(b);
            c(z("." + b), a.extend(r(e), {
                width: e.width
            }));
            return j("div", b, d)
        }

        function z(a) {
            return "#" + t + " " + (a ? a : "")
        }

        function j(a, b, c) {
            a = d.createElement(a);
            b && (a.className = b);
            c && c.appendChild(a);
            return a
        }

        function q(a) {
            return (a = D.getSkinElement("dock",
                a)) ? a : {
                width: 0,
                height: 0,
                src: ""
            }
        }

        function C() {
            c(b + " .capLeft, " + b + " .capRight", {
                display: v ? u : f
            })
        }
        var w = a.extend({}, {
                iconalpha: 0.75,
                iconalphaactive: 0.5,
                iconalphaover: 1,
                margin: 8
            }, m),
            t = g.id + "_dock",
            D = g.skin,
            v = 0,
            x = {},
            p = {},
            k, B, F, s = this;
        s.redraw = function() {
            e(k)
        };
        s.element = function() {
            return k
        };
        s.offset = function(a) {
            c(z(), {
                "margin-left": a
            })
        };
        s.hide = function() {
            s.visible && (s.visible = !1, k.style.opacity = 0, clearTimeout(F), F = setTimeout(function() {
                k.style.display = f
            }, 250))
        };
        s.showTemp = function() {
            s.visible || (k.style.opacity =
                0, k.style.display = u)
        };
        s.hideTemp = function() {
            s.visible || (k.style.display = f)
        };
        s.show = function() {
            !s.visible && v && (s.visible = !0, k.style.display = u, clearTimeout(F), F = setTimeout(function() {
                k.style.opacity = 1
            }, 0))
        };
        s.addButton = function(b, d, f, g) {
            if (!x[g]) {
                var r = j("div", "divider", B),
                    l = j("button", null, B),
                    n = j("div", null, l);
                n.id = t + "_" + g;
                n.innerHTML = "\x26nbsp;";
                c("#" + n.id, {
                    "background-image": b
                });
                "string" == typeof f && (f = new Function(f));
                a.isMobile() ? (new a.touch(l)).addEventListener(a.touchEvents.TAP, function(a) {
                        f(a)
                    }) :
                    l.addEventListener("click", function(a) {
                        f(a);
                        a.preventDefault()
                    });
                x[g] = {
                    element: l,
                    label: d,
                    divider: r,
                    icon: n
                };
                if (d) {
                    var q = new h.overlay(n.id + "_tooltip", D, !0);
                    b = j("div");
                    b.id = n.id + "_label";
                    b.innerHTML = d;
                    c("#" + b.id, {
                        padding: 3
                    });
                    q.setContents(b);
                    if (!a.isMobile()) {
                        var m;
                        l.addEventListener("mouseover", function() {
                            clearTimeout(m);
                            var b = p[g],
                                d, j;
                            d = e(x[g].icon);
                            b.offsetX(0);
                            j = e(k);
                            c("#" + b.element().id, {
                                left: d.left - j.left + d.width / 2
                            });
                            d = e(b.element());
                            j.left > d.left && b.offsetX(j.left - d.left + 8);
                            q.show();
                            a.foreach(p,
                                function(a, b) {
                                    a != g && b.hide()
                                })
                        }, !1);
                        l.addEventListener("mouseout", function() {
                            m = setTimeout(q.hide, 100)
                        }, !1);
                        k.appendChild(q.element());
                        p[g] = q
                    }
                }
                v++;
                C()
            }
        };
        s.removeButton = function(a) {
            if (x[a]) {
                B.removeChild(x[a].element);
                B.removeChild(x[a].divider);
                var b = document.getElementById("" + t + "_" + a + "_tooltip");
                b && k.removeChild(b);
                delete x[a];
                v--;
                C()
            }
        };
        s.numButtons = function() {
            return v
        };
        s.visible = !1;
        k = j("div", "jwdock");
        B = j("div", "jwdockbuttons");
        k.appendChild(B);
        k.id = t;
        var A = q("button"),
            K = q("buttonOver"),
            I = q("buttonActive");
        A && (c(z(), {
            height: A.height,
            padding: w.margin
        }), c(b, {
            height: A.height
        }), c(z("button"), a.extend(r(A), {
            width: A.width,
            cursor: "pointer",
            border: f
        })), c(z("button:hover"), r(K)), c(z("button:active"), r(I)), c(z("button\x3ediv"), {
            opacity: w.iconalpha
        }), c(z("button:hover\x3ediv"), {
            opacity: w.iconalphaover
        }), c(z("button:active\x3ediv"), {
            opacity: w.iconalphaactive
        }), c(z(".jwoverlay"), {
            top: w.margin + A.height
        }), n("capLeft", B), n("capRight", B), n("divider"));
        setTimeout(function() {
            e(k)
        })
    };
    c(".jwdock", {
        opacity: 0,
        display: f
    });
    c(".jwdock \x3e *", {
        height: "100%",
        "float": "left"
    });
    c(".jwdock \x3e .jwoverlay", {
        height: "auto",
        "float": f,
        "z-index": 99
    });
    c(b + " button", {
        position: "relative"
    });
    c(b + " \x3e *", {
        height: "100%",
        "float": "left"
    });
    c(b + " .divider", {
        display: f
    });
    c(b + " button ~ .divider", {
        display: u
    });
    c(b + " .capLeft, " + b + " .capRight", {
        display: f
    });
    c(b + " .capRight", {
        "float": "right"
    });
    c(b + " button \x3e div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    a.transitionStyle(".jwdock",
        "background .25s, opacity .25s");
    a.transitionStyle(".jwdock .jwoverlay", "opacity .25s");
    a.transitionStyle(b + " button div", "opacity .25s")
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils,
        c = g.events,
        e = c.state,
        b = g.playlist;
    h.instream = function(d, f, g, l) {
        function m(a) {
            C(a.type, a);
            M && d.jwInstreamDestroy(!1, y)
        }

        function r(a) {
            C(a.type, a);
            j(null)
        }

        function n(a) {
            C(a.type, a)
        }

        function z() {
            H && H.releaseState(y.jwGetState());
            I.play()
        }

        function j() {
            if (v && x + 1 < v.length) {
                x++;
                var e = v[x];
                D = new b.item(e);
                M.setPlaylist([e]);
                var j;
                p && (j = p[x]);
                k = a.extend(t, j);
                I.load(M.playlist[0]);
                B.reset(k.skipoffset || -1);
                T = setTimeout(function() {
                        C(c.JWPLAYER_PLAYLIST_ITEM, {
                            index: x
                        }, !0)
                    },
                    0)
            } else T = setTimeout(function() {
                C(c.JWPLAYER_PLAYLIST_COMPLETE, {}, !0);
                d.jwInstreamDestroy(!0, y)
            }, 0)
        }

        function q(a) {
            a.width && a.height && (H && H.releaseState(y.jwGetState()), g.resizeMedia())
        }

        function C(a, b) {
            b = b || {};
            t.tag && !b.tag && (b.tag = t.tag);
            P.sendEvent(a, b)
        }

        function w() {
            G && G.redraw();
            H && H.redraw()
        }
        var t = {
                controlbarseekable: "never",
                controlbarpausable: !0,
                controlbarstoppable: !0,
                loadingmessage: "Loading ad",
                playlistclickable: !0,
                skipoffset: null,
                tag: null
            },
            D, v, x = 0,
            p, k = {
                controlbarseekable: "never",
                controlbarpausable: !1,
                controlbarstoppable: !1
            },
            B, F, s, A, K, I, G, H, P = new c.eventdispatcher,
            Q, M, y = this,
            R = !0,
            T = -1;
        d.jwAddEventListener(c.JWPLAYER_RESIZE, w);
        d.jwAddEventListener(c.JWPLAYER_FULLSCREEN, function(b) {
            w();
            !b.fullscreen && a.isIPad() && (M.state === e.PAUSED ? H.show(!0) : M.state === e.PLAYING && H.hide())
        });
        y.init = function() {
            F = l.detachMedia();
            I = new h.video(F);
            I.addGlobalListener(n);
            I.addEventListener(c.JWPLAYER_MEDIA_META, q);
            I.addEventListener(c.JWPLAYER_MEDIA_COMPLETE, j);
            I.addEventListener(c.JWPLAYER_MEDIA_BUFFER_FULL, z);
            I.addEventListener(c.JWPLAYER_MEDIA_ERROR,
                m);
            I.addEventListener(c.JWPLAYER_MEDIA_TIME, function(a) {
                B && B.updateSkipTime(a.position, a.duration)
            });
            I.attachMedia();
            I.mute(f.mute);
            I.volume(f.volume);
            M = new h.model({}, I);
            M.setVolume(f.volume);
            M.setMute(f.mute);
            K = f.playlist[f.item];
            s = F.currentTime;
            l.checkBeforePlay() || 0 === s ? (A = e.PLAYING, R = !1) : A = d.jwGetState() === e.IDLE || f.getVideo().checkComplete() ? e.IDLE : e.PLAYING;
            A == e.PLAYING && F.pause();
            H = new h.display(y);
            H.forceState(e.BUFFERING);
            Q = document.createElement("div");
            Q.id = y.id + "_instream_container";
            Q.appendChild(H.element());
            G = new h.controlbar(y);
            G.instreamMode(!0);
            Q.appendChild(G.element());
            d.jwGetControls() ? (G.show(), H.show()) : (G.hide(), H.hide());
            g.setupInstream(Q, G, H, M);
            w();
            y.jwInstreamSetText(t.loadingmessage)
        };
        y.load = function(j, f) {
            if (a.isAndroid(2.3)) m({
                type: c.JWPLAYER_ERROR,
                message: "Error loading instream: Cannot play instream on Android 2.3"
            });
            else {
                C(c.JWPLAYER_PLAYLIST_ITEM, {
                    index: x
                }, !0);
                var l = a.bounds(document.getElementById(d.id)),
                    n = g.getSafeRegion();
                if ("object" == a.typeOf(j)) D = new b.item(j), M.setPlaylist([j]),
                    k = a.extend(t, f), B = new h.adskipbutton(d, l.height - (n.y + n.height) + 10, k.skipMessage, k.skipText), B.addEventListener(c.JWPLAYER_AD_SKIPPED, r), B.reset(k.skipoffset || -1);
                else if ("array" == a.typeOf(j)) {
                    var q;
                    f && (p = f, q = f[x]);
                    k = a.extend(t, q);
                    B = new h.adskipbutton(d, l.height - (n.y + n.height) + 10, k.skipMessage, k.skipText);
                    B.addEventListener(c.JWPLAYER_AD_SKIPPED, r);
                    B.reset(k.skipoffset || -1);
                    v = j;
                    j = v[x];
                    D = new b.item(j);
                    M.setPlaylist([j])
                }
                d.jwGetControls() ? B.show() : B.hide();
                l = B.element();
                Q.appendChild(l);
                M.addEventListener(c.JWPLAYER_ERROR,
                    m);
                H.setAlternateClickHandler(function(a) {
                    d.jwGetControls() ? (M.state == e.PAUSED ? y.jwInstreamPlay() : y.jwInstreamPause(), a.hasControls = !0) : a.hasControls = !1;
                    C(c.JWPLAYER_INSTREAM_CLICK, a)
                });
                a.isIE() && F.parentElement.addEventListener("click", H.clickHandler);
                g.addEventListener(c.JWPLAYER_AD_SKIPPED, r);
                I.load(M.playlist[0])
            }
        };
        y.jwInstreamDestroy = function(a) {
            if (M) {
                clearTimeout(T);
                T = -1;
                I.detachMedia();
                l.attachMedia();
                A != e.IDLE ? f.getVideo().load(K, !1) : f.getVideo().stop();
                P.resetEventListeners();
                I.resetEventListeners();
                M.resetEventListeners();
                if (G) try {
                    G.element().parentNode.removeChild(G.element())
                } catch (b) {}
                H && (F && F.parentElement && F.parentElement.removeEventListener("click", H.clickHandler), H.revertAlternateClickHandler());
                C(c.JWPLAYER_INSTREAM_DESTROYED, {
                    reason: a ? "complete" : "destroyed"
                }, !0);
                A == e.PLAYING && (F.play(), f.playlist[f.item] == K && R && f.getVideo().seek(s));
                g.destroyInstream(I.audioMode());
                M = null
            }
        };
        y.jwInstreamAddEventListener = function(a, b) {
            P.addEventListener(a, b)
        };
        y.jwInstreamRemoveEventListener = function(a,
            b) {
            P.removeEventListener(a, b)
        };
        y.jwInstreamPlay = function() {
            I.play(!0);
            f.state = e.PLAYING;
            H.show()
        };
        y.jwInstreamPause = function() {
            I.pause(!0);
            f.state = e.PAUSED;
            d.jwGetControls() && H.show()
        };
        y.jwInstreamSeek = function(a) {
            I.seek(a)
        };
        y.jwInstreamSetText = function(a) {
            G.setText(a)
        };
        y.jwInstreamState = function() {
            return f.state
        };
        y.setControls = function(a) {
            a ? B.show() : B.hide()
        };
        y.jwPlay = function() {
            "true" == k.controlbarpausable.toString().toLowerCase() && y.jwInstreamPlay()
        };
        y.jwPause = function() {
            "true" == k.controlbarpausable.toString().toLowerCase() &&
                y.jwInstreamPause()
        };
        y.jwStop = function() {
            "true" == k.controlbarstoppable.toString().toLowerCase() && (d.jwInstreamDestroy(!1, y), d.jwStop())
        };
        y.jwSeek = function(a) {
            switch (k.controlbarseekable.toLowerCase()) {
                case "always":
                    y.jwInstreamSeek(a);
                    break;
                case "backwards":
                    M.position > a && y.jwInstreamSeek(a)
            }
        };
        y.jwSeekDrag = function(a) {
            M.seekDrag(a)
        };
        y.jwGetPosition = function() {};
        y.jwGetDuration = function() {};
        y.jwGetWidth = d.jwGetWidth;
        y.jwGetHeight = d.jwGetHeight;
        y.jwGetFullscreen = d.jwGetFullscreen;
        y.jwSetFullscreen = d.jwSetFullscreen;
        y.jwGetVolume = function() {
            return f.volume
        };
        y.jwSetVolume = function(a) {
            M.setVolume(a);
            d.jwSetVolume(a)
        };
        y.jwGetMute = function() {
            return f.mute
        };
        y.jwSetMute = function(a) {
            M.setMute(a);
            d.jwSetMute(a)
        };
        y.jwGetState = function() {
            return !M ? e.IDLE : M.state
        };
        y.jwGetPlaylist = function() {
            return [D]
        };
        y.jwGetPlaylistIndex = function() {
            return 0
        };
        y.jwGetStretching = function() {
            return f.config.stretching
        };
        y.jwAddEventListener = function(a, b) {
            P.addEventListener(a, b)
        };
        y.jwRemoveEventListener = function(a, b) {
            P.removeEventListener(a, b)
        };
        y.jwSetCurrentQuality = function() {};
        y.jwGetQualityLevels = function() {
            return []
        };
        y.jwGetControls = function() {
            return d.jwGetControls()
        };
        y.skin = d.skin;
        y.id = d.id + "_instream";
        return y
    }
})(window.jwplayer);
(function(g) {
    var h = g.utils,
        a = h.css,
        c = g.events.state,
        e = g.html5.logo = function(b, d) {
            function f(a) {
                h.exists(a) && a.stopPropagation && a.stopPropagation();
                if (!z || !m.link) u.jwGetState() == c.IDLE || u.jwGetState() == c.PAUSED ? u.jwPlay() : u.jwPause();
                z && m.link && (u.jwPause(), u.jwSetFullscreen(!1), window.open(m.link, m.linktarget))
            }
            var u = b,
                l = u.id + "_logo",
                m, r, n = e.defaults,
                z = !1;
            this.resize = function() {};
            this.element = function() {
                return r
            };
            this.offset = function(b) {
                a("#" + l + " ", {
                    "margin-bottom": b
                })
            };
            this.position = function() {
                return m.position
            };
            this.margin = function() {
                return parseInt(m.margin)
            };
            this.hide = function(a) {
                if (m.hide || a) z = !1, r.style.visibility = "hidden", r.style.opacity = 0
            };
            this.show = function() {
                z = !0;
                r.style.visibility = "visible";
                r.style.opacity = 1
            };
            var j = "o";
            u.edition && (j = u.edition(), j = "pro" == j ? "p" : "premium" == j ? "r" : "ads" == j ? "a" : "free" == j ? "f" : "o");
            if ("o" == j || "f" == j) n.link = "http://www.longtailvideo.com/jwpabout/?a\x3dl\x26v\x3d" + g.version + "\x26m\x3dh\x26e\x3d" + j;
            m = h.extend({}, n, d);
            m.hide = "true" == m.hide.toString();
            r = document.createElement("img");
            r.className = "jwlogo";
            r.id = l;
            if (m.file) {
                var n = /(\w+)-(\w+)/.exec(m.position),
                    j = {},
                    q = m.margin;
                3 == n.length ? (j[n[1]] = q, j[n[2]] = q) : j.top = j.right = q;
                a("#" + l + " ", j);
                r.src = (m.prefix ? m.prefix : "") + m.file;
                h.isMobile() ? (new h.touch(r)).addEventListener(h.touchEvents.TAP, f) : r.onclick = f
            } else r.style.display = "none";
            return this
        };
    e.defaults = {
        prefix: h.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: !1,
        position: "top-right"
    };
    a(".jwlogo", {
        cursor: "pointer",
        position: "absolute",
        "z-index": 100,
        opacity: 0
    });
    h.transitionStyle(".jwlogo",
        "visibility .25s, opacity .25s")
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils,
        c = a.css;
    h.menu = function(e, b, d, f) {
        function g(a) {
            return !a || !a.src ? {} : {
                background: "url(" + a.src + ") no-repeat left",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function l(a, b) {
            return function() {
                C(a);
                n && n(b)
            }
        }

        function m(a, b) {
            var c = document.createElement("div");
            a && (c.className = a);
            b && b.appendChild(c);
            return c
        }

        function r(a) {
            return (a = d.getSkinElement("tooltip", a)) ? a : {
                width: 0,
                height: 0,
                src: void 0
            }
        }
        var n = f,
            z = new h.overlay(b + "_overlay", d);
        f = a.extend({
            fontcase: void 0,
            fontcolor: "#cccccc",
            fontsize: 11,
            fontweight: void 0,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        }, d.getComponentSettings("tooltip"));
        var j, q = [];
        this.element = function() {
            return z.element()
        };
        this.addOption = function(c, d) {
            var e = m("jwoption", j);
            e.id = b + "_option_" + d;
            e.innerHTML = c;
            a.isMobile() ? (new a.touch(e)).addEventListener(a.touchEvents.TAP, l(q.length, d)) : e.addEventListener("click", l(q.length, d));
            q.push(e)
        };
        this.clearOptions = function() {
            for (; 0 < q.length;) j.removeChild(q.pop())
        };
        var C = this.setActive = function(a) {
            for (var b = 0; b < q.length; b++) {
                var c =
                    q[b];
                c.className = c.className.replace(" active", "");
                b == a && (c.className += " active")
            }
        };
        this.show = z.show;
        this.hide = z.hide;
        this.offsetX = z.offsetX;
        this.positionX = z.positionX;
        this.constrainX = z.constrainX;
        j = m("jwmenu");
        j.id = b;
        var w = r("menuTop" + e);
        e = r("menuOption");
        var t = r("menuOptionOver"),
            D = r("menuOptionActive");
        if (w && w.image) {
            var v = new Image;
            v.src = w.src;
            v.width = w.width;
            v.height = w.height;
            j.appendChild(v)
        }
        e && (w = "#" + b + " .jwoption", c(w, a.extend(g(e), {
            height: e.height,
            color: f.fontcolor,
            "padding-left": e.width,
            font: f.fontweight + " " + f.fontsize + "px Arial,Helvetica,sans-serif",
            "line-height": e.height,
            "text-transform": "upper" == f.fontcase ? "uppercase" : void 0
        })), c(w + ":hover", a.extend(g(t), {
            color: f.overcolor
        })), c(w + ".active", a.extend(g(D), {
            color: f.activecolor
        })));
        z.setContents(j)
    };
    c("." + "jwmenu jwoption".replace(/ /g, " ."), {
        cursor: "pointer",
        position: "relative"
    })
})(jwplayer);
(function(g) {
    var h = jwplayer.utils,
        a = jwplayer.events;
    g.model = function(c, e) {
        function b(a) {
            var b = r[a.type] ? r[a.type].split(",") : [],
                c, e;
            if (0 < b.length) {
                for (c = 0; c < b.length; c++) {
                    var f = b[c].split("-\x3e"),
                        h = f[0],
                        f = f[1] ? f[1] : h;
                    d[f] != a[h] && (d[f] = a[h], e = !0)
                }
                e && d.sendEvent(a.type, a)
            } else d.sendEvent(a.type, a)
        }
        var d = this,
            f, u = h.getCookies(),
            l = {
                controlbar: {},
                display: {}
            },
            m = {
                autostart: !1,
                controls: !0,
                debug: void 0,
                fullscreen: !1,
                height: 320,
                mobilecontrols: !1,
                mute: !1,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                playlistlayout: "extended",
                repeat: !1,
                skin: void 0,
                stretching: h.stretching.UNIFORM,
                width: 480,
                volume: 90
            },
            r = {};
        r[a.JWPLAYER_MEDIA_MUTE] = "mute";
        r[a.JWPLAYER_MEDIA_VOLUME] = "volume";
        r[a.JWPLAYER_PLAYER_STATE] = "newstate-\x3estate";
        r[a.JWPLAYER_MEDIA_BUFFER] = "bufferPercent-\x3ebuffer";
        r[a.JWPLAYER_MEDIA_TIME] = "position,duration";
        d.setVideo = function(a) {
            f && f.removeGlobalListener(b);
            f = a;
            f.getTag();
            f.volume(d.volume);
            f.mute(d.mute);
            f.addGlobalListener(b)
        };
        d.getVideo = function() {
            return f
        };
        d.seekDrag = function(a) {
            f.seekDrag(a)
        };
        d.setFullscreen = function(b) {
            b != d.fullscreen && (d.fullscreen = b, d.sendEvent(a.JWPLAYER_FULLSCREEN, {
                fullscreen: b
            }))
        };
        d.setPlaylist = function(b) {
            d.playlist = h.filterPlaylist(b);
            0 == d.playlist.length ? d.sendEvent(a.JWPLAYER_ERROR, {
                message: "Error loading playlist: No playable sources found"
            }) : (d.sendEvent(a.JWPLAYER_PLAYLIST_LOADED, {
                playlist: jwplayer(d.id).getPlaylist()
            }), d.item = -1, d.setItem(0))
        };
        d.setItem = function(b) {
            var c = !1;
            b == d.playlist.length || -1 > b ? (b = 0, c = !0) : b = -1 == b || b > d.playlist.length ? d.playlist.length -
                1 : b;
            if (c || b != d.item) d.item = b, d.sendEvent(a.JWPLAYER_PLAYLIST_ITEM, {
                index: d.item
            })
        };
        d.setVolume = function(c) {
            d.mute && 0 < c && d.setMute(!1);
            c = Math.round(c);
            d.mute || h.saveCookie("volume", c);
            b({
                type: a.JWPLAYER_MEDIA_VOLUME,
                volume: c
            });
            f.volume(c)
        };
        d.setMute = function(c) {
            h.exists(c) || (c = !d.mute);
            h.saveCookie("mute", c);
            b({
                type: a.JWPLAYER_MEDIA_MUTE,
                mute: c
            });
            f.mute(c)
        };
        d.componentConfig = function(a) {
            return l[a]
        };
        h.extend(d, new a.eventdispatcher);
        var n = d,
            z = h.extend({}, m, u, c);
        h.foreach(z, function(a, b) {
            z[a] = h.serialize(b)
        });
        n.config = z;
        h.extend(d, {
            id: c.id,
            state: a.state.IDLE,
            duration: -1,
            position: 0,
            buffer: 0
        }, d.config);
        d.playlist = [];
        d.setItem(0);
        d.setVideo(e ? e : new g.video)
    }
})(jwplayer.html5);
(function(g) {
    var h = g.utils,
        a = h.css,
        c = h.transitionStyle,
        e = "top",
        b = "bottom",
        d = "right",
        f = "left",
        u = document,
        l = {
            fontcase: void 0,
            fontcolor: "#ffffff",
            fontsize: 12,
            fontweight: void 0,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        };
    g.html5.overlay = function(c, g, n) {
        function z(a) {
            return "#" + D + (a ? " ." + a : "")
        }

        function j(a, b) {
            var c = u.createElement("div");
            a && (c.className = a);
            b && b.appendChild(c);
            return c
        }

        function q(b, c) {
            var d;
            d = (d = v.getSkinElement("tooltip", b)) ? d : {
                width: 0,
                height: 0,
                src: "",
                image: void 0,
                ready: !1
            };
            var e = j(c, p);
            a.style(e, C(d));
            return [e, d]
        }

        function C(a) {
            return {
                background: "url(" + a.src + ") center",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function w(c, k) {
            k || (k = "");
            var j = q("cap" + c + k, "jwborder jw" + c + (k ? k : "")),
                g = j[0],
                j = j[1],
                l = h.extend(C(j), {
                    width: c == f || k == f || c == d || k == d ? j.width : void 0,
                    height: c == e || k == e || c == b || k == b ? j.height : void 0
                });
            l[c] = c == b && !x || c == e && x ? B.height : 0;
            k && (l[k] = 0);
            a.style(g, l);
            g = {};
            l = {};
            j = {
                left: j.width,
                right: j.width,
                top: (x ? B.height : 0) + j.height,
                bottom: (x ? 0 : B.height) + j.height
            };
            k && (g[k] = j[k], g[c] =
                0, l[c] = j[c], l[k] = 0, a(z("jw" + c), g), a(z("jw" + k), l), s[c] = j[c], s[k] = j[k])
        }
        var t = this,
            D = c,
            v = g,
            x = n,
            p, k, B, F;
        c = h.extend({}, l, v.getComponentSettings("tooltip"));
        var s = {};
        t.element = function() {
            return p
        };
        t.setContents = function(a) {
            h.empty(k);
            k.appendChild(a)
        };
        t.positionX = function(b) {
            a.style(p, {
                left: Math.round(b)
            })
        };
        t.constrainX = function(b, c) {
            if (t.showing && 0 !== b.width && t.offsetX(0)) {
                c && a.unblock();
                var d = h.bounds(p);
                0 !== d.width && (d.right > b.right ? t.offsetX(b.right - d.right) : d.left < b.left && t.offsetX(b.left - d.left))
            }
        };
        t.offsetX = function(b) {
            b = Math.round(b);
            var c = p.clientWidth;
            0 !== c && (a.style(p, {
                "margin-left": Math.round(-c / 2) + b
            }), a.style(F, {
                "margin-left": Math.round(-B.width / 2) - b
            }));
            return c
        };
        t.borderWidth = function() {
            return s.left
        };
        t.show = function() {
            t.showing = !0;
            a.style(p, {
                opacity: 1,
                visibility: "visible"
            })
        };
        t.hide = function() {
            t.showing = !1;
            a.style(p, {
                opacity: 0,
                visibility: "hidden"
            })
        };
        p = j(".jwoverlay".replace(".", ""));
        p.id = D;
        g = q("arrow", "jwarrow");
        F = g[0];
        B = g[1];
        a.style(F, {
            position: "absolute",
            bottom: x ? void 0 : 0,
            top: x ? 0 : void 0,
            width: B.width,
            height: B.height,
            left: "50%"
        });
        w(e, f);
        w(b, f);
        w(e, d);
        w(b, d);
        w(f);
        w(d);
        w(e);
        w(b);
        g = q("background", "jwback");
        a.style(g[0], {
            left: s.left,
            right: s.right,
            top: s.top,
            bottom: s.bottom
        });
        k = j("jwcontents", p);
        a(z("jwcontents") + " *", {
            color: c.fontcolor,
            font: c.fontweight + " " + c.fontsize + "px Arial,Helvetica,sans-serif",
            "text-transform": "upper" == c.fontcase ? "uppercase" : void 0
        });
        x && h.transform(z("jwarrow"), "rotate(180deg)");
        a.style(p, {
            padding: s.top + 1 + "px " + s.right + "px " + (s.bottom + 1) + "px " + s.left + "px"
        });
        t.showing = !1
    };
    a(".jwoverlay", {
        position: "absolute",
        visibility: "hidden",
        opacity: 0
    });
    a(".jwoverlay .jwcontents", {
        position: "relative",
        "z-index": 1
    });
    a(".jwoverlay .jwborder", {
        position: "absolute",
        "background-size": "100% 100%"
    }, !0);
    a(".jwoverlay .jwback", {
        position: "absolute",
        "background-size": "100% 100%"
    });
    c(".jwoverlay", "opacity .25s, visibility .25s")
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils;
    h.player = function(c) {
        function e(b) {
            var c = {
                description: b.description,
                file: b.file,
                image: b.image,
                mediaid: b.mediaid,
                title: b.title
            };
            a.foreach(b, function(a, b) {
                c[a] = b
            });
            c.sources = [];
            c.tracks = [];
            0 < b.sources.length && a.foreach(b.sources, function(a, b) {
                c.sources.push({
                    file: b.file,
                    type: b.type ? b.type : void 0,
                    label: b.label,
                    "default": b["default"] ? !0 : !1
                })
            });
            0 < b.tracks.length && a.foreach(b.tracks, function(a, b) {
                c.tracks.push({
                    file: b.file,
                    kind: b.kind ? b.kind : void 0,
                    label: b.label,
                    "default": b["default"] ?
                        !0 : !1
                })
            });
            !b.file && 0 < b.sources.length && (c.file = b.sources[0].file);
            return c
        }

        function b(a) {
            return function() {
                return f[a]
            }
        }
        var d = this,
            f, u, l, m;
        f = new h.model(c);
        d.id = f.id;
        a.css.block(d.id);
        u = new h.view(d, f);
        l = new h.controller(f, u);
        d._model = f;
        d.jwPlay = l.play;
        d.jwPause = l.pause;
        d.jwStop = l.stop;
        d.jwSeek = l.seek;
        d.jwSetVolume = l.setVolume;
        d.jwSetMute = l.setMute;
        d.jwLoad = function(a) {
            d.jwInstreamDestroy();
            l.load(a)
        };
        d.jwPlaylistNext = l.next;
        d.jwPlaylistPrev = l.prev;
        d.jwPlaylistItem = l.item;
        d.jwSetFullscreen = l.setFullscreen;
        d.jwResize = u.resize;
        d.jwSeekDrag = f.seekDrag;
        d.jwGetQualityLevels = l.getQualityLevels;
        d.jwGetCurrentQuality = l.getCurrentQuality;
        d.jwSetCurrentQuality = l.setCurrentQuality;
        d.jwGetCaptionsList = l.getCaptionsList;
        d.jwGetCurrentCaptions = l.getCurrentCaptions;
        d.jwSetCurrentCaptions = l.setCurrentCaptions;
        d.jwGetSafeRegion = u.getSafeRegion;
        d.jwForceState = u.forceState;
        d.jwReleaseState = u.releaseState;
        d.jwGetPlaylistIndex = b("item");
        d.jwGetPosition = b("position");
        d.jwGetDuration = b("duration");
        d.jwGetBuffer = b("buffer");
        d.jwGetWidth = b("width");
        d.jwGetHeight = b("height");
        d.jwGetFullscreen = b("fullscreen");
        d.jwGetVolume = b("volume");
        d.jwGetMute = b("mute");
        d.jwGetState = b("state");
        d.jwGetStretching = b("stretching");
        d.jwGetPlaylist = function() {
            for (var a = f.playlist, b = [], c = 0; c < a.length; c++) b.push(e(a[c]));
            return b
        };
        d.jwGetControls = b("controls");
        d.jwDetachMedia = l.detachMedia;
        d.jwAttachMedia = l.attachMedia;
        d.jwPlayAd = function(a) {
            var b = g(d.id).plugins;
            b.vast && b.vast.jwPlayAd(a)
        };
        d.jwPauseAd = function() {
            var a = g(d.id).plugins;
            a.googima &&
                a.googima.jwPauseAd()
        };
        d.jwInitInstream = function() {
            d.jwInstreamDestroy();
            m = new h.instream(d, f, u, l);
            m.init()
        };
        d.jwLoadItemInstream = function(a, b) {
            if (!m) throw "Instream player undefined";
            m.load(a, b)
        };
        d.jwLoadArrayInstream = function(a, b) {
            if (!m) throw "Instream player undefined";
            m.load(a, b)
        };
        d.jwSetControls = function(a) {
            u.setControls(a);
            m && m.setControls(a)
        };
        d.jwInstreamPlay = function() {
            m && m.jwInstreamPlay()
        };
        d.jwInstreamPause = function() {
            m && m.jwInstreamPause()
        };
        d.jwInstreamState = function() {
            return m ? m.jwInstreamState() :
                ""
        };
        d.jwInstreamDestroy = function(a, b) {
            if (b = b || m) b.jwInstreamDestroy(a || !1), b === m && (m = void 0)
        };
        d.jwInstreamAddEventListener = function(a, b) {
            m && m.jwInstreamAddEventListener(a, b)
        };
        d.jwInstreamRemoveEventListener = function(a, b) {
            m && m.jwInstreamRemoveEventListener(a, b)
        };
        d.jwPlayerDestroy = function() {
            u && u.destroy()
        };
        d.jwInstreamSetText = function(a) {
            m && m.jwInstreamSetText(a)
        };
        d.jwIsBeforePlay = function() {
            return l.checkBeforePlay()
        };
        d.jwIsBeforeComplete = function() {
            return f.getVideo().checkComplete()
        };
        d.jwSetCues =
            u.addCues;
        d.jwAddEventListener = l.addEventListener;
        d.jwRemoveEventListener = l.removeEventListener;
        d.jwDockAddButton = u.addButton;
        d.jwDockRemoveButton = u.removeButton;
        c = new h.setup(f, u, l);
        c.addEventListener(g.events.JWPLAYER_READY, function(b) {
            l.playerReady(b);
            a.css.unblock(d.id)
        });
        c.addEventListener(g.events.JWPLAYER_ERROR, function(b) {
            a.log("There was a problem setting up the player: ", b);
            a.css.unblock(d.id)
        });
        c.start()
    }
})(window.jwplayer);
(function(g) {
    var h = {
            size: 180,
            backgroundcolor: "#333333",
            fontcolor: "#999999",
            overcolor: "#CCCCCC",
            activecolor: "#CCCCCC",
            titlecolor: "#CCCCCC",
            titleovercolor: "#FFFFFF",
            titleactivecolor: "#FFFFFF",
            fontweight: "normal",
            titleweight: "normal",
            fontsize: 11,
            titlesize: 13
        },
        a = jwplayer.events,
        c = jwplayer.utils,
        e = c.css,
        b = c.isMobile(),
        d = document;
    g.playlistcomponent = function(f, u) {
        function l(a) {
            return "#" + q.id + (a ? " ." + a : "")
        }

        function m(a, b) {
            var c = d.createElement(a);
            b && (c.className = b);
            return c
        }

        function r(a) {
            return function() {
                v =
                    a;
                n.jwPlaylistItem(a);
                n.jwPlay(!0)
            }
        }
        var n = f,
            z = n.skin,
            j = c.extend({}, h, n.skin.getComponentSettings("playlist"), u),
            q, C, w, t, D = -1,
            v, x, p = 76,
            k = {
                background: void 0,
                divider: void 0,
                item: void 0,
                itemOver: void 0,
                itemImage: void 0,
                itemActive: void 0
            },
            B, F = this;
        F.element = function() {
            return q
        };
        F.redraw = function() {
            x && x.redraw()
        };
        F.show = function() {
            c.show(q)
        };
        F.hide = function() {
            c.hide(q)
        };
        q = m("div", "jwplaylist");
        q.id = n.id + "_jwplayer_playlistcomponent";
        B = "basic" == n._model.playlistlayout;
        C = m("div", "jwlistcontainer");
        q.appendChild(C);
        c.foreach(k, function(a) {
            k[a] = z.getSkinElement("playlist", a)
        });
        B && (p = 32);
        k.divider && (p += k.divider.height);
        var s = 0,
            A = 0,
            K = 0;
        c.clearCss(l());
        e(l(), {
            "background-color": j.backgroundcolor
        });
        e(l("jwlist"), {
            "background-image": k.background ? " url(" + k.background.src + ")" : ""
        });
        e(l("jwlist *"), {
            color: j.fontcolor,
            font: j.fontweight + " " + j.fontsize + "px Arial, Helvetica, sans-serif"
        });
        k.itemImage ? (s = (p - k.itemImage.height) / 2 + "px ", A = k.itemImage.width, K = k.itemImage.height) : (A = 4 * p / 3, K = p);
        k.divider && e(l("jwplaylistdivider"), {
            "background-image": "url(" + k.divider.src + ")",
            "background-size": "100% " + k.divider.height + "px",
            width: "100%",
            height: k.divider.height
        });
        e(l("jwplaylistimg"), {
            height: K,
            width: A,
            margin: s ? s + "0 " + s + s : "0 5px 0 0"
        });
        e(l("jwlist li"), {
            "background-image": k.item ? "url(" + k.item.src + ")" : "",
            height: p,
            overflow: "hidden",
            "background-size": "100% " + p + "px",
            cursor: "pointer"
        });
        s = {
            overflow: "hidden"
        };
        "" !== j.activecolor && (s.color = j.activecolor);
        k.itemActive && (s["background-image"] = "url(" + k.itemActive.src + ")");
        e(l("jwlist li.active"),
            s);
        e(l("jwlist li.active .jwtitle"), {
            color: j.titleactivecolor
        });
        e(l("jwlist li.active .jwdescription"), {
            color: j.activecolor
        });
        s = {
            overflow: "hidden"
        };
        "" !== j.overcolor && (s.color = j.overcolor);
        k.itemOver && (s["background-image"] = "url(" + k.itemOver.src + ")");
        b || (e(l("jwlist li:hover"), s), e(l("jwlist li:hover .jwtitle"), {
            color: j.titleovercolor
        }), e(l("jwlist li:hover .jwdescription"), {
            color: j.overcolor
        }));
        e(l("jwtextwrapper"), {
            height: p,
            position: "relative"
        });
        e(l("jwtitle"), {
            overflow: "hidden",
            display: "inline-block",
            height: B ? p : 20,
            color: j.titlecolor,
            "font-size": j.titlesize,
            "font-weight": j.titleweight,
            "margin-top": B ? "0 10px" : 10,
            "margin-left": 10,
            "margin-right": 10,
            "line-height": B ? p : 20
        });
        e(l("jwdescription"), {
            display: "block",
            "font-size": j.fontsize,
            "line-height": 18,
            "margin-left": 10,
            "margin-right": 10,
            overflow: "hidden",
            height: 36,
            position: "relative"
        });
        n.jwAddEventListener(a.JWPLAYER_PLAYLIST_LOADED, function() {
            C.innerHTML = "";
            for (var a = n.jwGetPlaylist(), d = [], f = 0; f < a.length; f++) a[f]["ova.hidden"] || d.push(a[f]);
            if (w = d) {
                a =
                    m("ul", "jwlist");
                a.id = q.id + "_ul" + Math.round(1E7 * Math.random());
                t = a;
                for (a = 0; a < w.length; a++) {
                    var j = a,
                        d = w[j],
                        f = m("li", "jwitem"),
                        h = void 0;
                    f.id = t.id + "_item_" + j;
                    0 < j ? (h = m("div", "jwplaylistdivider"), f.appendChild(h)) : (j = k.divider ? k.divider.height : 0, f.style.height = p - j + "px", f.style["background-size"] = "100% " + (p - j) + "px");
                    j = m("div", "jwplaylistimg jwfill");
                    h = void 0;
                    d["playlist.image"] && k.itemImage ? h = d["playlist.image"] : d.image && k.itemImage ? h = d.image : k.itemImage && (h = k.itemImage.src);
                    h && !B && (e("#" + f.id + " .jwplaylistimg", {
                        "background-image": h
                    }), f.appendChild(j));
                    j = m("div", "jwtextwrapper");
                    h = m("span", "jwtitle");
                    h.innerHTML = d && d.title ? d.title : "";
                    j.appendChild(h);
                    d.description && !B && (h = m("span", "jwdescription"), h.innerHTML = d.description, j.appendChild(h));
                    f.appendChild(j);
                    d = f;
                    b ? (new c.touch(d)).addEventListener(c.touchEvents.TAP, r(a)) : d.onclick = r(a);
                    t.appendChild(d)
                }
                D = n.jwGetPlaylistIndex();
                C.appendChild(t);
                x = new g.playlistslider(q.id + "_slider", n.skin, q, t)
            }
        });
        n.jwAddEventListener(a.JWPLAYER_PLAYLIST_ITEM, function(a) {
            0 <=
                D && (d.getElementById(t.id + "_item_" + D).className = "jwitem", D = a.index);
            d.getElementById(t.id + "_item_" + a.index).className = "jwitem active";
            a = n.jwGetPlaylistIndex();
            a != v && (v = -1, x && x.visible() && x.thumbPosition(a / (n.jwGetPlaylist().length - 1)))
        });
        n.jwAddEventListener(a.JWPLAYER_RESIZE, function() {
            F.redraw()
        });
        return this
    };
    e(".jwplaylist", {
        position: "absolute",
        width: "100%",
        height: "100%"
    });
    c.dragStyle(".jwplaylist", "none");
    e(".jwplaylist .jwplaylistimg", {
        position: "relative",
        width: "100%",
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: "hidden"
    });
    e(".jwplaylist .jwlist", {
        position: "absolute",
        width: "100%",
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: "hidden"
    });
    e(".jwplaylist .jwlistcontainer", {
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%"
    });
    e(".jwplaylist .jwlist li", {
        width: "100%"
    });
    e(".jwplaylist .jwtextwrapper", {
        overflow: "hidden"
    });
    e(".jwplaylist .jwplaylistdivider", {
        position: "absolute"
    });
    b && c.transitionStyle(".jwplaylist .jwlist", "top .35s")
})(jwplayer.html5);
(function(g) {
    function h() {
        var a = [],
            b;
        for (b = 0; b < arguments.length; b++) a.push(".jwplaylist ." + arguments[b]);
        return a.join(",")
    }
    var a = jwplayer.utils,
        c = a.touchEvents,
        e = a.css,
        b = document,
        d = window,
        f = void 0;
    g.playlistslider = function(h, g, m, r) {
        function n(a) {
            return "#" + k.id + (a ? " ." + a : "")
        }

        function z(a, c, d, k) {
            var j = b.createElement("div");
            a && (j.className = a, c && e(n(a), {
                "background-image": c.src ? c.src : f,
                "background-repeat": k ? "repeat-y" : "no-repeat",
                height: k ? f : c.height
            }));
            d && d.appendChild(j);
            return j
        }

        function j(a) {
            return (a =
                x.getSkinElement("playlist", a)) ? a : {
                width: 0,
                height: 0,
                src: f
            }
        }

        function q(a) {
            if (G) return a = a ? a : d.event, aa(A - (a.detail ? -1 * a.detail : a.wheelDelta / 40) / 10), a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.cancel = !0, a.returnValue = !1
        }

        function C(a) {
            0 == a.button && (s = !0);
            b.onselectstart = function() {
                return !1
            };
            d.addEventListener("mousemove", t, !1);
            d.addEventListener("mouseup", v, !1)
        }

        function w(a) {
            aa(A - 2 * a.deltaY / p.clientHeight)
        }

        function t(b) {
            if (s || "click" == b.type) {
                var c =
                    a.bounds(B),
                    d = F.clientHeight / 2;
                aa((b.pageY - c.top - d) / (c.height - d - d))
            }
        }

        function D(a) {
            return function(b) {
                0 < b.button || (aa(A + 0.05 * a), K = setTimeout(function() {
                    I = setInterval(function() {
                        aa(A + 0.05 * a)
                    }, 50)
                }, 500))
            }
        }

        function v() {
            s = !1;
            d.removeEventListener("mousemove", t);
            d.removeEventListener("mouseup", v);
            b.onselectstart = f;
            clearTimeout(K);
            clearInterval(I)
        }
        var x = g,
            p = r,
            k, B, F, s, A = 0,
            K, I;
        g = a.isMobile();
        var G = !0,
            H, P, Q, M, y, R, T, ca, ba;
        this.element = function() {
            return k
        };
        this.visible = function() {
            return G
        };
        var S = this.redraw =
            function() {
                clearTimeout(ba);
                ba = setTimeout(function() {
                    if (p && p.clientHeight) {
                        var a = p.parentNode.clientHeight / p.clientHeight;
                        0 > a && (a = 0);
                        1 < a ? G = !1 : (G = !0, e(n("jwthumb"), {
                            height: Math.max(B.clientHeight * a, y.height + R.height)
                        }));
                        e(n(), {
                            visibility: G ? "visible" : "hidden"
                        });
                        p && (p.style.width = G ? p.parentElement.clientWidth - Q.width + "px" : "")
                    } else ba = setTimeout(S, 10)
                }, 0)
            },
            aa = this.thumbPosition = function(a) {
                isNaN(a) && (a = 0);
                A = Math.max(0, Math.min(1, a));
                e(n("jwthumb"), {
                    top: T + (B.clientHeight - F.clientHeight) * A
                });
                r && (r.style.top =
                    Math.min(0, k.clientHeight - r.scrollHeight) * A + "px")
            };
        k = z("jwslider", null, m);
        k.id = h;
        h = new a.touch(p);
        g ? h.addEventListener(c.DRAG, w) : (k.addEventListener("mousedown", C, !1), k.addEventListener("click", t, !1));
        H = j("sliderCapTop");
        P = j("sliderCapBottom");
        Q = j("sliderRail");
        h = j("sliderRailCapTop");
        m = j("sliderRailCapBottom");
        M = j("sliderThumb");
        y = j("sliderThumbCapTop");
        R = j("sliderThumbCapBottom");
        T = H.height;
        ca = P.height;
        e(n(), {
            width: Q.width
        });
        e(n("jwrail"), {
            top: T,
            bottom: ca
        });
        e(n("jwthumb"), {
            top: T
        });
        H = z("jwslidertop",
            H, k);
        P = z("jwsliderbottom", P, k);
        B = z("jwrail", null, k);
        F = z("jwthumb", null, k);
        g || (H.addEventListener("mousedown", D(-1), !1), P.addEventListener("mousedown", D(1), !1));
        z("jwrailtop", h, B);
        z("jwrailback", Q, B, !0);
        z("jwrailbottom", m, B);
        e(n("jwrailback"), {
            top: h.height,
            bottom: m.height
        });
        z("jwthumbtop", y, F);
        z("jwthumbback", M, F, !0);
        z("jwthumbbottom", R, F);
        e(n("jwthumbback"), {
            top: y.height,
            bottom: R.height
        });
        S();
        p && !g && (p.addEventListener("mousewheel", q, !1), p.addEventListener("DOMMouseScroll", q, !1));
        return this
    };
    e(h("jwslider"), {
        position: "absolute",
        height: "100%",
        visibility: "hidden",
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: "hidden"
    });
    e(h("jwslider") + " *", {
        position: "absolute",
        width: "100%",
        "background-position": "center",
        "background-size": "100% 100%",
        overflow: "hidden"
    });
    e(h("jwslidertop", "jwrailtop", "jwthumbtop"), {
        top: 0
    });
    e(h("jwsliderbottom", "jwrailbottom", "jwthumbbottom"), {
        bottom: 0
    })
})(jwplayer.html5);
(function(g) {
    var h = jwplayer.utils,
        a = h.css,
        c = document,
        e = "none";
    g.rightclick = function(a, d) {
        function f(a) {
            var b = c.createElement("div");
            b.className = a.replace(".", "");
            return b
        }

        function u() {
            r || (n.style.display = e)
        }
        var l, m = h.extend({
                aboutlink: "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + g.version + "\x26m\x3dh\x26e\x3do",
                abouttext: "About JW Player " + g.version + "..."
            }, d),
            r = !1,
            n, z;
        this.element = function() {
            return n
        };
        this.destroy = function() {
            c.removeEventListener("mousedown", u, !1)
        };
        l = c.getElementById(a.id);
        n = f(".jwclick");
        n.id = a.id + "_menu";
        n.style.display = e;
        l.oncontextmenu = function(a) {
            if (!r) {
                null == a && (a = window.event);
                var b = null != a.target ? a.target : a.srcElement,
                    c = h.bounds(l),
                    b = h.bounds(b);
                n.style.display = e;
                n.style.left = (a.offsetX ? a.offsetX : a.layerX) + b.left - c.left + "px";
                n.style.top = (a.offsetY ? a.offsetY : a.layerY) + b.top - c.top + "px";
                n.style.display = "block";
                a.preventDefault()
            }
        };
        n.onmouseover = function() {
            r = !0
        };
        n.onmouseout = function() {
            r = !1
        };
        c.addEventListener("mousedown", u, !1);
        z = f(".jwclick_item");
        z.innerHTML =
            m.abouttext;
        z.onclick = function() {
            window.top.location = m.aboutlink
        };
        n.appendChild(z);
        l.appendChild(n)
    };
    a(".jwclick", {
        "background-color": "#FFF",
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        "-moz-box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        "box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        position: "absolute",
        "z-index": 999
    }, !0);
    a(".jwclick div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": "#FFF",
        border: "none",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        color: "inherit"
    }, !0);
    a(".jwclick_item", {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, !0);
    a(".jwclick_item:hover", {
        "background-color": "#595959",
        color: "#FFF"
    }, !0);
    a(".jwclick_item a", {
        "text-decoration": e,
        color: "#000"
    }, !0);
    a(".jwclick hr", {
        width: "100%",
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, !0)
})(jwplayer.html5);
(function(g) {
    var h = jwplayer,
        a = h.utils,
        c = h.events,
        e = h.playlist,
        b = 2,
        d = 4;
    g.setup = function(f, h) {
        function l(a, b, c) {
            v.push({
                name: a,
                method: b,
                depends: c
            })
        }

        function m() {
            for (var a = 0; a < v.length; a++) {
                var b = v[a],
                    c;
                a: {
                    if (c = b.depends) {
                        c = c.toString().split(",");
                        for (var d = 0; d < c.length; d++)
                            if (!C[c[d]]) {
                                c = !1;
                                break a
                            }
                    }
                    c = !0
                }
                if (c) {
                    v.splice(a, 1);
                    try {
                        b.method(), m()
                    } catch (e) {
                        j(e.message)
                    }
                    return
                }
            }
            0 < v.length && !D && setTimeout(m, 500)
        }

        function r() {
            C[b] = !0
        }

        function n(a) {
            j("Error loading skin: " + a)
        }

        function z() {
            C[d] = !0
        }

        function j(a) {
            D = !0;
            t.sendEvent(c.JWPLAYER_ERROR, {
                message: a
            });
            q.setupError(a)
        }
        var q = h,
            C = {},
            w, t = new c.eventdispatcher,
            D = !1,
            v = [];
        a.extend(this, t);
        this.start = m;
        l(1, function() {
            f.edition && "invalid" == f.edition() ? j("Error setting up player: Invalid license key") : C[1] = !0
        });
        l(b, function() {
            w = new g.skin;
            w.load(f.config.skin, r, n)
        }, 1);
        l(3, function() {
            switch (a.typeOf(f.config.playlist)) {
                case "string":
                    j("Can't load a playlist as a string anymore");
                case "array":
                    var b = new e(f.config.playlist);
                    f.setPlaylist(b);
                    0 == f.playlist[0].sources.length ?
                        j("Error loading playlist: No playable sources found") : C[3] = !0
            }
        }, 1);
        l(d, function() {
            var a = f.playlist[f.item].image;
            if (a) {
                var b = new Image;
                b.addEventListener("load", z, !1);
                b.addEventListener("error", z, !1);
                b.src = a;
                setTimeout(z, 500)
            } else C[d] = !0
        }, 3);
        l(5, function() {
            q.setup(w);
            C[5] = !0
        }, d + "," + b);
        l(6, function() {
            C[6] = !0
        }, "5,3");
        l(7, function() {
            t.sendEvent(c.JWPLAYER_READY);
            C[7] = !0
        }, 6)
    }
})(jwplayer.html5);
(function(g) {
    g.skin = function() {
        var h = {},
            a = !1;
        this.load = function(c, e, b) {
            new g.skinloader(c, function(b) {
                a = !0;
                h = b;
                "function" == typeof e && e()
            }, function(a) {
                "function" == typeof b && b(a)
            })
        };
        this.getSkinElement = function(c, e) {
            c = c.toLowerCase();
            e = e.toLowerCase();
            if (a) try {
                return h[c].elements[e]
            } catch (b) {
                jwplayer.utils.log("No such skin component / element: ", [c, e])
            }
            return null
        };
        this.getComponentSettings = function(c) {
            c = c.toLowerCase();
            return a && h && h[c] ? h[c].settings : null
        };
        this.getComponentLayout = function(c) {
            c = c.toLowerCase();
            if (a) {
                var e = h[c].layout;
                if (e && (e.left || e.right || e.center)) return h[c].layout
            }
            return null
        }
    }
})(jwplayer.html5);
(function(g) {
    var h = jwplayer.utils,
        a = h.foreach,
        c = "Skin formatting error";
    g.skinloader = function(e, b, d) {
        function f(a) {
            z = a;
            h.ajax(h.getAbsolutePath(t), function(a) {
                try {
                    h.exists(a.responseXML) && l(a.responseXML)
                } catch (b) {
                    q(c)
                }
            }, function(a) {
                q(a)
            })
        }

        function u(a, b) {
            return a ? a.getElementsByTagName(b) : null
        }

        function l(a) {
            var b = u(a, "skin")[0];
            a = u(b, "component");
            var c = b.getAttribute("target"),
                b = parseFloat(b.getAttribute("pixelratio"));
            0 < b && (x = b);
            (!c || parseFloat(c) > parseFloat(jwplayer.version)) && q("Incompatible player version");
            if (0 === a.length) j(z);
            else
                for (c = 0; c < a.length; c++) {
                    var d = n(a[c].getAttribute("name")),
                        b = {
                            settings: {},
                            elements: {},
                            layout: {}
                        },
                        e = u(u(a[c], "elements")[0], "element");
                    z[d] = b;
                    for (var f = 0; f < e.length; f++) r(e[f], d);
                    if ((d = u(a[c], "settings")[0]) && 0 < d.childNodes.length) {
                        d = u(d, "setting");
                        for (e = 0; e < d.length; e++) {
                            var f = d[e].getAttribute("name"),
                                g = d[e].getAttribute("value");
                            /color$/.test(f) && (g = h.stringToColor(g));
                            b.settings[n(f)] = g
                        }
                    }
                    if ((d = u(a[c], "layout")[0]) && 0 < d.childNodes.length) {
                        d = u(d, "group");
                        for (e = 0; e < d.length; e++) {
                            g =
                                d[e];
                            f = {
                                elements: []
                            };
                            b.layout[n(g.getAttribute("position"))] = f;
                            for (var l = 0; l < g.attributes.length; l++) {
                                var t = g.attributes[l];
                                f[t.name] = t.value
                            }
                            g = u(g, "*");
                            for (l = 0; l < g.length; l++) {
                                t = g[l];
                                f.elements.push({
                                    type: t.tagName
                                });
                                for (var v = 0; v < t.attributes.length; v++) {
                                    var w = t.attributes[v];
                                    f.elements[l][n(w.name)] = w.value
                                }
                                h.exists(f.elements[l].name) || (f.elements[l].name = t.tagName)
                            }
                        }
                    }
                    C = !1;
                    m()
                }
        }

        function m() {
            clearInterval(w);
            D || (w = setInterval(function() {
                var b = !0;
                a(z, function(c, d) {
                    "properties" != c && a(d.elements,
                        function(a) {
                            (z[n(c)] ? z[n(c)].elements[n(a)] : null).ready || (b = !1)
                        })
                });
                b && !1 == C && (clearInterval(w), j(z))
            }, 100))
        }

        function r(a, b) {
            b = n(b);
            var c = new Image,
                d = n(a.getAttribute("name")),
                e = a.getAttribute("src");
            if (0 !== e.indexOf("data:image/png;base64,")) var f = h.getAbsolutePath(t),
                e = [f.substr(0, f.lastIndexOf("/")), b, e].join("/");
            z[b].elements[d] = {
                height: 0,
                width: 0,
                src: "",
                ready: !1,
                image: c
            };
            c.onload = function() {
                var a = b,
                    e = z[n(a)] ? z[n(a)].elements[n(d)] : null;
                e ? (e.height = Math.round(c.height / x * v), e.width = Math.round(c.width /
                    x * v), e.src = c.src, e.ready = !0, m()) : h.log("Loaded an image for a missing element: " + a + "." + d)
            };
            c.onerror = function() {
                D = !0;
                m();
                q("Skin image not found: " + this.src)
            };
            c.src = e
        }

        function n(a) {
            return a ? a.toLowerCase() : ""
        }
        var z = {},
            j = b,
            q = d,
            C = !0,
            w, t = e,
            D = !1,
            v = (jwplayer.utils.isMobile(), 1),
            x = 1;
        "string" != typeof t || "" === t ? l(g.defaultskin().xml) : "xml" != h.extension(t) ? q("Skin not a valid file type") : new g.skinloader("", f, q)
    }
})(jwplayer.html5);
(function(g) {
    var h = g.utils,
        a = g.events,
        c = h.css;
    g.html5.thumbs = function(e) {
        function b(a) {
            r = null;
            try {
                a = (new g.parsers.srt).parse(a.responseText, !0)
            } catch (b) {
                d(b.message);
                return
            }
            if ("array" !== h.typeOf(a)) return d("Invalid data");
            l = a
        }

        function d(a) {
            r = null;
            h.log("Thumbnails could not be loaded: " + a)
        }

        function f(a, b, d) {
            a.onload = null;
            b.width || (b.width = a.width, b.height = a.height);
            b["background-image"] = a.src;
            c.style(u, b);
            d && d(b.width)
        }
        var u, l, m, r, n, z = {},
            j, q = new a.eventdispatcher;
        h.extend(this, q);
        u = document.createElement("div");
        u.id = e;
        this.load = function(a) {
            c.style(u, {
                display: "none"
            });
            r && (r.onload = null, r.onreadystatechange = null, r.onerror = null, r.abort && r.abort(), r = null);
            j && (j.onload = null);
            a ? (m = a.split("?")[0].split("/").slice(0, -1).join("/"), r = h.ajax(a, b, d, !0)) : (l = n = j = null, z = {})
        };
        this.element = function() {
            return u
        };
        this.updateTimeline = function(a, b) {
            if (l) {
                for (var c = 0; c < l.length && a > l[c].end;) c++;
                c === l.length && c--;
                c = l[c].text;
                a: {
                    var e = c;
                    if (e && e !== n) {
                        n = e;
                        0 > e.indexOf("://") && (e = m ? m + "/" + e : e);
                        var h = {
                            display: "block",
                            margin: "0 auto",
                            "background-position": "0 0",
                            width: 0,
                            height: 0
                        };
                        if (0 < e.indexOf("#xywh")) try {
                            var g = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(e),
                                e = g[1];
                            h["background-position"] = -1 * g[2] + "px " + -1 * g[3] + "px";
                            h.width = g[4];
                            h.height = g[5]
                        } catch (p) {
                            d("Could not parse thumbnail");
                            break a
                        }
                        var k = z[e];
                        k ? f(k, h, b) : (k = new Image, k.onload = function() {
                            f(k, h, b)
                        }, z[e] = k, k.src = e);
                        j && (j.onload = null);
                        j = k
                    }
                }
                return c
            }
        }
    }
})(jwplayer);
(function(g) {
    var h = g.utils,
        a = g.events,
        c = a.state,
        e = !0,
        b = !1;
    g.html5.video = function(d) {
        function f(a, b) {
            y && M.sendEvent(a, b)
        }

        function g() {}

        function l(b) {
            r(b);
            y && (G == c.PLAYING && !I) && (F = Number(k.currentTime.toFixed(1)), f(a.JWPLAYER_MEDIA_TIME, {
                position: F,
                duration: B
            }))
        }

        function m(c) {
            y && (s || (s = e, n()), "loadedmetadata" == c.type && (k.muted && (k.muted = b, k.muted = e), f(a.JWPLAYER_MEDIA_META, {
                duration: k.duration,
                height: k.videoHeight,
                width: k.videoWidth
            })))
        }

        function r() {
            s && (0 < K && !ca) && (D ? setTimeout(function() {
                    0 < K && da(K)
                },
                200) : da(K))
        }

        function n() {
            A || (A = e, f(a.JWPLAYER_MEDIA_BUFFER_FULL))
        }

        function z(a) {
            y && !I && (k.paused ? k.currentTime == k.duration && 3 < k.duration || qa() : (!h.isFF() || !("play" == a.type && G == c.BUFFERING)) && w(c.PLAYING))
        }

        function j() {
            y && (I || w(c.BUFFERING))
        }

        function q(a) {
            var b;
            if ("array" == h.typeOf(a) && 0 < a.length) {
                b = [];
                for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                        e = {};
                    e.label = d.label && d.label ? d.label ? d.label : 0 : c;
                    b[c] = e
                }
            }
            return b
        }

        function C() {
            A = s = b;
            p = R[T];
            w(c.BUFFERING);
            k.src = p.file;
            k.load();
            P = setInterval(t, 100);
            h.isMobile() &&
                n()
        }

        function w(b) {
            if (!(b == c.PAUSED && G == c.IDLE) && !I && G != b) {
                var d = G;
                G = b;
                f(a.JWPLAYER_PLAYER_STATE, {
                    oldstate: d,
                    newstate: b
                })
            }
        }

        function t() {
            if (y) {
                var b;
                b = 0 == k.buffered.length || 0 == k.duration ? 0 : k.buffered.end(k.buffered.length - 1) / k.duration;
                b != Q && (Q = b, f(a.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(100 * Q)
                }));
                1 <= b && clearInterval(P)
            }
        }
        var D = h.isIE(),
            v = {
                abort: g,
                canplay: m,
                canplaythrough: g,
                durationchange: function() {
                    if (y) {
                        var a = Number(k.duration.toFixed(1));
                        B != a && (B = a);
                        ca && (0 < K && a > K) && da(K);
                        l()
                    }
                },
                emptied: g,
                ended: function() {
                    y && G != c.IDLE && (T = -1, Y = e, f(a.JWPLAYER_MEDIA_BEFORECOMPLETE), y && (w(c.IDLE), Y = b, f(a.JWPLAYER_MEDIA_COMPLETE)))
                },
                error: function() {
                    y && (h.log("Error playing media: %o", k.error), M.sendEvent(a.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: File could not be played"
                    }), w(c.IDLE))
                },
                loadeddata: g,
                loadedmetadata: m,
                loadstart: g,
                pause: z,
                play: z,
                playing: z,
                progress: r,
                ratechange: g,
                readystatechange: g,
                seeked: function() {
                    !I && G != c.PAUSED && w(c.PLAYING)
                },
                seeking: D ? j : g,
                stalled: g,
                suspend: g,
                timeupdate: l,
                volumechange: function() {
                    f(a.JWPLAYER_MEDIA_VOLUME, {
                        volume: Math.round(100 * k.volume)
                    });
                    f(a.JWPLAYER_MEDIA_MUTE, {
                        mute: k.muted
                    })
                },
                waiting: j
            },
            x, p, k, B, F, s, A, K, I = b,
            G = c.IDLE,
            H, P = -1,
            Q = -1,
            M = new a.eventdispatcher,
            y = b,
            R, T = -1,
            ca = h.isAndroid(b, e),
            ba = h.isIOS(7),
            S = this,
            aa = [],
            Y = b;
        h.extend(S, M);
        S.load = function(b) {
            if (y) {
                x = b;
                K = 0;
                B = b.duration ? b.duration : -1;
                F = 0;
                R = x.sources;
                0 > T && (T = 0);
                for (b = 0; b < R.length; b++)
                    if (R[b]["default"]) {
                        T = b;
                        break
                    }
                var c = h.getCookies().qualityLabel;
                if (c)
                    for (b = 0; b < R.length; b++)
                        if (R[b].label == c) {
                            T = b;
                            break
                        }(b = q(R)) && M.sendEvent(a.JWPLAYER_MEDIA_LEVELS, {
                    levels: b,
                    currentQuality: T
                });
                C()
            }
        };
        S.stop = function() {
            y && (k.removeAttribute("src"), D || k.load(), T = -1, clearInterval(P), w(c.IDLE))
        };
        S.play = function() {
            y && !I && k.play()
        };
        var qa = S.pause = function() {
            y && (k.pause(), w(c.PAUSED))
        };
        S.seekDrag = function(a) {
            y && ((I = a) ? k.pause() : k.play())
        };
        var da = S.seek = function(b) {
                y && (!I && 0 == K && f(a.JWPLAYER_MEDIA_SEEK, {
                    position: F,
                    offset: b
                }), s ? (K = 0, k.currentTime = b) : K = b)
            },
            Ra = S.volume = function(a) {
                h.exists(a) && (k.volume = Math.min(Math.max(0, a / 100), 1), H = 100 * k.volume)
            };
        S.mute = function(a) {
            h.exists(a) ||
                (a = !k.muted);
            a ? (H = 100 * k.volume, k.muted = e) : (Ra(H), k.muted = b)
        };
        this.addCaptions = function(a, b, c) {
            h.isIOS() && k.addTextTrack && (0 < c && (c = a[c - 1].label), h.foreach(a, function(a, b) {
                if (b.data) {
                    var c = k.addTextTrack(b.kind, b.label);
                    h.foreach(b.data, function(a, d) {
                        1 == a % 2 && c.addCue(new TextTrackCue(d.begin, b.data[parseInt(a) + 1].begin, d.text))
                    });
                    aa.push(c);
                    c.mode = "hidden"
                }
            }))
        };
        this.resetCaptions = function() {};
        this.fsCaptions = function(a) {
            if (h.isIOS() && k.addTextTrack) {
                var b = null;
                h.foreach(aa, function(c, d) {
                    !a && "showing" ==
                        d.mode && (b = parseInt(c));
                    a || (d.mode = "hidden")
                });
                if (!a) return b
            }
        };
        this.checkComplete = function() {
            return Y
        };
        S.detachMedia = function() {
            y = b;
            return k
        };
        S.attachMedia = function(d) {
            y = e;
            d || (s = b);
            Y && (w(c.IDLE), f(a.JWPLAYER_MEDIA_COMPLETE), Y = b)
        };
        S.getTag = function() {
            return k
        };
        S.audioMode = function() {
            if (!R) return b;
            var a = R[0].type;
            return "aac" == a || "mp3" == a || "vorbis" == a
        };
        S.setCurrentQuality = function(b) {
            T != b && (b = parseInt(b, 10), 0 <= b && (R && R.length > b) && (T = b, h.saveCookie("qualityLabel", R[b].label), f(a.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                currentQuality: b,
                levels: q(R)
            }), b = k.currentTime, C(), S.seek(b)))
        };
        S.getCurrentQuality = function() {
            return T
        };
        S.getQualityLevels = function() {
            return q(R)
        };
        d || (d = document.createElement("video"));
        k = d;
        h.foreach(v, function(a, c) {
            k.addEventListener(a, c, b)
        });
        ba || (k.controls = e, k.controls = b);
        k.setAttribute("x-webkit-airplay", "allow");
        d.setAttribute("webkit-playsinline","webkit-playsinline");
        y = e
    }
})(jwplayer);
(function(g) {
    var h = g.html5,
        a = g.utils,
        c = g.events,
        e = c.state,
        b = a.css,
        d = a.bounds,
        f = a.isMobile(),
        u = a.isIPad(),
        l = a.isIPod(),
        m = a.isAndroid(),
        r = a.isIOS(),
        n = document,
        z = "aspectMode",
        j = !0,
        q = !1,
        C = "hidden",
        w = "none",
        t = "block";
    h.view = function(D, v) {
        function x() {
            var a = d(O),
                b = Math.round(a.width),
                e = Math.round(a.height);
            if (n.body.contains(O)) {
                if (b && e && (b !== eb || e !== Va)) eb = b, Va = e, X && X.redraw(), clearTimeout(xa), xa = setTimeout(P, 50), va.sendEvent(c.JWPLAYER_RESIZE, {
                    width: b,
                    height: e
                })
            } else window.removeEventListener("resize",
                x), f && window.removeEventListener("orientationchange", x);
            return a
        }

        function p(a) {
            a && (a.element().addEventListener("mousemove", A, q), a.element().addEventListener("mouseout", K, q))
        }

        function k() {}

        function B(a, b) {
            var c = n.createElement(a);
            b && (c.className = b);
            return c
        }

        function F() {
            clearTimeout(Aa);
            Aa = setTimeout(Y, nb)
        }

        function s() {
            clearTimeout(Aa);
            if (U.jwGetState() == e.PAUSED || U.jwGetState() == e.PLAYING) qa(), W || (Aa = setTimeout(Y, nb))
        }

        function A() {
            clearTimeout(Aa);
            W = j
        }

        function K() {
            W = q
        }

        function I(a) {
            va.sendEvent(a.type,
                a)
        }

        function G(c, d, e) {
            var f = O.className,
                g, h, k = U.id + "_view";
            b.block(k);
            if (e = !!e) f = f.replace(/\s*aspectMode/, ""), O.className !== f && (O.className = f), b.style(O, {
                display: t
            }, e);
            a.exists(c) && a.exists(d) && (L.width = c, L.height = d);
            e = {
                width: c
            }; - 1 == f.indexOf(z) && (e.height = d);
            b.style(O, e, !0);
            X && X.redraw();
            V && V.redraw(j);
            ea && (ea.offset(V && 0 <= ea.position().indexOf("bottom") ? V.height() + V.margin() : 0), setTimeout(function() {
                N && N.offset("top-left" == ea.position() ? ea.element().clientWidth + ea.margin() : 0)
            }, 500));
            H(d);
            g = L.playlistsize;
            h = L.playlistposition;
            if (oa && g && ("right" == h || "bottom" == h)) oa.redraw(), f = {
                display: t
            }, e = {}, f[h] = 0, e[h] = g, "right" == h ? f.width = g : f.height = g, b.style(Oa, f), b.style(za, e);
            P(c, d);
            b.unblock(k)
        }

        function H(a) {
            var b = d(O);
            ka = 0 < a.toString().indexOf("%") || 0 === b.height ? q : "bottom" == L.playlistposition ? b.height <= 40 + L.playlistsize : 40 >= b.height;
            V && (ka ? (V.audioMode(j), qa(), X.hidePreview(j), X && X.hide(), da(q)) : (V.audioMode(q), Sa(U.jwGetState())));
            ea && ka && S();
            O.style.backgroundColor = ka ? "transparent" : "#000"
        }

        function P(b, c) {
            if (ja) {
                if (!b ||
                    isNaN(Number(b))) b = ra.clientWidth;
                if (!c || isNaN(Number(c))) c = ra.clientHeight;
                a.stretch(L.stretching, ja, b, c, ja.videoWidth, ja.videoHeight) && (clearTimeout(xa), xa = setTimeout(P, 250))
            }
        }

        function Q(a) {
            if (L.fullscreen) switch (a.keyCode) {
                case 27:
                    fa(q)
            }
        }

        function M(a) {
            r || (a ? (O.className += " jwfullscreen", n.getElementsByTagName("body")[0].style["overflow-y"] = C) : (O.className = O.className.replace(/\s+jwfullscreen/, ""), n.getElementsByTagName("body")[0].style["overflow-y"] = ""))
        }

        function y() {
            var a;
            a = n.mozFullScreenElement ||
                n.webkitCurrentFullScreenElement || n.msFullscreenElement || ja.webkitDisplayingFullscreen;
            a = !(!a || a.id && a.id != U.id);
            L.fullscreen != a && fa(a)
        }

        function R() {
            V && (!ka && !L.getVideo().audioMode()) && V.hide()
        }

        function T() {
            N && (!ka && L.controls) && N.show()
        }

        function ca() {
            N && (!Ga && !L.getVideo().audioMode()) && N.hide()
        }

        function ba() {
            ea && !ka && ea.show()
        }

        function S() {
            ea && !L.getVideo().audioMode() && ea.hide(ka)
        }

        function aa() {
            X && L.controls && !ka && (!l || U.jwGetState() == e.IDLE) && X.show();
            if (!f || !L.fullscreen) ja.controls = q
        }

        function Y() {
            clearTimeout(Aa);
            la = q;
            var a = U.jwGetState();
            (!v.controls || a != e.PAUSED) && R();
            v.controls || ca();
            a != e.IDLE && a != e.PAUSED && (ca(), S())
        }

        function qa() {
            la = j;
            if ((L.controls || ka) && !(l && $ == e.PAUSED))(!l || ka) && V && V.show(), T();
            fb.hide && ba()
        }

        function da(a) {
            (a = a && !ka) || m ? b.style(ra, {
                visibility: "visible",
                opacity: 1
            }) : b.style(ra, {
                visibility: C,
                opacity: 0
            })
        }

        function Ra() {
            Ga = j;
            fa(q);
            L.controls && T()
        }

        function ha() {}

        function kb() {}

        function Ia(a) {
            Ga = q;
            clearTimeout(ga);
            ga = setTimeout(function() {
                Sa(a.newstate)
            }, 100)
        }

        function Ya() {
            R()
        }

        function Sa(a) {
            $ =
                a;
            switch (a) {
                case e.PLAYING:
                    (Ba ? Ja : L).getVideo().audioMode() ? (da(q), X.hidePreview(ka), X.setHiding(j), V && (qa(), V.hideFullscreen(j)), T(), ba()) : (da(j), P(), X.hidePreview(j), V && V.hideFullscreen(q), Y());
                    break;
                case e.IDLE:
                    da(q);
                    ka || (X.hidePreview(q), aa(), T(), ba(), V && V.hideFullscreen(q));
                    break;
                case e.BUFFERING:
                    aa();
                    Y();
                    f && da(j);
                    break;
                case e.PAUSED:
                    aa(), qa()
            }
        }

        function Ta(a) {
            return "#" + U.id + (a ? " ." + a : "")
        }

        function Na(a, c) {
            b(a, {
                display: c ? t : w
            })
        }
        var U = D,
            L = v,
            O, za, ua, Za, Oa, Aa = -1,
            nb = f ? 4E3 : 2E3,
            ja, ra, eb, Va, sa, Pa, Ca, Ja,
            Ba = q,
            V, X, N, ea, fb = a.extend({}, L.componentConfig("logo")),
            J, oa, ka, Xa = q,
            la = q,
            Ga, E, xa = -1,
            W = q,
            $, va = new c.eventdispatcher;
        a.extend(this, va);
        this.getCurrentCaptions = function() {
            return J.getCurrentCaptions()
        };
        this.setCurrentCaptions = function(a) {
            J.setCurrentCaptions(a)
        };
        this.getCaptionsList = function() {
            return J.getCaptionsList()
        };
        this.setup = function(d) {
            if (!Xa) {
                U.skin = d;
                za = B("span", "jwmain");
                za.id = U.id + "_view";
                ra = B("span", "jwvideo");
                ja = L.getVideo().getTag();
                ra.appendChild(ja);
                ua = B("span", "jwcontrols");
                sa = B("span",
                    "jwinstream");
                Oa = B("span", "jwplaylistcontainer");
                Za = B("span", "jwaspect");
                d = L.height;
                var g = L.componentConfig("controlbar"),
                    m = L.componentConfig("display");
                H(d);
                J = new h.captions(U, L.captions);
                J.addEventListener(c.JWPLAYER_CAPTIONS_LIST, I);
                J.addEventListener(c.JWPLAYER_CAPTIONS_CHANGED, I);
                J.addEventListener(c.JWPLAYER_CAPTIONS_LOADED, k);
                ua.appendChild(J.element());
                X = new h.display(U, m);
                X.addEventListener(c.JWPLAYER_DISPLAY_CLICK, function(a) {
                    I(a);
                    f ? la ? Y() : qa() : Ia(U.jwGetState());
                    la && F()
                });
                ka && X.hidePreview(j);
                ua.appendChild(X.element());
                ea = new h.logo(U, fb);
                ua.appendChild(ea.element());
                N = new h.dock(U, L.componentConfig("dock"));
                ua.appendChild(N.element());
                U.edition && !f ? E = new h.rightclick(U, {
                    abouttext: L.abouttext,
                    aboutlink: L.aboutlink
                }) : f || (E = new h.rightclick(U, {}));
                L.playlistsize && (L.playlistposition && L.playlistposition != w) && (oa = new h.playlistcomponent(U, {}), Oa.appendChild(oa.element()));
                V = new h.controlbar(U, g);
                V.addEventListener(c.JWPLAYER_USER_ACTION, F);
                ua.appendChild(V.element());
                l && R();
                za.appendChild(ra);
                za.appendChild(ua);
                za.appendChild(sa);
                O.appendChild(za);
                O.appendChild(Za);
                O.appendChild(Oa);
                n.addEventListener("webkitfullscreenchange", y, q);
                ja.addEventListener("webkitbeginfullscreen", y, q);
                ja.addEventListener("webkitendfullscreen", y, q);
                n.addEventListener("mozfullscreenchange", y, q);
                n.addEventListener("MSFullscreenChange", y, q);
                n.addEventListener("keydown", Q, q);
                window.removeEventListener("resize", x);
                window.addEventListener("resize", x, !1);
                f && (window.removeEventListener("orientationchange", x), window.addEventListener("orientationchange",
                    x, !1));
                U.jwAddEventListener(c.JWPLAYER_PLAYER_READY, kb);
                U.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, Ia);
                U.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, Ya);
                U.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, Ra);
                U.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, ha);
                Ia({
                    newstate: e.IDLE
                });
                f || (ua.addEventListener("mouseout", function() {
                    clearTimeout(Aa);
                    Aa = setTimeout(Y, 10)
                }, q), ua.addEventListener("mousemove", s, q), a.isIE() && (ra.addEventListener("mousemove", s, q), ra.addEventListener("click", X.clickHandler)));
                p(V);
                p(N);
                p(ea);
                b("#" + O.id + "." + z + " .jwaspect", {
                    "margin-top": L.aspectratio,
                    display: t
                });
                d = a.exists(L.aspectratio) ? parseFloat(L.aspectratio) : 100;
                g = L.playlistsize;
                b("#" + O.id + ".playlist-right .jwaspect", {
                    "margin-bottom": -1 * g * (d / 100) + "px"
                });
                b("#" + O.id + ".playlist-right .jwplaylistcontainer", {
                    width: g + "px",
                    right: 0,
                    top: 0,
                    height: "100%"
                });
                b("#" + O.id + ".playlist-bottom .jwaspect", {
                    "padding-bottom": g + "px"
                });
                b("#" + O.id + ".playlist-bottom .jwplaylistcontainer", {
                    width: "100%",
                    height: g + "px",
                    bottom: 0
                });
                b("#" + O.id + ".playlist-right .jwmain", {
                    right: g + "px"
                });
                b("#" + O.id + ".playlist-bottom .jwmain", {
                    bottom: g + "px"
                });
                setTimeout(function() {
                    G(L.width, L.height)
                }, 0)
            }
        };
        var fa = this.fullscreen = function(b) {
            a.exists(b) || (b = !L.fullscreen);
            if (b) {
                if ((Ba ? Ja : L).getVideo().audioMode()) return;
                if (f) try {
                    ja.webkitEnterFullScreen(), L.setFullscreen(j)
                } catch (c) {
                    return
                } else L.fullscreen || (M(j), O.requestFullScreen ? O.requestFullScreen() : O.mozRequestFullScreen ? O.mozRequestFullScreen() : O.webkitRequestFullScreen ? O.webkitRequestFullScreen() : O.msRequestFullscreen && O.msRequestFullscreen(),
                    L.setFullscreen(j))
            } else f ? (ja.webkitExitFullScreen(), L.setFullscreen(q), u && (ja.controls = q)) : L.fullscreen && (M(q), L.setFullscreen(q), n.cancelFullScreen ? n.cancelFullScreen() : n.mozCancelFullScreen ? n.mozCancelFullScreen() : n.webkitCancelFullScreen ? n.webkitCancelFullScreen() : n.msExitFullscreen && n.msExitFullscreen()), u && U.jwGetState() == e.PAUSED && setTimeout(aa, 500);
            V && V.redraw();
            X && X.redraw();
            N && N.redraw();
            P();
            L.fullscreen && (clearTimeout(xa), xa = setTimeout(P, 200))
        };
        this.resize = function(a, b) {
            G(a, b, !0);
            x()
        };
        this.resizeMedia = P;
        var Qa = this.completeSetup = function() {
                b.style(O, {
                    opacity: 1
                })
            },
            ga;
        this.setupInstream = function(a, c, d, f) {
            b.unblock();
            Na(Ta("jwinstream"), j);
            Na(Ta("jwcontrols"), q);
            sa.appendChild(a);
            Pa = c;
            Ca = d;
            Ja = f;
            Ia({
                newstate: e.PLAYING
            });
            Ba = j
        };
        this.destroyInstream = function() {
            b.unblock();
            Na(Ta("jwinstream"), q);
            Na(Ta("jwcontrols"), j);
            sa.innerHTML = "";
            Ba = q
        };
        this.setupError = function(a) {
            Xa = j;
            g.embed.errorScreen(O, a, L);
            Qa()
        };
        this.addButton = function(a, b, c, d) {
            N && (N.addButton(a, b, c, d), U.jwGetState() == e.IDLE &&
                T())
        };
        this.removeButton = function(a) {
            N && N.removeButton(a)
        };
        this.setControls = function(a) {
            var b = L.controls,
                d = a ? j : q;
            L.controls = d;
            d != b && (Ba ? a ? (Pa.show(), Ca.show()) : (Pa.hide(), Ca.hide()) : d ? Ia({
                newstate: U.jwGetState()
            }) : (Y(), X && X.hide()), va.sendEvent(c.JWPLAYER_CONTROLS, {
                controls: d
            }))
        };
        this.addCues = function(a) {
            V && V.addCues(a)
        };
        this.forceState = function(a) {
            X.forceState(a)
        };
        this.releaseState = function() {
            X.releaseState(U.jwGetState())
        };
        this.getSafeRegion = function() {
            var a = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            if (!L.controls) return a;
            V.showTemp();
            N.showTemp();
            var b = d(za),
                c = b.top,
                e = Ba ? d(n.getElementById(U.id + "_instream_controlbar")) : d(V.element()),
                f = Ba ? !1 : 0 < N.numButtons(),
                g = 0 === ea.position().indexOf("top"),
                h = d(ea.element());
            f && (f = d(N.element()), a.y = Math.max(0, f.bottom - c));
            g && (a.y = Math.max(a.y, h.bottom - c));
            a.width = b.width;
            a.height = e.height ? (g ? e.top : h.top) - c - a.y : b.height - a.y;
            V.hideTemp();
            N.hideTemp();
            return a
        };
        this.destroy = function() {
            n.removeEventListener("webkitfullscreenchange", y, q);
            n.removeEventListener("mozfullscreenchange",
                y, q);
            n.removeEventListener("MSFullscreenChange", y, q);
            ja.removeEventListener("webkitbeginfullscreen", y, q);
            ja.removeEventListener("webkitendfullscreen", y, q);
            n.removeEventListener("keydown", Q, q);
            E && E.destroy()
        };
        O = B("div", "jwplayer playlist-" + L.playlistposition);
        O.id = U.id;
        L.aspectratio && (b.style(O, {
            display: "inline-block"
        }), O.className = O.className.replace("jwplayer", "jwplayer " + z));
        G(L.width, L.height);
        var La = n.getElementById(U.id);
        La.parentNode.replaceChild(O, La)
    };
    b(".jwplayer", {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": 0,
        "-webkit-transition": "opacity .25s ease",
        "-moz-transition": "opacity .25s ease",
        "-o-transition": "opacity .25s ease"
    });
    b(".jwmain", {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": "opacity .25s ease",
        "-moz-transition": "opacity .25s ease",
        "-o-transition": "opacity .25s ease"
    });
    b(".jwvideo, .jwcontrols", {
        position: "absolute",
        height: "100%",
        width: "100%",
        "-webkit-transition": "opacity .25s ease",
        "-moz-transition": "opacity .25s ease",
        "-o-transition": "opacity .25s ease"
    });
    b(".jwvideo", {
        overflow: C,
        visibility: C,
        opacity: 0,
        cursor: "pointer"
    });
    b(".jwvideo video", {
        background: "transparent",
        //webkit-playsinline: "true",
        height: "100%",
        width: "100%",
        position: "absolute",
        margin: "auto",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    });
    b(".jwplaylistcontainer", {
        position: "absolute",
        height: "100%",
        width: "100%",
        display: w
    });
    b(".jwinstream", {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    b(".jwaspect", {
        display: "none"
    });
    b(".jwplayer." + z, {
        height: "auto"
    });
    b(".jwplayer.jwfullscreen", {
        width: "100%",
        height: "100%",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1E3,
        position: "fixed"
    }, j);
    b(".jwplayer.jwfullscreen .jwmain", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, j);
    b(".jwplayer.jwfullscreen .jwplaylistcontainer", {
        display: w
    }, j);
    b(".jwplayer .jwuniform", {
        "background-size": "contain !important"
    });
    b(".jwplayer .jwfill", {
        "background-size": "cover !important",
        "background-position": "center"
    });
    b(".jwplayer .jwexactfit", {
        "background-size": "100% 100% !important"
    })
})(jwplayer);
(function(g) {
    var h = jwplayer.utils.extend,
        a = g.logo;
    a.defaults.prefix = "";
    a.defaults.file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAyCAMAAACkjD/XAAACnVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCQkSEhIAAAAaGhoAAAAiIiIrKysAAAAxMTEAAAA4ODg+Pj4AAABEREQAAABJSUkAAABOTk5TU1NXV1dcXFxiYmJmZmZqamptbW1xcXF0dHR3d3d9fX2AgICHh4eKioqMjIyOjo6QkJCSkpKUlJSWlpaYmJidnZ2enp6ioqKjo6OlpaWmpqanp6epqamqqqqurq6vr6+wsLCxsbG0tLS1tbW2tra3t7e6urq7u7u8vLy9vb2+vr6/v7/AwMDCwsLFxcXFxcXHx8fIyMjJycnKysrNzc3Ozs7Ozs7Pz8/Pz8/Q0NDR0dHR0dHS0tLU1NTV1dXW1tbW1tbW1tbX19fX19fa2trb29vb29vc3Nzc3Nzf39/f39/f39/f39/g4ODh4eHj4+Pj4+Pk5OTk5OTk5OTk5OTl5eXn5+fn5+fn5+fn5+fn5+fo6Ojo6Ojq6urq6urq6urr6+vr6+vr6+vt7e3t7e3t7e3t7e3u7u7u7u7v7+/v7+/w8PDw8PDw8PDw8PDy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL09PT09PT09PT09PT09PT09PT09PT29vb29vb29vb29vb29vb29vb29vb29vb39/f39/f39/f39/f39/f4+Pj4+Pj4+Pj5+fn5+fn5+fn5+fn5+fn5+fn5+fn6+vr6+vr6+vr6+vr6+vr6+vr8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz9/f39/f39/f39/f39/f39/f39/f39/f39/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////9kpi5JAAAA33RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhYWFxcYGBgZGRoaGhsbHBwdHR4eHx8gISIiIyQmJicoKSoqKywtLi4uMDEyMjM0NTU2Njc5Ojo7Ozw9Pj5AQUJCQ0ZGSElKSktMTU5PUFFRUlRVVlZXWFpbXV5eX2BhYmVmZ2hpamtsbW5vcHFyc3R2d3h5enx9fn+BgoKDhIWGiYmKi4yNjo+QkZKTlJWWl5eYmZqbnJ2enp+goaKkpaamp6ipqqusra6vsLKzs7W2t7i5uru8vb6/wMHCwsPExcbHyMnJysvMVK8y+QAAB5FJREFUeNrFmP2f3EQdx8kmm2yy2WQzmZkjl3bJ2Rb12mtp8SiKiBUUxVKFVisIihV62CKCIoK0UvVK1bP07mitBeVJUVso0Duw1Xo9ET0f6JN47bV3u9+/xe83kyzr0+vlL7t8Xq9ubpLpvHfm+7i54P+UVkBp2gWdFpGNYtFA+NtALpYcxzZ1rSM0TSvgv5xse0wwu1joxDYLulE0dKTTSLcqfOvMQ1WzoHXAtCadsGXqBCsUnWDxNBzmlq51wLSuz0LmOcTWClZFfA1ghLUbrUwbdq396kAvK5s6HoFdlb8FuLONB66RlGnD5S8BwKkNoVMsFEw3XIOj97hmoX2updP5kml7jgLp/Ec8yzBKntwDMCnwa7TPtUrkWLrliW2gtC+0TdNhvdMAu1hJ19plYNcP0LGKiJp/HJTeEI5V8sjJ4PZ2mTp1rb7Pf5C5JbvCN0Cuha7jpE5WX9oeU6us8YlTUH8grFQC+QzkWuKVvdTJXuWO0Z5Nk2tNkWNdzgLed+4tdNWrkpPBI20ytVYwK+LrQLpPcHk3vIVm1ZCcDD7jt8fUGmYNoeLpJzKW+1vQYSjJyc72ZKbWSOqqhpn+99r/rn99WDDLbJViHZbJirkWtJDkZPArbhta2jFg7LdKV1ID9aWaz5CTzTD0pvB2aypB9xYPKtaUXEC7bKKjeA1dHyJTU+xbFgY/RiAKP2lYsm28RaJmAtfTs6c4xP9g0gycUqKpeDGLegZPl3MqTL6oWCdl9EIrOol20/U6zyzgVJzpeV6l7Dhl18VP1/N8v1r1vQoNSziH1nPKKMdBChbAiprheygfL65tZmxazguYXDoL8BcyqlhRb0W/M3Wy412YRTUd7SKEFIKzIBQ8DBhHewgSjkLB7GwS54wxwcoORqYQ+QyhFGA9VIYxnfCKq2VtE3k3wTB1taLx+FVCNTRyxnU4YQ/8WEY9M7PvkvJHsEsAam5srRRwH0YBhml14Zv7pRz62+LAD/jWE0vHINU6OUGXyc0Mt5GiLW/+6blV8eO4tY8B6t3qvBsZOnUy+HJgFaiuMELfhQ6RrAe4JZGvwxcFPLx69YZDZ1ciOrB03ayEd52vr0x6/zokhbxs+p5o7Oc3kfrkxFOrV392d+NWFaeaXvK652Cw+xTAo9cS5ar0vKcfy9BrgNRfMVN0SOh+gPfWtgN8L7kM6pcI2FSrJUtm7kc0KxlF2xcHd/1xWxxvmv1QLB9/5cJobDiKIxklcmI4ShJ5eJ/qOTSqU6/BBC4JN6boQSAN71Doi1Mnm+B0Rjlavgabo/GZ2V/LL8FRSehkkfzzYIouoqXf31jz3de7kq5DB6JP1a+vSUQnOXrRoujpn2XogumJpwCeBfhDV4qeAdK1QwqdOhkMqdAyyyk6HoHR3tmD4/UlI/DDBNFxHK1tDBDaNrHODU7KDzTW16Lr6nccHZGxHNt3Jao/RrSU8pPTeX+JPYj4NpAGkxsg16FoWP1xP5Bu8UwdYxSXJXRyJ0zeCtsegdsm4QsLBBwcHf3l+fF5hHbscnDh1LeSaGwvModnTl7ChVRuNiblxIkjR6bq+9+R9RzkO7cBadWCdZBroDaq/jgDqHMLMYtSr8jkpwl9aaOxF9bdDHsb9T5Ev/rkk6N398SIDj3X5zfDzi1bDpxdHNWWwcOchS27funeR+EOyTI0RcyKLIM20VPzyOObeh4LJsZ/hYnaRpgRsTwG9TPzLz5XhyOSDlzykDEKLsEYl08cG0W9eW+U4B1eZZmtY7J13PXCeHeg0MrPjlH8yLiJ/mYtfqIFvQVNTaez/cMrfwHHpJC7APZH0csAP5ARokPPwXyIoEjKaOnM7UIIOfKKrJEJvEAguhZHUY1sHb3vH1tCxyS0OvGtAL+/iMubQOlMXyKfA6U8i+I0PqWyecA3AmyVEmPhczxEdBUbOKwCsHsAtfNUDyZNdiNcLQld8cTYgQHScjExjNPvOf9RSsrZtt3uB3f2s0Dku35MyiY6z6LYjbMdx+HvO7pd11/egBtCvh7mFvs+P70Rl8L0yU8r7WROyXb5b77Dxemv+I7L82wmxoeY53U9+/K8HE1ZvBq4eGQfh1SNa0Keo5tZVCXwXs7KluUwIZjrMsrHTsB95f4B50JwztGURtHywsBjvGphtIUiFeb9Kn4pjzHXUOhmlXPI3Ug/5QH6BjS1uWpRRdLNku3YWPNw4RKVSSqfpKLq3k3bIZXMvFha+NjQqXqlhYxKa9EgFJGVqKCrqD2ZloJrql7Qgq4vw9DKfn0ahp73B+ln3hPQY/xKJEO1CC2P6T49UOP/fD+R5qphSBvAslttQb8YZr1os7/5ry0P8VDNoZK6T8pnZpdW4bb9ZWPQ2NPtlhxf/A5yPUApt+0/MP2uqy5nLkaKLyZycuOKCp13u9mWXXasol4staAPYyprN1p5CvkR1nD5pxz9jQDPu1Pvbii3yklQmr2U/LtDUr9Fngelp0NqwDsmirPtoLRWJdxOiQrp9Yr8XGiTk3XyxF2eFuw3+ju5aRJl1Yu+f+LMM1eiexc6/lK0QuWpYhkd3XT+UsfOXhd2WKpO6W/TO3BUO8H/BB7RwuB6W7b7AAAAAElFTkSuQmCC";
    g.logo = function(c, e) {
        "free" == c.edition() ? e = null : (a.defaults.file = "", a.defaults.prefix = "");
        h(this, new a(c, e))
    }
})(jwplayer.html5);
(function(g) {
    var h = g.model;
    g.model = function(a, c) {
        var e = new jwplayer.utils.key(a.key),
            b = new h(a, c),
            d = b.componentConfig;
        b.edition = function() {
            return e.edition()
        };
        b.componentConfig = function(a) {
            return "logo" == a ? b.logo : d(a)
        };
        return b
    }
})(jwplayer.html5);
(function(g) {
    g.player.prototype.edition = function() {
        return this._model.edition()
    }
})(jwplayer.html5);
(function(g) {
    var h = jwplayer.utils.extend,
        a = g.rightclick;
    g.rightclick = function(c, e) {
        if ("free" == c.edition()) e.aboutlink = "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + g.version + "\x26m\x3dh\x26e\x3df", delete e.abouttext;
        else {
            if (!e.aboutlink) {
                var b = "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + g.version + "\x26m\x3dh\x26e\x3d",
                    d = c.edition();
                e.aboutlink = b + ("pro" == d ? "p" : "premium" == d ? "r" : "ads" == d ? "a" : "f")
            }
            e.abouttext ? e.abouttext += " ..." : (b = c.edition(), b = b.charAt(0).toUpperCase() + b.substr(1),
                e.abouttext = "About JW Player " + g.version + " (" + b + " edition)")
        }
        h(this, new a(c, e))
    }
})(jwplayer.html5);
(function(g) {
    var h = g.view;
    g.view = function(a, c) {
        var e = new h(a, c);
        "invalid" == c.edition() && e.setupError("Error setting up player: Invalid license key");
        return e
    }
})(jwplayer.html5);