! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.VueSweetAlert = t() : e.VueSweetAlert = t()
}(this, function () {
    return function (e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var a = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "/build/", t(0)
    }([function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1),
            r = o(a);
        t.default = r.default
    }, function (e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(6),
            r = o(a);
        n(5);
        var i = {};
        i.install = function (e) {
            e.prototype.$swal = r.default
        }, t.default = i
    }, function (e, t, n) {
        t = e.exports = n(3)(), t.push([e.id, 'body.swal2-shown{overflow-y:hidden}.swal2-container,body.swal2-iosfix{position:fixed;left:0;right:0}.swal2-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;top:0;bottom:0;padding:10px;background-color:transparent;z-index:1060}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-modal{background-color:#fff;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;border-radius:5px;box-sizing:border-box;text-align:center;margin:auto;overflow-x:hidden;overflow-y:auto;display:none;position:relative;max-width:100%}.swal2-modal:focus{outline:none}.swal2-modal.swal2-loading{overflow-y:hidden}.swal2-modal .swal2-title{color:#595959;font-size:30px;text-align:center;font-weight:600;text-transform:none;position:relative;margin:0 0 .4em;padding:0;display:block;word-wrap:break-word}.swal2-modal .swal2-buttonswrapper{margin-top:15px}.swal2-modal .swal2-buttonswrapper:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4;cursor:no-drop}.swal2-modal .swal2-buttonswrapper.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;border:4px solid transparent;border-color:transparent;width:40px;height:40px;padding:0;margin:7.5px;vertical-align:top;background-color:transparent!important;color:transparent;cursor:default;border-radius:100%;-webkit-animation:rotate-loading 1.5s linear 0s infinite normal;animation:rotate-loading 1.5s linear 0s infinite normal;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-modal .swal2-buttonswrapper.swal2-loading .swal2-styled.swal2-cancel{margin-left:30px;margin-right:30px}.swal2-modal .swal2-buttonswrapper.swal2-loading :not(.swal2-styled).swal2-confirm:after{display:inline-block;content:"";margin-left:5px 0 15px;vertical-align:-1px;height:15px;width:15px;border:3px solid #999;box-shadow:1px 1px 1px #fff;border-right-color:transparent;border-radius:50%;-webkit-animation:rotate-loading 1.5s linear 0s infinite normal;animation:rotate-loading 1.5s linear 0s infinite normal}.swal2-modal .swal2-styled{border:0;border-radius:3px;box-shadow:none;color:#fff;cursor:pointer;font-size:17px;font-weight:500;margin:15px 5px 0;padding:10px 32px}.swal2-modal .swal2-image{margin:20px auto;max-width:100%}.swal2-modal .swal2-close{background:transparent;border:0;margin:0;padding:0;width:38px;height:40px;font-size:36px;line-height:40px;font-family:serif;position:absolute;top:5px;right:8px;cursor:pointer;color:#ccc;transition:color .1s ease}.swal2-modal .swal2-close:hover{color:#d55}.swal2-modal>.swal2-checkbox,.swal2-modal>.swal2-file,.swal2-modal>.swal2-input,.swal2-modal>.swal2-radio,.swal2-modal>.swal2-select,.swal2-modal>.swal2-textarea{display:none}.swal2-modal .swal2-content{font-size:18px;text-align:center;font-weight:300;position:relative;float:none;margin:0;padding:0;line-height:normal;color:#545454;word-wrap:break-word}.swal2-modal .swal2-checkbox,.swal2-modal .swal2-file,.swal2-modal .swal2-input,.swal2-modal .swal2-radio,.swal2-modal .swal2-select,.swal2-modal .swal2-textarea{margin:20px auto}.swal2-modal .swal2-file,.swal2-modal .swal2-input,.swal2-modal .swal2-textarea{width:100%;box-sizing:border-box;font-size:18px;border-radius:3px;border:1px solid #d9d9d9;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);transition:border-color box-shadow .3s}.swal2-modal .swal2-file.swal2-inputerror,.swal2-modal .swal2-input.swal2-inputerror,.swal2-modal .swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-modal .swal2-file:focus,.swal2-modal .swal2-input:focus,.swal2-modal .swal2-textarea:focus{outline:none;border:1px solid #b4dbed;box-shadow:0 0 3px #c4e6f5}.swal2-modal .swal2-file:focus::-webkit-input-placeholder,.swal2-modal .swal2-input:focus::-webkit-input-placeholder,.swal2-modal .swal2-textarea:focus::-webkit-input-placeholder{transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file:focus:-ms-input-placeholder,.swal2-modal .swal2-input:focus:-ms-input-placeholder,.swal2-modal .swal2-textarea:focus:-ms-input-placeholder{transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file:focus::placeholder,.swal2-modal .swal2-input:focus::placeholder,.swal2-modal .swal2-textarea:focus::placeholder{transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file::-webkit-input-placeholder,.swal2-modal .swal2-input::-webkit-input-placeholder,.swal2-modal .swal2-textarea::-webkit-input-placeholder{color:#e6e6e6}.swal2-modal .swal2-file:-ms-input-placeholder,.swal2-modal .swal2-input:-ms-input-placeholder,.swal2-modal .swal2-textarea:-ms-input-placeholder{color:#e6e6e6}.swal2-modal .swal2-file::placeholder,.swal2-modal .swal2-input::placeholder,.swal2-modal .swal2-textarea::placeholder{color:#e6e6e6}.swal2-modal .swal2-range input{float:left;width:80%}.swal2-modal .swal2-range output{float:right;width:20%;font-size:20px;font-weight:600;text-align:center}.swal2-modal .swal2-range input,.swal2-modal .swal2-range output{height:43px;line-height:43px;vertical-align:middle;margin:20px auto;padding:0}.swal2-modal .swal2-input{height:43px;padding:0 12px}.swal2-modal .swal2-input[type=number]{max-width:150px}.swal2-modal .swal2-file{font-size:20px}.swal2-modal .swal2-textarea{height:108px;padding:12px}.swal2-modal .swal2-select{color:#545454;font-size:inherit;padding:5px 10px;min-width:40%;max-width:100%}.swal2-modal .swal2-radio{border:0}.swal2-modal .swal2-radio label:not(:first-child){margin-left:20px}.swal2-modal .swal2-radio input,.swal2-modal .swal2-radio span{vertical-align:middle}.swal2-modal .swal2-radio input{margin:0 3px 0 0}.swal2-modal .swal2-checkbox{color:#545454}.swal2-modal .swal2-checkbox input,.swal2-modal .swal2-checkbox span{vertical-align:middle}.swal2-modal .swal2-validationerror{background-color:#f0f0f0;margin:0 -20px;overflow:hidden;padding:10px;color:gray;font-size:16px;font-weight:300;display:none}.swal2-modal .swal2-validationerror:before{content:"!";display:inline-block;width:24px;height:24px;border-radius:50%;background-color:#ea7d7d;color:#fff;line-height:24px;text-align:center;margin-right:10px}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.swal2-range input{width:100%!important}.swal2-range output{display:none}}.swal2-icon{width:80px;height:80px;border:4px solid transparent;border-radius:50%;margin:20px auto 30px;padding:0;position:relative;box-sizing:content-box;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;display:block}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}.swal2-icon.swal2-warning{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#f8bb86;border-color:#facea8}.swal2-icon.swal2-info,.swal2-icon.swal2-warning{font-size:60px;line-height:80px;text-align:center}.swal2-icon.swal2-info{font-family:Open Sans,sans-serif;color:#3fc3ee;border-color:#9de0f6}.swal2-icon.swal2-question{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#87adbd;border-color:#c9dae1;font-size:60px;line-height:80px;text-align:center}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{border-radius:50%;position:absolute;width:60px;height:120px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px}.swal2-icon.swal2-success .swal2-success-ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal2-icon.swal2-success .swal2-success-fix{width:7px;height:90px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progresssteps{font-weight:600;margin:0 0 20px;padding:0}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{background:#3085d6;border-radius:2em;color:#fff;height:2em;line-height:2em;text-align:center;width:2em;z-index:20}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle,.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{background:#3085d6;height:.4em;margin:0 -1px;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes hideSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes hideSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}.swal2-show{-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:hideSweetAlert .15s forwards;animation:hideSweetAlert .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}@-webkit-keyframes animate-success-tip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animate-success-tip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animate-success-long{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animate-success-long{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}.swal2-animate-success-line-tip{-webkit-animation:animate-success-tip .75s;animation:animate-success-tip .75s}.swal2-animate-success-line-long{-webkit-animation:animate-success-long .75s;animation:animate-success-long .75s}.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}@-webkit-keyframes animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}.swal2-animate-error-icon{-webkit-animation:animate-error-icon .5s;animation:animate-error-icon .5s}@-webkit-keyframes animate-x-mark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animate-x-mark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal2-animate-x-mark{-webkit-animation:animate-x-mark .5s;animation:animate-x-mark .5s}@-webkit-keyframes rotate-loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate-loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}', ""])
    }, function (e, t) {
        e.exports = function () {
            var e = [];
            return e.toString = function () {
                for (var e = [], t = 0; t < this.length; t++) {
                    var n = this[t];
                    n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
                }
                return e.join("")
            }, e.i = function (t, n) {
                "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                for (var o = {}, a = 0; a < this.length; a++) {
                    var r = this[a][0];
                    "number" == typeof r && (o[r] = !0)
                }
                for (a = 0; a < t.length; a++) {
                    var i = t[a];
                    "number" == typeof i[0] && o[i[0]] || (n && !i[2] ? i[2] = n : n && (i[2] = "(" + i[2] + ") and (" + n + ")"), e.push(i))
                }
            }, e
        }
    }, function (e, t, n) {
        function o(e, t) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n],
                    a = f[o.id];
                if (a) {
                    a.refs++;
                    for (var r = 0; r < a.parts.length; r++) a.parts[r](o.parts[r]);
                    for (; r < o.parts.length; r++) a.parts.push(c(o.parts[r], t))
                } else {
                    for (var i = [], r = 0; r < o.parts.length; r++) i.push(c(o.parts[r], t));
                    f[o.id] = {
                        id: o.id,
                        refs: 1,
                        parts: i
                    }
                }
            }
        }

        function a(e) {
            for (var t = [], n = {}, o = 0; o < e.length; o++) {
                var a = e[o],
                    r = a[0],
                    i = a[1],
                    s = a[2],
                    l = a[3],
                    c = {
                        css: i,
                        media: s,
                        sourceMap: l
                    };
                n[r] ? n[r].parts.push(c) : t.push(n[r] = {
                    id: r,
                    parts: [c]
                })
            }
            return t
        }

        function r(e, t) {
            var n = g(),
                o = x[x.length - 1];
            if ("top" === e.insertAt) o ? o.nextSibling ? n.insertBefore(t, o.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), x.push(t);
            else {
                if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                n.appendChild(t)
            }
        }

        function i(e) {
            e.parentNode.removeChild(e);
            var t = x.indexOf(e);
            t >= 0 && x.splice(t, 1)
        }

        function s(e) {
            var t = document.createElement("style");
            return t.type = "text/css", r(e, t), t
        }

        function l(e) {
            var t = document.createElement("link");
            return t.rel = "stylesheet", r(e, t), t
        }

        function c(e, t) {
            var n, o, a;
            if (t.singleton) {
                var r = b++;
                n = h || (h = s(t)), o = u.bind(null, n, r, !1), a = u.bind(null, n, r, !0)
            } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = l(t), o = p.bind(null, n), a = function () {
                i(n), n.href && URL.revokeObjectURL(n.href)
            }) : (n = s(t), o = d.bind(null, n), a = function () {
                i(n)
            });
            return o(e),
                function (t) {
                    if (t) {
                        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                        o(e = t)
                    } else a()
                }
        }

        function u(e, t, n, o) {
            var a = n ? "" : o.css;
            if (e.styleSheet) e.styleSheet.cssText = v(t, a);
            else {
                var r = document.createTextNode(a),
                    i = e.childNodes;
                i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(r, i[t]) : e.appendChild(r)
            }
        }

        function d(e, t) {
            var n = t.css,
                o = t.media;
            if (o && e.setAttribute("media", o), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }

        function p(e, t) {
            var n = t.css,
                o = t.sourceMap;
            o && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
            var a = new Blob([n], {
                    type: "text/css"
                }),
                r = e.href;
            e.href = URL.createObjectURL(a), r && URL.revokeObjectURL(r)
        }
        var f = {},
            m = function (e) {
                var t;
                return function () {
                    return "undefined" == typeof t && (t = e.apply(this, arguments)), t
                }
            },
            w = m(function () {
                return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
            }),
            g = m(function () {
                return document.head || document.getElementsByTagName("head")[0]
            }),
            h = null,
            b = 0,
            x = [];
        e.exports = function (e, t) {
            t = t || {}, "undefined" == typeof t.singleton && (t.singleton = w()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
            var n = a(e);
            return o(n, t),
                function (e) {
                    for (var r = [], i = 0; i < n.length; i++) {
                        var s = n[i],
                            l = f[s.id];
                        l.refs--, r.push(l)
                    }
                    if (e) {
                        var c = a(e);
                        o(c, t)
                    }
                    for (var i = 0; i < r.length; i++) {
                        var l = r[i];
                        if (0 === l.refs) {
                            for (var u = 0; u < l.parts.length; u++) l.parts[u]();
                            delete f[l.id]
                        }
                    }
                }
        };
        var v = function () {
            var e = [];
            return function (t, n) {
                return e[t] = n, e.filter(Boolean).join("\n")
            }
        }()
    }, function (e, t, n) {
        var o = n(2);
        "string" == typeof o && (o = [
            [e.id, o, ""]
        ]);
        n(4)(o, {});
        o.locals && (e.exports = o.locals)
    }, function (e, t, n) {
        /*!
         * sweetalert2 v6.6.6
         * Released under the MIT License.
         */
        ! function (t, n) {
            e.exports = n()
        }(this, function () {
            "use strict";
            var e = {
                    title: "",
                    titleText: "",
                    text: "",
                    html: "",
                    type: null,
                    customClass: "",
                    target: "body",
                    animation: !0,
                    allowOutsideClick: !0,
                    allowEscapeKey: !0,
                    allowEnterKey: !0,
                    showConfirmButton: !0,
                    showCancelButton: !1,
                    preConfirm: null,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                    confirmButtonClass: null,
                    cancelButtonText: "Cancel",
                    cancelButtonColor: "#aaa",
                    cancelButtonClass: null,
                    buttonsStyling: !0,
                    reverseButtons: !1,
                    focusCancel: !1,
                    showCloseButton: !1,
                    showLoaderOnConfirm: !1,
                    imageUrl: null,
                    imageWidth: null,
                    imageHeight: null,
                    imageClass: null,
                    timer: null,
                    width: 500,
                    padding: 20,
                    background: "#fff",
                    input: null,
                    inputPlaceholder: "",
                    inputValue: "",
                    inputOptions: {},
                    inputAutoTrim: !0,
                    inputClass: null,
                    inputAttributes: {},
                    inputValidator: null,
                    progressSteps: [],
                    currentProgressStep: null,
                    progressStepsDistance: "40px",
                    onOpen: null,
                    onClose: null,
                    useRejections: !0
                },
                t = "swal2-",
                n = function (e) {
                    var n = {};
                    for (var o in e) n[e[o]] = t + e[o];
                    return n
                },
                o = n(["container", "shown", "iosfix", "modal", "overlay", "fade", "show", "hide", "noanimation", "close", "title", "content", "buttonswrapper", "confirm", "cancel", "icon", "image", "input", "file", "range", "select", "radio", "checkbox", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled"]),
                a = n(["success", "warning", "info", "question", "error"]),
                r = function (e, t) {
                    e = String(e).replace(/[^0-9a-f]/gi, ""), e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;
                    for (var n = "#", o = 0; o < 3; o++) {
                        var a = parseInt(e.substr(2 * o, 2), 16);
                        a = Math.round(Math.min(Math.max(0, a + a * t), 255)).toString(16), n += ("00" + a).substr(a.length)
                    }
                    return n
                },
                i = function (e) {
                    var t = [];
                    for (var n in e) t.indexOf(e[n]) === -1 && t.push(e[n]);
                    return t
                },
                s = {
                    previousWindowKeyDown: null,
                    previousActiveElement: null,
                    previousBodyPadding: null
                },
                l = function (e) {
                    if ("undefined" == typeof document) return void console.error("SweetAlert2 requires document to initialize");
                    var t = document.createElement("div");
                    t.className = o.container, t.innerHTML = c;
                    var n = document.querySelector(e.target);
                    n || (console.warn("SweetAlert2: Can't find the target \"" + e.target + '"'), n = document.body), n.appendChild(t);
                    var a = d(),
                        r = P(a, o.input),
                        i = P(a, o.file),
                        s = a.querySelector("." + o.range + " input"),
                        l = a.querySelector("." + o.range + " output"),
                        u = P(a, o.select),
                        p = a.querySelector("." + o.checkbox + " input"),
                        f = P(a, o.textarea);
                    return r.oninput = function () {
                        Y.resetValidationError()
                    }, r.onkeydown = function (t) {
                        setTimeout(function () {
                            13 === t.keyCode && e.allowEnterKey && (t.stopPropagation(), Y.clickConfirm())
                        }, 0)
                    }, i.onchange = function () {
                        Y.resetValidationError()
                    }, s.oninput = function () {
                        Y.resetValidationError(), l.value = s.value
                    }, s.onchange = function () {
                        Y.resetValidationError(), s.previousSibling.value = s.value
                    }, u.onchange = function () {
                        Y.resetValidationError()
                    }, p.onchange = function () {
                        Y.resetValidationError()
                    }, f.oninput = function () {
                        Y.resetValidationError()
                    }, a
                },
                c = ('\n <div role="dialog" aria-labelledby="' + o.title + '" aria-describedby="' + o.content + '" class="' + o.modal + '" tabindex="-1">\n   <ul class="' + o.progresssteps + '"></ul>\n   <div class="' + o.icon + " " + a.error + '">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="' + o.icon + " " + a.question + '">?</div>\n   <div class="' + o.icon + " " + a.warning + '">!</div>\n   <div class="' + o.icon + " " + a.info + '">i</div>\n   <div class="' + o.icon + " " + a.success + '">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="' + o.image + '" />\n   <h2 class="' + o.title + '" id="' + o.title + '"></h2>\n   <div id="' + o.content + '" class="' + o.content + '"></div>\n   <input class="' + o.input + '" />\n   <input type="file" class="' + o.file + '" />\n   <div class="' + o.range + '">\n     <output></output>\n     <input type="range" />\n   </div>\n   <select class="' + o.select + '"></select>\n   <div class="' + o.radio + '"></div>\n   <label for="' + o.checkbox + '" class="' + o.checkbox + '">\n     <input type="checkbox" />\n   </label>\n   <textarea class="' + o.textarea + '"></textarea>\n   <div class="' + o.validationerror + '"></div>\n   <div class="' + o.buttonswrapper + '">\n     <button type="button" class="' + o.confirm + '">OK</button>\n     <button type="button" class="' + o.cancel + '">Cancel</button>\n   </div>\n   <button type="button" class="' + o.close + '" aria-label="Close this dialog">×</button>\n </div>\n').replace(/(^|\n)\s*/g, ""),
                u = function () {
                    return document.body.querySelector("." + o.container)
                },
                d = function () {
                    return u() ? u().querySelector("." + o.modal) : null
                },
                p = function () {
                    var e = d();
                    return e.querySelectorAll("." + o.icon)
                },
                f = function (e) {
                    return u() ? u().querySelector("." + e) : null
                },
                m = function () {
                    return f(o.title)
                },
                w = function () {
                    return f(o.content)
                },
                g = function () {
                    return f(o.image)
                },
                h = function () {
                    return f(o.buttonswrapper)
                },
                b = function () {
                    return f(o.progresssteps)
                },
                x = function () {
                    return f(o.validationerror)
                },
                v = function () {
                    return f(o.confirm)
                },
                y = function () {
                    return f(o.cancel)
                },
                k = function () {
                    return f(o.close)
                },
                C = function (e) {
                    var t = [v(), y()];
                    e && t.reverse();
                    var n = t.concat(Array.prototype.slice.call(d().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, *[tabindex]:not([tabindex="-1"])')));
                    return i(n)
                },
                S = function (e, t) {
                    return !!e.classList && e.classList.contains(t)
                },
                A = function (e) {
                    if (e.focus(), "file" !== e.type) {
                        var t = e.value;
                        e.value = "", e.value = t
                    }
                },
                E = function (e, t) {
                    if (e && t) {
                        var n = t.split(/\s+/).filter(Boolean);
                        n.forEach(function (t) {
                            e.classList.add(t)
                        })
                    }
                },
                B = function (e, t) {
                    if (e && t) {
                        var n = t.split(/\s+/).filter(Boolean);
                        n.forEach(function (t) {
                            e.classList.remove(t)
                        })
                    }
                },
                P = function (e, t) {
                    for (var n = 0; n < e.childNodes.length; n++)
                        if (S(e.childNodes[n], t)) return e.childNodes[n]
                },
                L = function (e, t) {
                    t || (t = "block"), e.style.opacity = "", e.style.display = t
                },
                M = function (e) {
                    e.style.opacity = "", e.style.display = "none"
                },
                T = function (e) {
                    for (; e.firstChild;) e.removeChild(e.firstChild)
                },
                O = function (e) {
                    return e.offsetWidth || e.offsetHeight || e.getClientRects().length
                },
                q = function (e, t) {
                    e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(t)
                },
                H = function (e) {
                    if (!O(e)) return !1;
                    if ("function" == typeof MouseEvent) {
                        var t = new MouseEvent("click", {
                            view: window,
                            bubbles: !1,
                            cancelable: !0
                        });
                        e.dispatchEvent(t)
                    } else if (document.createEvent) {
                        var n = document.createEvent("MouseEvents");
                        n.initEvent("click", !1, !1), e.dispatchEvent(n)
                    } else document.createEventObject ? e.fireEvent("onclick") : "function" == typeof e.onclick && e.onclick()
                },
                V = function () {
                    var e = document.createElement("div"),
                        t = {
                            WebkitAnimation: "webkitAnimationEnd",
                            OAnimation: "oAnimationEnd oanimationend",
                            msAnimation: "MSAnimationEnd",
                            animation: "animationend"
                        };
                    for (var n in t)
                        if (t.hasOwnProperty(n) && void 0 !== e.style[n]) return t[n];
                    return !1
                }(),
                j = function () {
                    if (window.onkeydown = s.previousWindowKeyDown, s.previousActiveElement && s.previousActiveElement.focus) {
                        var e = window.scrollX,
                            t = window.scrollY;
                        s.previousActiveElement.focus(), e && t && window.scrollTo(e, t)
                    }
                },
                z = function () {
                    var e = "ontouchstart" in window || navigator.msMaxTouchPoints;
                    if (e) return 0;
                    var t = document.createElement("div");
                    t.style.width = "50px", t.style.height = "50px", t.style.overflow = "scroll", document.body.appendChild(t);
                    var n = t.offsetWidth - t.clientWidth;
                    return document.body.removeChild(t), n
                },
                N = function (e, t) {
                    var n = void 0;
                    return function () {
                        var o = function () {
                            n = null, e()
                        };
                        clearTimeout(n), n = setTimeout(o, t)
                    }
                },
                R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                } : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                U = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                    }
                    return e
                },
                I = U({}, e),
                K = [],
                D = void 0,
                W = function (t) {
                    var n = d() || l(t);
                    for (var r in t) e.hasOwnProperty(r) || "extraParams" === r || console.warn('SweetAlert2: Unknown parameter "' + r + '"');
                    n.style.width = "number" == typeof t.width ? t.width + "px" : t.width, n.style.padding = t.padding + "px", n.style.background = t.background;
                    for (var i = n.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), s = 0; s < i.length; s++) i[s].style.background = t.background;
                    var c = m(),
                        u = w(),
                        f = h(),
                        x = v(),
                        C = y(),
                        S = k();
                    if (t.titleText ? c.innerText = t.titleText : c.innerHTML = t.title.split("\n").join("<br />"), t.text || t.html) {
                        if ("object" === R(t.html))
                            if (u.innerHTML = "", 0 in t.html)
                                for (var A = 0; A in t.html; A++) u.appendChild(t.html[A].cloneNode(!0));
                            else u.appendChild(t.html.cloneNode(!0));
                        else t.html ? u.innerHTML = t.html : t.text && (u.textContent = t.text);
                        L(u)
                    } else M(u);
                    t.showCloseButton ? L(S) : M(S), n.className = o.modal, t.customClass && E(n, t.customClass);
                    var P = b(),
                        O = parseInt(null === t.currentProgressStep ? Y.getQueueStep() : t.currentProgressStep, 10);
                    t.progressSteps.length ? (L(P), T(P), O >= t.progressSteps.length && console.warn("SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), t.progressSteps.forEach(function (e, n) {
                        var a = document.createElement("li");
                        if (E(a, o.progresscircle), a.innerHTML = e, n === O && E(a, o.activeprogressstep), P.appendChild(a), n !== t.progressSteps.length - 1) {
                            var r = document.createElement("li");
                            E(r, o.progressline), r.style.width = t.progressStepsDistance, P.appendChild(r)
                        }
                    })) : M(P);
                    for (var H = p(), V = 0; V < H.length; V++) M(H[V]);
                    if (t.type) {
                        var j = !1;
                        for (var z in a)
                            if (t.type === z) {
                                j = !0;
                                break
                            } if (!j) return console.error("SweetAlert2: Unknown alert type: " + t.type), !1;
                        var N = n.querySelector("." + o.icon + "." + a[t.type]);
                        if (L(N), t.animation) switch (t.type) {
                            case "success":
                                E(N, "swal2-animate-success-icon"), E(N.querySelector(".swal2-success-line-tip"), "swal2-animate-success-line-tip"), E(N.querySelector(".swal2-success-line-long"), "swal2-animate-success-line-long");
                                break;
                            case "error":
                                E(N, "swal2-animate-error-icon"), E(N.querySelector(".swal2-x-mark"), "swal2-animate-x-mark")
                        }
                    }
                    var U = g();
                    t.imageUrl ? (U.setAttribute("src", t.imageUrl), L(U), t.imageWidth ? U.setAttribute("width", t.imageWidth) : U.removeAttribute("width"), t.imageHeight ? U.setAttribute("height", t.imageHeight) : U.removeAttribute("height"), U.className = o.image, t.imageClass && E(U, t.imageClass)) : M(U), t.showCancelButton ? C.style.display = "inline-block" : M(C), t.showConfirmButton ? q(x, "display") : M(x), t.showConfirmButton || t.showCancelButton ? L(f) : M(f), x.innerHTML = t.confirmButtonText, C.innerHTML = t.cancelButtonText, t.buttonsStyling && (x.style.backgroundColor = t.confirmButtonColor, C.style.backgroundColor = t.cancelButtonColor), x.className = o.confirm, E(x, t.confirmButtonClass), C.className = o.cancel, E(C, t.cancelButtonClass), t.buttonsStyling ? (E(x, o.styled), E(C, o.styled)) : (B(x, o.styled), B(C, o.styled), x.style.backgroundColor = x.style.borderLeftColor = x.style.borderRightColor = "", C.style.backgroundColor = C.style.borderLeftColor = C.style.borderRightColor = ""), t.animation === !0 ? B(n, o.noanimation) : E(n, o.noanimation)
                },
                _ = function (e, t) {
                    var n = u(),
                        a = d();
                    e ? (E(a, o.show), E(n, o.fade), B(a, o.hide)) : B(a, o.fade), L(a), n.style.overflowY = "hidden", V && !S(a, o.noanimation) ? a.addEventListener(V, function e() {
                        a.removeEventListener(V, e), n.style.overflowY = "auto"
                    }) : n.style.overflowY = "auto", E(document.documentElement, o.shown), E(document.body, o.shown), E(n, o.shown), X(), Z(), s.previousActiveElement = document.activeElement, null !== t && "function" == typeof t && setTimeout(function () {
                        t(a)
                    })
                },
                X = function () {
                    null === s.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (s.previousBodyPadding = document.body.style.paddingRight, document.body.style.paddingRight = z() + "px")
                },
                $ = function () {
                    null !== s.previousBodyPadding && (document.body.style.paddingRight = s.previousBodyPadding, s.previousBodyPadding = null)
                },
                Z = function () {
                    var e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                    if (e && !S(document.body, o.iosfix)) {
                        var t = document.body.scrollTop;
                        document.body.style.top = t * -1 + "px", E(document.body, o.iosfix)
                    }
                },
                Q = function () {
                    if (S(document.body, o.iosfix)) {
                        var e = parseInt(document.body.style.top, 10);
                        B(document.body, o.iosfix), document.body.style.top = "", document.body.scrollTop = e * -1
                    }
                },
                Y = function e() {
                    for (var t = arguments.length, n = Array(t), a = 0; a < t; a++) n[a] = arguments[a];
                    if (void 0 === n[0]) return console.error("SweetAlert2 expects at least 1 attribute!"), !1;
                    var i = U({}, I);
                    switch (R(n[0])) {
                        case "string":
                            i.title = n[0], i.html = n[1], i.type = n[2];
                            break;
                        case "object":
                            U(i, n[0]), i.extraParams = n[0].extraParams, "email" === i.input && null === i.inputValidator && (i.inputValidator = function (e) {
                                return new Promise(function (t, n) {
                                    var o = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                                    o.test(e) ? t() : n("Invalid email address")
                                })
                            }), "url" === i.input && null === i.inputValidator && (i.inputValidator = function (e) {
                                return new Promise(function (t, n) {
                                    var o = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/\/=]*)$/;
                                    o.test(e) ? t() : n("Invalid URL")
                                })
                            });
                            break;
                        default:
                            return console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' + R(n[0])), !1
                    }
                    W(i);
                    var l = u(),
                        c = d();
                    return new Promise(function (t, n) {
                        i.timer && (c.timeout = setTimeout(function () {
                            e.closeModal(i.onClose), i.useRejections ? n("timer") : t({
                                dismiss: "timer"
                            })
                        }, i.timer));
                        var a = function (e) {
                                if (e = e || i.input, !e) return null;
                                switch (e) {
                                    case "select":
                                    case "textarea":
                                    case "file":
                                        return P(c, o[e]);
                                    case "checkbox":
                                        return c.querySelector("." + o.checkbox + " input");
                                    case "radio":
                                        return c.querySelector("." + o.radio + " input:checked") || c.querySelector("." + o.radio + " input:first-child");
                                    case "range":
                                        return c.querySelector("." + o.range + " input");
                                    default:
                                        return P(c, o.input)
                                }
                            },
                            p = function () {
                                var e = a();
                                if (!e) return null;
                                switch (i.input) {
                                    case "checkbox":
                                        return e.checked ? 1 : 0;
                                    case "radio":
                                        return e.checked ? e.value : null;
                                    case "file":
                                        return e.files.length ? e.files[0] : null;
                                    default:
                                        return i.inputAutoTrim ? e.value.trim() : e.value
                                }
                            };
                        i.input && setTimeout(function () {
                            var e = a();
                            e && A(e)
                        }, 0);
                        for (var f = function (n) {
                                i.showLoaderOnConfirm && e.showLoading(), i.preConfirm ? i.preConfirm(n, i.extraParams).then(function (o) {
                                    e.closeModal(i.onClose), t(o || n)
                                }, function (t) {
                                    e.hideLoading(), t && e.showValidationError(t)
                                }) : (e.closeModal(i.onClose), t(i.useRejections ? n : {
                                    value: n
                                }))
                            }, S = function (o) {
                                var a = o || window.event,
                                    s = a.target || a.srcElement,
                                    l = v(),
                                    c = y(),
                                    u = l && (l === s || l.contains(s)),
                                    d = c && (c === s || c.contains(s));
                                switch (a.type) {
                                    case "mouseover":
                                    case "mouseup":
                                        i.buttonsStyling && (u ? l.style.backgroundColor = r(i.confirmButtonColor, -.1) : d && (c.style.backgroundColor = r(i.cancelButtonColor, -.1)));
                                        break;
                                    case "mouseout":
                                        i.buttonsStyling && (u ? l.style.backgroundColor = i.confirmButtonColor : d && (c.style.backgroundColor = i.cancelButtonColor));
                                        break;
                                    case "mousedown":
                                        i.buttonsStyling && (u ? l.style.backgroundColor = r(i.confirmButtonColor, -.2) : d && (c.style.backgroundColor = r(i.cancelButtonColor, -.2)));
                                        break;
                                    case "click":
                                        if (u && e.isVisible())
                                            if (e.disableButtons(), i.input) {
                                                var m = p();
                                                i.inputValidator ? (e.disableInput(), i.inputValidator(m, i.extraParams).then(function () {
                                                    e.enableButtons(), e.enableInput(), f(m)
                                                }, function (t) {
                                                    e.enableButtons(), e.enableInput(), t && e.showValidationError(t)
                                                })) : f(m)
                                            } else f(!0);
                                        else d && e.isVisible() && (e.disableButtons(), e.closeModal(i.onClose), i.useRejections ? n("cancel") : t({
                                            dismiss: "cancel"
                                        }))
                                }
                            }, T = c.querySelectorAll("button"), q = 0; q < T.length; q++) T[q].onclick = S, T[q].onmouseover = S, T[q].onmouseout = S, T[q].onmousedown = S;
                        k().onclick = function () {
                            e.closeModal(i.onClose), i.useRejections ? n("close") : t({
                                dismiss: "close"
                            })
                        }, l.onclick = function (o) {
                            o.target === l && i.allowOutsideClick && (e.closeModal(i.onClose), i.useRejections ? n("overlay") : t({
                                dismiss: "overlay"
                            }))
                        };
                        var V = h(),
                            j = v(),
                            z = y();
                        i.reverseButtons ? j.parentNode.insertBefore(z, j) : j.parentNode.insertBefore(j, z);
                        var U = function (e, t) {
                                for (var n = C(i.focusCancel), o = 0; o < n.length; o++) {
                                    e += t, e === n.length ? e = 0 : e === -1 && (e = n.length - 1);
                                    var a = n[e];
                                    if (O(a)) return a.focus()
                                }
                            },
                            I = function (o) {
                                var a = o || window.event,
                                    r = a.keyCode || a.which;
                                if ([9, 13, 32, 27, 37, 38, 39, 40].indexOf(r) !== -1) {
                                    for (var s = a.target || a.srcElement, l = C(i.focusCancel), c = -1, u = 0; u < l.length; u++)
                                        if (s === l[u]) {
                                            c = u;
                                            break
                                        } 9 === r ? (a.shiftKey ? U(c, -1) : U(c, 1), a.stopPropagation(), a.preventDefault()) : 37 === r || 38 === r || 39 === r || 40 === r ? document.activeElement === j && O(z) ? z.focus() : document.activeElement === z && O(j) && j.focus() : 13 === r || 32 === r ? c === -1 && i.allowEnterKey && (i.focusCancel ? H(z, a) : H(j, a), a.stopPropagation(), a.preventDefault()) : 27 === r && i.allowEscapeKey === !0 && (e.closeModal(i.onClose), i.useRejections ? n("esc") : t({
                                        dismiss: "esc"
                                    }))
                                }
                            };
                        window.onkeydown && window.onkeydown.toString() === I.toString() || (s.previousWindowKeyDown = window.onkeydown, window.onkeydown = I), i.buttonsStyling && (j.style.borderLeftColor = i.confirmButtonColor, j.style.borderRightColor = i.confirmButtonColor), e.hideLoading = e.disableLoading = function () {
                            i.showConfirmButton || (M(j), i.showCancelButton || M(h())), B(V, o.loading), B(c, o.loading), j.disabled = !1, z.disabled = !1
                        }, e.getTitle = function () {
                            return m()
                        }, e.getContent = function () {
                            return w()
                        }, e.getInput = function () {
                            return a()
                        }, e.getImage = function () {
                            return g()
                        }, e.getButtonsWrapper = function () {
                            return h()
                        }, e.getConfirmButton = function () {
                            return v()
                        }, e.getCancelButton = function () {
                            return y()
                        }, e.enableButtons = function () {
                            j.disabled = !1, z.disabled = !1
                        }, e.disableButtons = function () {
                            j.disabled = !0, z.disabled = !0
                        }, e.enableConfirmButton = function () {
                            j.disabled = !1
                        }, e.disableConfirmButton = function () {
                            j.disabled = !0
                        }, e.enableInput = function () {
                            var e = a();
                            if (!e) return !1;
                            if ("radio" === e.type)
                                for (var t = e.parentNode.parentNode, n = t.querySelectorAll("input"), o = 0; o < n.length; o++) n[o].disabled = !1;
                            else e.disabled = !1
                        }, e.disableInput = function () {
                            var e = a();
                            if (!e) return !1;
                            if (e && "radio" === e.type)
                                for (var t = e.parentNode.parentNode, n = t.querySelectorAll("input"), o = 0; o < n.length; o++) n[o].disabled = !0;
                            else e.disabled = !0
                        }, e.recalculateHeight = N(function () {
                            var e = d();
                            if (e) {
                                var t = e.style.display;
                                e.style.minHeight = "", L(e), e.style.minHeight = e.scrollHeight + 1 + "px", e.style.display = t
                            }
                        }, 50), e.showValidationError = function (e) {
                            var t = x();
                            t.innerHTML = e, L(t);
                            var n = a();
                            n && (A(n), E(n, o.inputerror))
                        }, e.resetValidationError = function () {
                            var t = x();
                            M(t), e.recalculateHeight();
                            var n = a();
                            n && B(n, o.inputerror)
                        }, e.getProgressSteps = function () {
                            return i.progressSteps
                        }, e.setProgressSteps = function (e) {
                            i.progressSteps = e, W(i)
                        }, e.showProgressSteps = function () {
                            L(b())
                        }, e.hideProgressSteps = function () {
                            M(b())
                        }, e.enableButtons(), e.hideLoading(), e.resetValidationError();
                        for (var K = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], X = void 0, $ = 0; $ < K.length; $++) {
                            var Z = o[K[$]],
                                Q = P(c, Z);
                            if (X = a(K[$])) {
                                for (var Y in X.attributes)
                                    if (X.attributes.hasOwnProperty(Y)) {
                                        var J = X.attributes[Y].name;
                                        "type" !== J && "value" !== J && X.removeAttribute(J)
                                    } for (var F in i.inputAttributes) X.setAttribute(F, i.inputAttributes[F])
                            }
                            Q.className = Z, i.inputClass && E(Q, i.inputClass), M(Q)
                        }
                        var G = void 0;
                        switch (i.input) {
                            case "text":
                            case "email":
                            case "password":
                            case "number":
                            case "tel":
                            case "url":
                                X = P(c, o.input), X.value = i.inputValue, X.placeholder = i.inputPlaceholder, X.type = i.input, L(X);
                                break;
                            case "file":
                                X = P(c, o.file), X.placeholder = i.inputPlaceholder, X.type = i.input, L(X);
                                break;
                            case "range":
                                var ee = P(c, o.range),
                                    te = ee.querySelector("input"),
                                    ne = ee.querySelector("output");
                                te.value = i.inputValue, te.type = i.input, ne.value = i.inputValue, L(ee);
                                break;
                            case "select":
                                var oe = P(c, o.select);
                                if (oe.innerHTML = "", i.inputPlaceholder) {
                                    var ae = document.createElement("option");
                                    ae.innerHTML = i.inputPlaceholder, ae.value = "", ae.disabled = !0, ae.selected = !0, oe.appendChild(ae)
                                }
                                G = function (e) {
                                    for (var t in e) {
                                        var n = document.createElement("option");
                                        n.value = t, n.innerHTML = e[t], i.inputValue === t && (n.selected = !0), oe.appendChild(n)
                                    }
                                    L(oe), oe.focus()
                                };
                                break;
                            case "radio":
                                var re = P(c, o.radio);
                                re.innerHTML = "", G = function (e) {
                                    for (var t in e) {
                                        var n = document.createElement("input"),
                                            a = document.createElement("label"),
                                            r = document.createElement("span");
                                        n.type = "radio", n.name = o.radio, n.value = t, i.inputValue === t && (n.checked = !0), r.innerHTML = e[t], a.appendChild(n), a.appendChild(r), a.for = n.id, re.appendChild(a)
                                    }
                                    L(re);
                                    var s = re.querySelectorAll("input");
                                    s.length && s[0].focus()
                                };
                                break;
                            case "checkbox":
                                var ie = P(c, o.checkbox),
                                    se = a("checkbox");
                                se.type = "checkbox", se.value = 1, se.id = o.checkbox, se.checked = Boolean(i.inputValue);
                                var le = ie.getElementsByTagName("span");
                                le.length && ie.removeChild(le[0]), le = document.createElement("span"), le.innerHTML = i.inputPlaceholder, ie.appendChild(le), L(ie);
                                break;
                            case "textarea":
                                var ce = P(c, o.textarea);
                                ce.value = i.inputValue, ce.placeholder = i.inputPlaceholder, L(ce);
                                break;
                            case null:
                                break;
                            default:
                                console.error('SweetAlert2: Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + i.input + '"')
                        }
                        "select" !== i.input && "radio" !== i.input || (i.inputOptions instanceof Promise ? (e.showLoading(), i.inputOptions.then(function (t) {
                            e.hideLoading(), G(t)
                        })) : "object" === R(i.inputOptions) ? G(i.inputOptions) : console.error("SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got " + R(i.inputOptions))), _(i.animation, i.onOpen), i.allowEnterKey ? U(-1, 1) : document.activeElement && document.activeElement.blur(), u().scrollTop = 0, "undefined" == typeof MutationObserver || D || (D = new MutationObserver(e.recalculateHeight), D.observe(c, {
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        }))
                    })
                };
            return Y.isVisible = function () {
                return !!d()
            }, Y.queue = function (e) {
                K = e;
                var t = function () {
                        K = [], document.body.removeAttribute("data-swal2-queue-step")
                    },
                    n = [];
                return new Promise(function (e, o) {
                    ! function a(r, i) {
                        r < K.length ? (document.body.setAttribute("data-swal2-queue-step", r), Y(K[r]).then(function (e) {
                            n.push(e), a(r + 1, i)
                        }, function (e) {
                            t(), o(e)
                        })) : (t(), e(n))
                    }(0)
                })
            }, Y.getQueueStep = function () {
                return document.body.getAttribute("data-swal2-queue-step")
            }, Y.insertQueueStep = function (e, t) {
                return t && t < K.length ? K.splice(t, 0, e) : K.push(e)
            }, Y.deleteQueueStep = function (e) {
                "undefined" != typeof K[e] && K.splice(e, 1)
            }, Y.close = Y.closeModal = function (e) {
                var t = u(),
                    n = d();
                if (n) {
                    B(n, o.show), E(n, o.hide), clearTimeout(n.timeout), j();
                    var a = function () {
                        t.parentNode && t.parentNode.removeChild(t), B(document.documentElement, o.shown), B(document.body, o.shown), $(), Q()
                    };
                    V && !S(n, o.noanimation) ? n.addEventListener(V, function e() {
                        n.removeEventListener(V, e), S(n, o.hide) && a()
                    }) : a(), null !== e && "function" == typeof e && setTimeout(function () {
                        e(n)
                    })
                }
            }, Y.clickConfirm = function () {
                return v().click()
            }, Y.clickCancel = function () {
                return y().click()
            }, Y.showLoading = Y.enableLoading = function () {
                var e = d();
                e || Y("");
                var t = h(),
                    n = v(),
                    a = y();
                L(t), L(n, "inline-block"), E(t, o.loading), E(e, o.loading), n.disabled = !0, a.disabled = !0
            }, Y.setDefaults = function (t) {
                if (!t || "object" !== ("undefined" == typeof t ? "undefined" : R(t))) return console.error("SweetAlert2: the argument for setDefaults() is required and has to be a object");
                for (var n in t) e.hasOwnProperty(n) || "extraParams" === n || (console.warn('SweetAlert2: Unknown parameter "' + n + '"'), delete t[n]);
                U(I, t)
            }, Y.resetDefaults = function () {
                I = U({}, e)
            }, Y.noop = function () {}, Y.version = "6.6.6", Y.default = Y, Y
        }), window.Sweetalert2 && (window.sweetAlert = window.swal = window.Sweetalert2)
    }])
});
//# sourceMappingURL=vue-sweetalert.js.map