"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDataBase = exports.FillData = void 0;
const constant_1 = require("./constant");
const Modals_1 = require("./Modals");
const dataBaseUrl = 'mongodb+srv://pratyushkarn007:gullyislove123@cluster0.gai8t14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
function FillData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all(constant_1.tempStudentsData.map((student) => {
                const newSutdent = new Modals_1.StudentModel(Object.assign({}, student));
                return newSutdent.save();
            }));
            console.log('Student Filled Succesful');
        }
        catch (error) {
            console.error(error.message);
        }
    });
}
exports.FillData = FillData;
function connectToDataBase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(dataBaseUrl);
            console.log("Database Connected Succesful");
        }
        catch (error) {
            console.log('Failed To Connect To DataBase');
        }
    });
}
exports.connectToDataBase = connectToDataBase;
