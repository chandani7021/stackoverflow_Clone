import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
    browser: { type: String },
    version: { type: String },
    layout: { type: String },
    os: { type: String },
    description: { type: String },
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now }
})

export default mongoose.model("userInfo", userInfoSchema)