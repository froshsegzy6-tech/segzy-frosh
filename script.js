document.addEventListener("DOMContentLoaded", function () {
    console.log("School Portal Loaded Successfully!");

    alert("Welcome to the School Portal!");
});
function calculateResult(){

let math=Number(document.getElementById("math").value)||0;
let english=Number(document.getElementById("english").value)||0;
let physics=Number(document.getElementById("physics").value)||0;
let chemistry=Number(document.getElementById("chemistry").value)||0;
let biology=Number(document.getElementById("biology").value)||0;

let total=math+english+physics+chemistry+biology;
let average=total/5;

let grade="";
let remark="";

if(average>=70){
grade="A";
remark="Excellent";
}else if(average>=60){
grade="B";
remark="Very Good";
}else if(average>=50){
grade="C";
remark="Good";
}else if(average>=45){
grade="D";
remark="Pass";
}else{
grade="F";
remark="Fail";
}

document.getElementById("total").innerHTML=total;
document.getElementById("average").innerHTML=average.toFixed(2);
document.getElementById("grade").innerHTML=grade;
document.getElementById("remark").innerHTML=remark;

}
function payNow(){

document.getElementById("status").innerHTML="✅ Payment Successful";

alert("Payment Successful!");

}
function searchBook(){

let book=document.getElementById("searchBook").value;

if(book===""){
alert("Please enter a book title.");
}
else{
alert("Searching for: "+book);
}

}
function saveAttendance(){

let checkboxes=document.querySelectorAll("input[type='checkbox']");

let present=0;

checkboxes.forEach(function(box){

if(box.checked){
present++;
}

});

let absent=checkboxes.length-present;

document.getElementById("present").innerHTML=present;

document.getElementById("absent").innerHTML=absent;

alert("Attendance saved successfully!");

}
function publishAssignment(){

let title=document.getElementById("title").value;

let deadline=document.getElementById("deadline").value;

if(title===""){
alert("Please enter an assignment title.");
return;
}

let list=document.getElementById("assignmentList");

if(list.innerHTML.includes("No assignments")){
list.innerHTML="";
}

let item=document.createElement("li");

item.innerHTML=title+" (Deadline: "+deadline+")";

list.appendChild(item);

alert("Assignment published successfully!");

}
document.querySelector("button").addEventListener("click", function () {
    alert("Profile editing feature will be available in the next version.");
});
function registerCourses(){

const checkboxes=document.querySelectorAll("input[type='checkbox']");
const list=document.getElementById("registeredCourses");

list.innerHTML="";

let count=0;

checkboxes.forEach(course=>{

if(course.checked){

let li=document.createElement("li");
li.textContent=course.value;

list.appendChild(li);

count++;

}

});

if(count===0){

list.innerHTML="<li>No subjects registered.</li>";

alert("Please select at least one subject.");

}else{

alert("Course registration completed successfully!");

}

}
function clearNotifications(){

const list=document.getElementById("notificationList");

list.innerHTML="<li>No new notifications.</li>";

alert("Notifications cleared.");

}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const resultRoutes = require("./routes/results");
const feeRoutes = require("./routes/fees");

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/fees", feeRoutes);

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Alpha School Portal API"
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
        console.log("Server running on port 5000");
    });

})
.catch(err => console.log(err));
PORT=5000

MONGO_URI=mongodb://localhost:27017/alpha_school_portal

JWT_SECRET=alphaschoolportal2026
{
  "name": "alpha-school-portal",
  "version": "1.0.0",
  "description": "School Management System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.1",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.15.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
const mongoose = require("mongoose");

const connectDB = async () => {

    try{

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database Connected");

    }catch(err){

        console.log(err);

        process.exit(1);

    }

};

module.exports = connectDB;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student"
    },

    phone: {
        type: String
    },

    admissionNumber: {
        type: String
    },

    department: {
        type: String
    },

    profileImage: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    className:String,

    level:String,

    session:String,

    attendance:{
        type:Number,
        default:0
    },

    gpa:{
        type:Number,
        default:0
    }

});

module.exports = mongoose.model("Student",StudentSchema);
const mongoose=require("mongoose");

const TeacherSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    department:String,

    qualification:String,

    subjects:[String]

});

module.exports=mongoose.model("Teacher",TeacherSchema);
const mongoose=require("mongoose");

