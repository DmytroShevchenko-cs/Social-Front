"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_hook_form_1 = require("react-hook-form");
var Typography_1 = require("@mui/material/Typography");
var TextField_1 = require("@mui/material/TextField");
var Paper_1 = require("@mui/material/Paper");
var Button_1 = require("@mui/material/Button");
var Link_1 = require("@mui/material/Link");
var Checkbox_1 = require("@mui/material/Checkbox");
var material_1 = require("@mui/material");
var CircularProgress_1 = require("@mui/material/CircularProgress");
var authPage_module_css_1 = require("../css/authPage.module.css");
var authService_1 = require("../services/authService");
var storeHook_1 = require("../myHooks/storeHook");
var AuthPage = function () {
    var _a, _b, _c, _d;
    var _e = react_1.useState(false), isLoginError = _e[0], setIsLoginError = _e[1];
    var _f = react_1.useState(""), loginError = _f[0], setLoginError = _f[1];
    var navigate = react_router_dom_1.useNavigate();
    var userLogin = storeHook_1.useActions().userLogin;
    var _g = react_hook_form_1.useForm({
        defaultValues: {
            login: "",
            password: "",
            isNeedToRemember: false
        },
        mode: "onChange"
    }), register = _g.register, handleSubmit = _g.handleSubmit, _h = _g.formState, errors = _h.errors, isValid = _h.isValid;
    var _j = authService_1.useLoginMutation(), login = _j[0], isLoading = _j[1].isLoading;
    var onSubmit = function (dataS) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoginError(false);
                    return [4 /*yield*/, login(dataS)
                            .unwrap()
                            .then(function (payload) {
                            userLogin(payload);
                            navigate("/");
                        })["catch"](function (error) {
                            if (error.status === 400) {
                                setIsLoginError(true);
                                setLoginError(error.data.Error);
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: authPage_module_css_1["default"].container }, isLoading ? (react_1["default"].createElement(CircularProgress_1["default"], { classes: { root: authPage_module_css_1["default"].progress } })) : (react_1["default"].createElement(Paper_1["default"], { elevation: 4, classes: { root: authPage_module_css_1["default"].root } },
        react_1["default"].createElement(Typography_1["default"], { classes: { root: authPage_module_css_1["default"].title }, variant: 'h5' }, "Login"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
            react_1["default"].createElement(TextField_1["default"], __assign({ error: Boolean((_a = errors.login) === null || _a === void 0 ? void 0 : _a.message), helperText: (_b = errors.login) === null || _b === void 0 ? void 0 : _b.message }, register("login", { required: "set login " }), { className: authPage_module_css_1["default"].field, label: 'Login', fullWidth: true })),
            react_1["default"].createElement(TextField_1["default"], __assign({ error: Boolean((_c = errors.password) === null || _c === void 0 ? void 0 : _c.message), helperText: (_d = errors.password) === null || _d === void 0 ? void 0 : _d.message, type: 'password' }, register("password", { required: "set password " }), { className: authPage_module_css_1["default"].field, label: 'Password', fullWidth: true })),
            react_1["default"].createElement("div", { className: authPage_module_css_1["default"].isRemember },
                react_1["default"].createElement(Checkbox_1["default"], __assign({}, register("isNeedToRemember"))),
                react_1["default"].createElement("p", null, "remember me")),
            react_1["default"].createElement(Button_1["default"], { disabled: !isValid, type: 'submit', size: 'large', variant: 'contained', fullWidth: true }, "login")),
        react_1["default"].createElement(Link_1["default"], { href: '/register', underline: 'none' },
            react_1["default"].createElement("p", null, "register")),
        isLoginError && (react_1["default"].createElement(material_1.Alert, { severity: 'error', onClose: function () { return setIsLoginError(false); } }, loginError))))));
};
exports["default"] = AuthPage;
