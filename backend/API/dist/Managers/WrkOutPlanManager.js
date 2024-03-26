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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { WrkOutPlan } from '../Models/WrkOutPlan.js';
import { OkResponse } from '../utils/RequestUtility/CustomResponces/OkResponse.js';
import { CreatedResponse } from '../utils/RequestUtility/CustomResponces/CreatedResponse.js';
import { FailedResponse } from '../utils/RequestUtility/CustomResponces/FailedResponse.js';
import { WrkOutPlanDAO } from '../ORM/AccessModels/WrkOutPlanDAO.js';
export var FindAllWrkOutPlans = function () { return __awaiter(void 0, void 0, void 0, function () {
    var wrkOutPlanDao, body, results, _i, body_1, b, a, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                wrkOutPlanDao = new WrkOutPlanDAO();
                return [4 /*yield*/, wrkOutPlanDao.SelectAllWrkOutPlans()];
            case 1:
                body = _a.sent();
                results = [];
                for (_i = 0, body_1 = body; _i < body_1.length; _i++) {
                    b = body_1[_i];
                    a = new WrkOutPlan(b);
                    results.push(a);
                }
                return [2 /*return*/, new OkResponse("We good", results)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, new FailedResponse("Cannot get any of these things :(")];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var FindWrkOutPlanById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var wrkOutPlanDao, body, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                wrkOutPlanDao = new WrkOutPlanDAO();
                return [4 /*yield*/, wrkOutPlanDao.SelectWrkOutPlanById(id)];
            case 1:
                body = _a.sent();
                console.log(body);
                result = new WrkOutPlan(body);
                return [2 /*return*/, new OkResponse("We good", result)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, new FailedResponse("Cannot get any of these things :(")];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var CreateWrkOutPlan = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var result, wrkOutPlanDao, successResult, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                wrkOutPlanDao = new WrkOutPlanDAO();
                return [4 /*yield*/, wrkOutPlanDao.InsertWrkOutPlan(body)];
            case 1:
                result = _a.sent();
                successResult = result;
                return [2 /*return*/, new CreatedResponse("Successfully created an ExerciseType", successResult.Body)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, new FailedResponse('Sadge')];
            case 3: return [2 /*return*/];
        }
    });
}); };