const ResultSchema=new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },

    subject:String,

    score:Number,

    grade:String,

    term:String,

    session:String

});

module.exports=mongoose.model("Result",ResultSchema);
const mongoose=require("mongoose");

const FeeSchema=new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },

    amount:Number,

    status:{
        type:String,
        default:"Pending"
    },

    paymentDate:Date

});

module.exports=mongoose.model("Fee",FeeSchema);
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            role,
            phone,
            admissionNumber,
            department
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
            phone,
            admissionNumber,
            department
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Login
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            token,
            user
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    const token = req.header("Authorization");

    if (!token) {

        return res.status(401).json({
            message: "Access denied"
        });

    }

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verified;

        next();

    } catch {

        return res.status(400).json({
            message: "Invalid token"
        });

    }

};
const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all students
router.get("/", auth, async (req, res) => {
    try {
        const students = await Student.find().populate("user");
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one student
router.get("/:id", auth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate("user");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create student
router.post("/", auth, async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json(student);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update student
router.put("/:id", auth, async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(student);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

// Delete student
router.delete("/:id", auth, async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student deleted successfully"
        });

    } catch (err) {

        res.status(500).json({ error: err.message });

    }

});

module.exports = router;
const express = require("express");
const Teacher = require("../models/Teacher");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all teachers
router.get("/", auth, async (req, res) => {

    const teachers = await Teacher.find().populate("user");

    res.json(teachers);

});

// Create teacher
router.post("/", auth, async (req, res) => {

    const teacher = new Teacher(req.body);

    await teacher.save();

    res.json(teacher);

});

module.exports = router;
const express = require("express");
const Result = require("../models/Result");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all results
router.get("/", auth, async (req, res) => {

    const results = await Result.find().populate("student");

    res.json(results);

});

// Add result
router.post("/", auth, async (req, res) => {

    const result = new Result(req.body);

    await result.save();

    res.json(result);

});

module.exports = router;
const express = require("express");
const Fee = require("../models/Fee");
const auth = require("../middleware/auth");

const router = express.Router();

// Get fees
router.get("/", auth, async (req, res) => {

    const fees = await Fee.find().populate("student");

    res.json(fees);

});

// Record payment
router.post("/", auth, async (req, res) => {

    const fee = new Fee(req.body);

    await fee.save();

    res.json(fee);

});

module.exports = router;
const API_URL = "http://localhost:5000/api/auth";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        admissionNumber: document.getElementById("admissionNumber").value,
        department: document.getElementById("department").value,
        role: "student"
    };

    try {

        const response = await fetch(API_URL + "/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        alert(result.message);

        if(response.ok){
            window.location.href = "login.html";
        }

    } catch(err){
     alert("server error");
   }
 }).,
       const API_URL = "http://localhost:5000/api/auth";

const form = document.querySelector("form");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const response=await fetch(API_URL+"/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

});

const result=await response.json();

if(result.token){

localStorage.setItem("token",result.token);

localStorage.setItem("user",JSON.stringify(result.user));

window.location="dashboard.html";

}else{

alert(result.message);

}

});
module.exports = function (...roles) {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                message: "Access denied."
            });

        }

        next();

    };

};
const role = require("../middleware/role");

// Only admins can create students
router.post("/", auth, role("admin"), async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.status(201).json(student);

    } catch (err) {

        res.status(500).json({
            error:
});
const role = require("../middleware/role");

// Teachers and admins can add results
router.post("/", auth, role("teacher", "admin"), async (req, res) => {

    try {

        const result = new Result(req.body);

        await result.save();

        res.status(201).json(result);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
const role = require("../middleware/role");

// Only admin can record payments
router.post("/", auth, role("admin"), async (req, res) => {

    try {

        const fee = new Fee(req.body);

        await fee.save();

        res.status(201).json(fee);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});
const profileRoutes = require("./routes/profile");

app.use("/api/profile", profileRoutes);
npm install multer
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = /jpg|jpeg|png|gif|pdf|doc|docx/;

    const extension = allowed.test(
        path.extname(file.originalname).toLowerCase()
    );

    if(extension){
        cb(null, true);
    }else{
        cb(new Error("Unsupported file type."));
    }

};

module.exports = multer({
    storage,
    fileFilter
});
uploads/
const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
    "/profile",
    auth,
    upload.single("image"),
    (req, res) => {

        res.json({
            message: "Profile picture uploaded successfully.",
            filename: req.file.filename,
            path: "/uploads/" + req.file.filename
        });

    }
);

router.post(
    "/assignment",
    auth,
    upload.single("assignment"),
    (req, res) => {

        res.json({
            message: "Assignment uploaded successfully.",
            filename: req.file.filename,
            path: "/uploads/" + req.file.filename
        });

    }
);

module.exports = router;
const path = require("path");

const uploadRoutes = require("./routes/upload");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/upload", uploadRoutes);
npm install socket.io
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log("Joined Room:", room);
    });

    socket.on("sendMessage", (data) => {

        io.to(data.room).emit("receiveMessage", {
            sender: data.sender,
            message: data.message,
            time: new Date()
        });

    });

    socket.on("disconnect", () => {
       console.log("User Disconnected");
    });

});
server.listen(process.env.PORT || 5000, () => {
    console.log("Server Running...");
});
const socket = io("http://localhost:5000");

