"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
exports.generateReleaseId = () => __awaiter(this, void 0, void 0, function* () {
    if (process.env.GITHUB_REPO !== undefined) {
        const repo = process.env.GITHUB_REPO;
        console.log(repo);
        return isomorphic_fetch_1.default("//api.github.com/repos/" + repo + "/commits?branch=master")
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
            .then((commits) => {
            return `${commits[0].sha}-${Date.now()}`;
        });
    }
    else {
        return `${Date.now()}`;
    }
});
//# sourceMappingURL=generateReleaseId.js.map