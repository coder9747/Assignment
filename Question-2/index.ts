

import mongoose from "mongoose";

//schema
const WorkSnapTimeEntrySchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
    },
    timeEntries:
    {
        type: Object,
    }
});

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: "",
        validate:
        {
            validator: (val: string) => {
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
        validate:
        {
            validator: (val: string) => {
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
})
//models 
export const WorkSnapTimeEntryModel = mongoose.model("WorkSnapTimeEntry", WorkSnapTimeEntrySchema);
export const StudentModel = mongoose.model("Student", StudentSchema);


export const tempStudentsData = [{ firstName: "pratyush1", lastName: "karn1", displayName: "coder1", municipality: "unknown" }, { firstName: "pratyush2", lastName: "karn2", displayName: "coder2", municipality: "unknown" }, { firstName: "pratyush3", lastName: "karn3", displayName: "coder3", municipality: "unknown" }];


const dataBaseUrl = 'mongodb+srv://pratyushkarn007:gullyislove123@cluster0.gai8t14.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function FillData() {
    try {
        await Promise.all(tempStudentsData.map((student) => {
            const newSutdent = new StudentModel({ firstName: student.firstName, lastName: student.lastName, displayName: student.displayName, municipality: student.municipality });
            return newSutdent.save();
        }))
        console.log('Student Filled Succesful');
    } catch (error: any) {
        console.error(error.message);
    }

}

export async function connectToDataBase() {
    try {
        await mongoose.connect(dataBaseUrl as string);
        console.log("Database Connected Succesful");
    } catch (error) {
        console.log('Failed To Connect To DataBase');
    }

}
export async function showStudentTimeEntry() {
    try {
        const students = await StudentModel.find();
        for (const student of students) {
            console.log(` Work Time Snap of ${student.firstName} ${student.lastName}`)
            const workTimeSnapArray = await WorkSnapTimeEntryModel.find({ student: student._id });
            if (workTimeSnapArray.length) {
                workTimeSnapArray.forEach((workSnap) => {
                    console.log(workSnap.timeEntries);
                });
            }
        };

    } catch (error: any) {
        console.log(error.message);
    }
}


connectToDataBase().then(async () => {
    // await FillData();
    await showStudentTimeEntry();
}).catch(console.error);