import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors"
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";

// Routes
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((req,res,next)=>{

const token = req.cookies.token;

if(token){

try{

const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);

res.locals.user = decoded;

}
catch(error){

res.locals.user = null;

}

}
else{

res.locals.user = null;

}

next();

});
// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// EJS setup
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));


// Routes
app.use("/auth", authRoutes);
app.use("/lost-found", lostFoundRoutes);
app.use("/products", productRoutes);
app.use("/services", serviceRoutes);
app.use("/profiles", profileRoutes);
app.use("/claims", claimRoutes);
app.use("/dashboard", dashboardRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("layouts/main");
});

//login route
app.get("/login", (req, res) => {
    res.render("pages/login");
});

//register route
app.get("/register", (req, res) => {
    res.render("pages/register");
});

app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/login");

});

app.get("/logout",(req,res)=>{

res.clearCookie("token");

res.redirect("/login");

});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});