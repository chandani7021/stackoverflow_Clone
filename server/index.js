import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import paymentRoutes from "./routes/payment.js";
import subscribeRoutes from "./routes/subscribe.js";
import userInfoRoutes from "./routes/userInfo.js";
import translationRoutes from "./routes/translation.js";
import dotenv from 'dotenv';


const allowedOrigins = ['https://stack-overflow-clone-by-chandani.netlify.app'];
// const allowedOrigins = ['http://localhost:3000'];
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limmit: "30mb", extended: true }));
app.use(cors());

app.set("trust proxy", true);



app.get('/', async (req, res) => {

    res.send("Stackoverflow")
})

app.use("/user", userRoutes)
app.use("/questions", questionRoutes)
app.use("/answer", answerRoutes)
app.use("/payment", paymentRoutes);
app.use("/subscription", subscribeRoutes);
app.use("/userInfo", userInfoRoutes);
app.use("/translation", translationRoutes);



const PORT = process.env.PORT || 5000;



// The above code will make static local mongoDB storage, bt we dont want to do it that way. so, we will use atlas

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message))

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });