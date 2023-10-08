import mongoose from "mongoose";
import userInfo from '../models/userInfo.js'

export const storeUserInformation = async (req, res) => {
    try {
        const { browser, version, layout, os, description, ipAddress } = req.body;

        // Create a new user information document
        const newUserInformation = new userInfo({
            browser,
            version,
            layout,
            os,
            description,
            ipAddress,
        });

        // Save the user information to MongoDB
        await newUserInformation.save();

        res.status(201).json({ message: 'User information stored successfully' });
    } catch (error) {
        console.error('Error storing user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserHistory = async (req, res) => {
    try {
        // Fetch historical user information from the database
        const userHistory = await userInfo.find({});
        // console.log(userHistory)
        res.json({ userHistory });
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
