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
var authPage_module_css_1 = require("../css/authPage.module.css");
require("../scss/registePage.module.scss");
var material_1 = require("@mui/material");
var MenuItem_1 = require("@mui/material/MenuItem");
var User_1 = require("../types/User");
var Button_1 = require("@mui/material/Button");
var authService_1 = require("../services/authService");
var react_hook_form_1 = require("react-hook-form");
var react_router_1 = require("react-router");
var CustomWaitModal_1 = require("../components/CustomWaitModal");
var CustomModalWithText_1 = require("../components/CustomModalWithText");
var StringHelper_1 = require("../Helpers/StringHelper");
var RegisterPage = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var defaultProps = {
        borderColor: 'text.primary',
        m: 1,
        border: 0,
        borderRadius: 12,
        style: { width: '31rem', height: '83%' }
    };
    var navigate = react_router_1.useNavigate();
    var _o = react_hook_form_1.useForm({
        defaultValues: {
            login: "",
            password: "",
            profile: {
                avatarImage: "",
                birthday: new Date(),
                description: "",
                email: "",
                name: "",
                surname: "",
                sex: undefined
            }
        },
        mode: "onChange"
    }), register = _o.register, handleSubmit = _o.handleSubmit, getValues = _o.getValues, _p = _o.formState, errors = _p.errors, isValid = _p.isValid;
    var userRegister = authService_1.useUserRegisterMutation()[0];
    var OnSubmit = function (registerData) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setOpenWaitModal(true);
                    return [4 /*yield*/, userRegister(registerData)
                            .unwrap()
                            .then(function (payload) {
                            setOpenWaitModal(false);
                            setTextModal(true);
                            var email = getValues('profile.email');
                            setModalTextMeddage(StringHelper_1.StringHelper.format(EmailMessage, email));
                        })["catch"](function (error) {
                            var _a, _b, _c;
                            setOpenWaitModal(false);
                            setIsRegisterError(true);
                            console.log(typeof ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.errors));
                            setRegisterErrorText((_c = (_b = error === null || error === void 0 ? void 0 : error.data) === null || _b === void 0 ? void 0 : _b.errors) !== null && _c !== void 0 ? _c : { '': error.data.Error });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var _q = react_1.useState(false), openWaitModal = _q[0], setOpenWaitModal = _q[1];
    var _r = react_1.useState(false), openModalWithtext = _r[0], setTextModal = _r[1];
    var _s = react_1.useState(''), modalTextMessage = _s[0], setModalTextMeddage = _s[1];
    var _t = react_1.useState(false), isRegisterError = _t[0], setIsRegisterError = _t[1];
    var _u = react_1.useState({}), registerErrorText = _u[0], setRegisterErrorText = _u[1];
    var _v = react_1.useState(false), isRepeatPasswordEqual = _v[0], setIsRepeatPasswordEqual = _v[1];
    var handleRepeatPassword = function (e) {
        var passwordField = getValues('password');
        setIsRepeatPasswordEqual(e.target.value === passwordField);
    };
    var handleCloseTextModal = function () {
        setTextModal(false);
        navigate('/');
    };
    //TODO: In the future we will need to move this to the config to use i18 for translation.
    var firstNameLabel = 'First name';
    var LastNameLabel = 'Last name';
    var EmailLabel = "Email";
    var LoginLabel = "Login";
    var BirthdayLabel = "Birthday";
    //const SexLabel = "Sex";
    var PasswordLabel = "Password";
    var RepeatPasswordLabel = "Repeat password";
    var RegisterButtonLabel = "Register";
    var CancelLabel = "Cancel";
    var EmailMessage = "To authorize you need to confirm your email address {0}";
    return (react_1["default"].createElement("div", { className: authPage_module_css_1["default"].container },
        react_1["default"].createElement(CustomWaitModal_1["default"], { enable: openWaitModal }),
        react_1["default"].createElement(CustomModalWithText_1["default"], { handleClose: handleCloseTextModal, isOpen: openModalWithtext, text: modalTextMessage }),
        react_1["default"].createElement(material_1.Paper, __assign({ elevation: 4, classes: { root: authPage_module_css_1["default"].root } }, defaultProps),
            react_1["default"].createElement(material_1.Typography, { classes: { root: authPage_module_css_1["default"].title }, variant: 'h5' }, "Sign up"),
            react_1["default"].createElement("form", { onSubmit: handleSubmit(OnSubmit) },
                react_1["default"].createElement("div", { className: 'register-text-field-row' },
                    react_1["default"].createElement(material_1.TextField, __assign({ label: firstNameLabel, variant: 'outlined', error: Boolean((_b = (_a = errors.profile) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.message), helperText: (_c = errors.login) === null || _c === void 0 ? void 0 : _c.message }, register("profile.name", { required: "Set name " }))),
                    react_1["default"].createElement(material_1.TextField, __assign({ label: LastNameLabel, variant: 'outlined', error: Boolean((_d = errors.login) === null || _d === void 0 ? void 0 : _d.message), helperText: (_f = (_e = errors.profile) === null || _e === void 0 ? void 0 : _e.surname) === null || _f === void 0 ? void 0 : _f.message }, register("profile.surname", { required: "set surname " })))),
                react_1["default"].createElement("div", { className: 'register-text-field-row' },
                    react_1["default"].createElement(material_1.TextField, __assign({ label: EmailLabel, error: Boolean((_h = (_g = errors.profile) === null || _g === void 0 ? void 0 : _g.email) === null || _h === void 0 ? void 0 : _h.message), helperText: (_k = (_j = errors.profile) === null || _j === void 0 ? void 0 : _j.email) === null || _k === void 0 ? void 0 : _k.message }, register("profile.email", {
                        required: "set email", pattern: { value: emailRegex, message: "Enter a valid email" }
                    }), { type: 'Email' })),
                    react_1["default"].createElement(material_1.TextField, __assign({ label: LoginLabel, variant: 'outlined' }, register("login", { required: "set login" })))),
                react_1["default"].createElement("div", { className: 'register-text-field-row' },
                    react_1["default"].createElement("div", { className: "label-and-field" },
                        react_1["default"].createElement("label", null, BirthdayLabel),
                        react_1["default"].createElement(material_1.TextField, __assign({ type: 'date' }, register("profile.birthday", { required: "set birthday" })))),
                    react_1["default"].createElement(material_1.TextField, __assign({ select: true }, register("profile.sex", { required: "select sex" }), { label: "Select your sex", variant: 'outlined' }), Object.keys(User_1.Sex).map(function (key) { return (react_1["default"].createElement(MenuItem_1["default"], { key: key, value: key }, key)); }))),
                react_1["default"].createElement("div", { className: 'register-text-field-row' },
                    react_1["default"].createElement(material_1.TextField, __assign({ label: PasswordLabel, error: Boolean((_l = errors.password) === null || _l === void 0 ? void 0 : _l.message), helperText: (_m = errors.password) === null || _m === void 0 ? void 0 : _m.message, type: 'password', variant: 'outlined' }, register("password", { required: "set password", minLength: 8 }))),
                    react_1["default"].createElement(material_1.TextField, { label: RepeatPasswordLabel, name: RepeatPasswordLabel, onBlur: function (e) { return handleRepeatPassword(e); }, onChange: (function (e) { return handleRepeatPassword(e); }), helperText: (!isRepeatPasswordEqual && !StringHelper_1.IsNullOrEmpty(getValues('password'))) ? "Password isn't the same" : "", error: !isRepeatPasswordEqual && !StringHelper_1.IsNullOrEmpty(getValues('password')), type: 'password', variant: 'outlined' })),
                react_1["default"].createElement("div", { className: 'register-text-field-row' },
                    react_1["default"].createElement(Button_1["default"], { disabled: !isValid || !isRepeatPasswordEqual, type: 'submit', color: 'success', variant: 'contained' }, RegisterButtonLabel),
                    react_1["default"].createElement(Button_1["default"], { onClick: function (e) { return navigate("/"); }, variant: 'contained' }, CancelLabel))),
            isRegisterError && (react_1["default"].createElement("div", { className: 'alert-container' },
                react_1["default"].createElement(material_1.Alert, { variant: 'filled', severity: 'error', onClose: function () { return setIsRegisterError(false); } }, Object.keys(registerErrorText).map(function (key, index) { return (react_1["default"].createElement("div", { key: index },
                    react_1["default"].createElement("span", { key: index },
                        " ",
                        StringHelper_1.IsNullOrEmpty(key) ? '' : key.split('.').pop() + ": ",
                        registerErrorText[key]))); })))))));
};
exports["default"] = RegisterPage;