const room = "SS2A";

socket.emit("joinRoom", room);

socket.on("receiveMessage", (data) => {

    const messages = document.getElementById("messages");

    messages.innerHTML += `
        <p>
            <strong>${data.sender}</strong>:
            ${data.message}
        </p>
    `;

});

function sendMessage(){

    const input = document.getElementById("message");

    socket.emit("sendMessage",{

        room: room,

        sender: "Student",

        message: input.value

    });

    input.value="";

}
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    room: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Message", MessageSchema);
const questions=[

{
question:"What is 2 + 2?",
options:["2","3","4","5"],
answer:"4"
},

{
question:"Capital of Nigeria?",
options:["Lagos","Abuja","Kano","Ibadan"],
answer:"Abuja"
},

{
question:"Which planet is known as the Red Planet?",
options:["Earth","Mars","Venus","Jupiter"],
answer:"Mars"
},

{
question:"HTML stands for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"High Text Machine Language",
"Hyper Tool Machine Language"
],
answer:"Hyper Text Markup Language"
}

];

let current=0;
let score=0;

function loadQuestion(){

const q=questions[current];

document.getElementById("question").innerHTML=q.question;

document.getElementById("currentQuestion").innerHTML=current+1;

document.getElementById("totalQuestion").innerHTML=questions.length;

const options=document.getElementById("options");

options.innerHTML="";

q.options.forEach(option=>{

const div=document.createElement("div");

div.className="option";

div.innerHTML=option;

div.onclick=function(){

if(option===q.answer){

score++;

document.getElementById("score").innerHTML=score;

}

nextQuestion();

};

options.appendChild(div);

});

}

function nextQuestion(){

current++;

if(current>=questions.length){

alert("Exam Completed!\nYour Score: "+score+"/"+questions.length);

location.reload();

return;

}

loadQuestion();

}

loadQuestion();

let time=1800;

setInterval(function(){

let min=Math.floor(time/60);

let sec=time%60;

document.getElementById("timer").innerHTML=
String(min).padStart(2,"0")+":"+
String(sec).padStart(2,"0");

time--;

if(time<0){

alert("Time Up!");

location.reload();

}

},1000);
const mongoose=require("mongoose");

const ExamSchema=new mongoose.Schema({

title:{
type:String,
required:true
},

subject:{
type:String,
required:true
},

duration:{
type:Number,
required:true
},

questions:[{

question:String,

options:[String],

answer:String

}],

createdAt:{
type:Date,
default:Date.now
}

});

module.exports=mongoose.model("Exam",ExamSchema);
const express=require("express");
const Exam=require("../models/Exam");
const auth=require("../middleware/auth");
const role=require("../middleware/role");

const router=express.Router();

// Get all exams
router.get("/",auth,async(req,res)=>{

const exams=await Exam.find();

res.json(exams);

});

// Create an exam (teachers and admins)
router.post("/",auth,role("teacher","admin"),async(req,res)=>{

const exam=new Exam(req.body);

await exam.save();

res.status(201).json(exam);


});

module.exports=router;
const examRoutes = require("./routes/exams");

app.use("/api/exams", examRoutes);
document.addEventListener("DOMContentLoaded", () => {

console.log("Parent Portal Loaded");

alert("Welcome to the Parent Portal.");

});
const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

student:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student",
required:true
},

relationship:{
type:String,
required:true
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Parent", ParentSchema);
const express = require("express");
const Parent = require("../models/Parent");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all parent records
router.get("/", auth, async (req, res) => {

try{

const parents = await Parent.find()
.populate("user")
.populate("student");

res.json(parents);

}catch(err){

res.status(500).json({
error:err.message
});

}

});

// Register parent
router.post("/", auth, async (req, res) => {

try{

const parent = new Parent(req.body);

await parent.save();

res.status(201).json(parent);

}catch(err){

res.status(500).json({
error:err.message
});

}

});

module.exports = router;
const parentRoutes = require("./routes/parents");

app.use("/api/parents", parentRoutes);
document.getElementById("admissionForm").addEventListener("submit", function(e){

e.preventDefault();

alert("Admission application submitted successfully.");

this.reset();

});
const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({

fullName:{
type:String,
required:true
},

email:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

dob:{
type:Date,
required:true
},

classApplied:{
type:String,
required:true
},

address:{
type:String
},

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Admission", AdmissionSchema);
const express = require("express");
const Admission = require("../models/Admission");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Submit admission application
router.post("/", async (req, res) => {

try{

const admission = new Admission(req.body);

await admission.save();

res.status(201).json(admission);

}catch(err){

res.status(500).json({
error:err.message
});

}

});

// Get all applications (Admin only)
router.get("/", auth, role("admin"), async (req, res) => {

try{

const admissions = await Admission.find();

res.json(admissions);

}catch(err){

res.status(500).json({
error:err.message
});

}

});

module.exports = router;
const admissionRoutes = require("./routes/admissions");

app.use("/api/admissions", admissionRoutes);
document.getElementById("payrollForm").addEventListener("submit", function(e){

e.preventDefault();

const salary = Number(document.getElementById("basicSalary").value);
const allowance = Number(document.getElementById("allowance").value);
const deduction = Number(document.getElementById("deduction").value);

const netSalary = salary + allowance - deduction;

document.getElementById("salary").textContent = salary.toLocaleString();
document.getElementById("allow").textContent = allowance.toLocaleString();
document.getElementById("deduct").textContent = deduction.toLocaleString();
document.getElementById("netSalary").textContent = netSalary.toLocaleString();

alert("Payroll calculated successfully.");

});
const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema({

staff:{
type:mongoose.Schema.Types.ObjectId,
ref:"Teacher",
required:true
},

basicSalary:{
type:Number,
required:true
},

allowance:{
type:Number,
default:0
},

deduction:{
type:Number,
default:0
},

netSalary:{
type:Number,
required:true
},

month:{
type:String,
required:true
},

year:{
type:Number,
required:true
},

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Payroll", PayrollSchema);
const express = require("express");
const Payroll = require("../models/Payroll");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Get all payroll records
router.get("/", auth, role("admin"), async (req, res) => {

try{

const payroll = await Payroll.find().populate("staff");

res.json(payroll);

}catch(err){

res.status(500).json({error:err.message});

}

});

// Create payroll record
router.post("/", auth, role("admin"), async (req, res) => {

try{

const payroll = new Payroll(req.body);

await payroll.save();

res.status(201).json(payroll);

}catch(err){

res.status(500).json({error:err.message});

}

});

module.exports = router;
const payrollRoutes = require("./routes/payroll");

app.use("/api/payroll", payrollRoutes);
npm install pdfkit
const mongoose = require("mongoose");

const ReportCardSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    session: String,

    term: String,

    total: Number,

    average: Number,

    grade: String,

    position: String,

    remarks: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("ReportCard", ReportCardSchema);
const PDFDocument = require("pdfkit");
const ReportCard = require("../models/ReportCard");

exports.generateReport = async (req, res) => {

    const report = await ReportCard.findById(req.params.id)
        .populate({
            path: "student",
            populate: {
                path: "user"
            }
        });

    if (!report) {
        return res.status(404).json({
            message: "Report not found"
        });
    }

    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        "inline; filename=report-card.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text("ALPHA SCHOOL", {
        align: "center"
    });

    doc.moveDown();

    doc.fontSize(16).text("Student Report Card");

    doc.moveDown();

    doc.text(
        "Student: " +
        report.student.user.fullName
    );

    doc.text("Session: " + report.session);

    doc.text("Term: " + report.term);

    doc.text("Total: " + report.total);

    doc.text("Average: " + report.average);

    doc.text("Grade: " + report.grade);

    doc.text("Position: " + report.position);

    doc.text("Remarks: " + report.remarks);

    doc.end();

};
const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const ReportCard = require("../models/ReportCard");

const {
    generateReport
} = require("../controllers/reportController");

const router = express.Router();

// Create report card
router.post("/", auth, role("teacher", "admin"), async (req, res) => {

    const report = new ReportCard(req.body);

    await report.save();

    res.status(201).json(report);

});

// Generate PDF
router.get("/:id/pdf", auth, generateReport);

module.exports = router;
const reportRoutes = require("./routes/reportCards");

app.use("/api/report-cards", reportRoutes);
const reportId = "YOUR_REPORT_ID";

document
.getElementById("downloadPDF")
.addEventListener("click", () => {

    window.open(
        "http://localhost:5000/api/report-cards/" +
        reportId +
        "/pdf"
    );

});
const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Admission = require("../models/Admission");
const Fee = require("../models/Fee");

const router = express.Router();

router.get("/", auth, role("admin"), async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalAdmissions = await Admission.countDocuments();

        const paidFees = await Fee.countDocuments({
            status: "Paid"
        });

        const pendingFees = await Fee.countDocuments({
            status: "Pending"
        });

        res.json({
            totalUsers,
            totalStudents,
            totalTeachers,
            totalAdmissions,
            paidFees,
            pendingFees
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;
const analyticsRoutes = require("./routes/analytics");

app.use("/api/analytics", analyticsRoutes);
const token = localStorage.getItem("token");

fetch("http://localhost:5000/api/analytics",{

headers:{
Authorization:token
}

})

.then(res=>res.json())

.then(data=>{

document.getElementById("students").innerHTML=data.totalStudents;

document.getElementById("teachers").innerHTML=data.totalTeachers;

document.getElementById("admissions").innerHTML=data.totalAdmissions;

document.getElementById("users").innerHTML=data.totalUsers;

const ctx=document.getElementById("chart");

new Chart(ctx,{

type:"bar",

data:{

labels:["Students","Teachers","Admissions"],

datasets:[{

label:"School Statistics",

data:[
data.totalStudents,
data.totalTeachers,
data.totalAdmissions
]

}]

}

});

});
npm install nodemailer crypto
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    });
};

module.exports = sendEmail;
PORT=5000

MONGO_URI=mongodb://localhost:27017/alpha_school_portal

JWT_SECRET=YourVeryStrongSecretKey2026

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:3000
verificationToken: String,

resetPasswordToken: String,

resetPasswordExpires: Date,

isVerified: {
    type: Boolean,
    default: false
},
const express = require("express");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/email");

const router = express.Router();

// Forgot Password
router.post("/forgot", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;

    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const link =
        `${process.env.CLIENT_URL}/reset-password.html?token=${token}`;

    await sendEmail(
        user.email,
        "Reset Password",
        `<a href="${link}">Reset Password</a>`
    );

    res.json({
        message: "Reset email sent."
    });

});

module.exports = router;
const passwordRoutes = require("./routes/password");

app.use("/api/password", passwordRoutes);
document.getElementById("forgotForm")
.addEventListener("submit", async (e) => {

e.preventDefault();

const email =
document.getElementById("email").value;

const response = await fetch(
"http://localhost:5000/api/password/forgot",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email})

});

const result = await response.json();

alert(result.message);
npm install express-validator
const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();

};
const { body } = require("express-validator");
const validate = require("../middleware/validate");
router.post(
    "/register",

    [
        body("fullName")
            .notEmpty()
            .withMessage("Full name is required"),

        body("email")
            .isEmail()
            .withMessage("Invalid email address"),

        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters")
    ],

    validate,

    async (req, res) => {

        // Existing registration code

    }
);
router.post(
    "/login",

    [
        body("email").isEmail(),
        body("password").notEmpty()
    ],

    validate,

    async (req, res) => {

        // Existing login code

    }
);
server/middleware/errorHandler.js
module.exports = (err, req, res, next) => {

    console.error(err.stack);

    res.status(err.status || 500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

};
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
npm install helmet express-rate-limit compression
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

app.use(helmet());

app.use(compression());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
