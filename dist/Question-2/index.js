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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showStudentTimeEntry = exports.connectToDataBase = exports.FillData = exports.tempStudentsData = exports.StudentModel = exports.WorkSnapTimeEntryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//schema
const WorkSnapTimeEntrySchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Student",
    },
    timeEntries: {
        type: Object,
    }
});
const StudentSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        default: "",
        validate: {
            validator: (val) => {
                return !!val;
            },
            message: () => 'Please Fill in your first name',
        },
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        default: "",
        validate: {
            validator: (val) => {
                return !!val;
            },
            message: () => 'Please Fill in your last name',
        },
        required: true,
    },
    displayName: {
        type: String,
        trim: true,
    },
    municipality: {
        type: String,
    }
});
//models 
exports.WorkSnapTimeEntryModel = mongoose_1.default.model("WorkSnapTimeEntry", WorkSnapTimeEntrySchema);
exports.StudentModel = mongoose_1.default.model("Student", StudentSchema);
exports.tempStudentsData = [{ firstName: "pratyush1", lastName: "karn1", displayName: "coder1", municipality: "unknown" }, { firstName: "pratyush2", lastName: "karn2", displayName: "coder2", municipality: "unknown" }, { firstName: "pratyush3", lastName: "karn3", displayName: "coder3", municipality: "unknown" }];
const dataBaseUrl = 'mongodb+srv://pratyushkarn007:gullyislove123@cluster0.gai8t14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
function FillData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all(exports.tempStudentsData.map((student) => {
                const newSutdent = new exports.StudentModel({ firstName: student.firstName, lastName: student.lastName, displayName: student.displayName, municipality: student.municipality });
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
            yield mongoose_1.default.connect(dataBaseUrl);
            console.log("Database Connected Succesful");
        }
        catch (error) {
            console.log('Failed To Connect To DataBase');
        }
    });
}
exports.connectToDataBase = connectToDataBase;
function showStudentTimeEntry() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const students = yield exports.StudentModel.find();
            for (const student of students) {
                console.log(` Work Time Snap of ${student.firstName} ${student.lastName}`);
                const workTimeSnapArray = yield exports.WorkSnapTimeEntryModel.find({ student: student._id });
                if (workTimeSnapArray.length) {
                    workTimeSnapArray.forEach((workSnap) => {
                        console.log(workSnap.timeEntries);
                    });
                }
            }
            ;
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
exports.showStudentTimeEntry = showStudentTimeEntry;
connectToDataBase().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // await FillData();
    yield showStudentTimeEntry();
})).catch(console.error);
