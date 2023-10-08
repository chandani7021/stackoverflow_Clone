import mongoose from "mongoose";
import Questions from "../models/Questions.js";
import auth from "../models/auth.js";


export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }

    updateNoOfQuestions(_id, noOfAnswers)

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
            $addToSet: {
                answer: [{ answerBody, userAnswered, userId }]
            },
        });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        // console.log(error)
        res.status(400).json('error in updating')
    }
}


// Function to calculate user points based on their actions
const calculateUserPointsAndBadges = async (userId) => {
    try {
        // Calculate the number of questions posted by the user
        const questionsPostedCount = await Questions.countDocuments({ userId });

        // Calculate the number of answers posted by the user
        const answersPostedCount = await Questions.countDocuments({
            'answer.userId': userId
        });

        // Calculate total points based on user actions
        const totalPoints = questionsPostedCount * 5 + answersPostedCount * 10;



        // Check badge eligibility and update badges
        let badgesEarned = [];

        if (totalPoints >= 10) {
            badgesEarned.push('Novice Badge');
        }
        if (totalPoints >= 50) {
            badgesEarned.push('Honor Badge');
        }
        if (totalPoints >= 100) {
            badgesEarned.push('Ninja Badge');
        }

        // Update the user's points and badges in the database
        await auth.findByIdAndUpdate(userId, { points: totalPoints, badges: badgesEarned });

        return { points: totalPoints, badges: badgesEarned };
    } catch (error) {
        console.error('Error calculating user points:', error);
        throw error;
    }
};

// Controller function to assign points and badges to a user
export const points = async (req, res) => {
    try {
        const { profileData } = req.body;

        if (!profileData) {
            return res.status(400).json({ error: 'Profile data not provided' });
        }

        const userId = profileData.result._id;

        // Calculate user points and badges
        const { points, badges } = await calculateUserPointsAndBadges(userId);

        // Send a response back to the client with points and badges
        res.json({ points, badges });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};









const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { noOfAnswers: noOfAnswers } })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }

    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('Answer unavailable..');
    }

    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await Questions.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } }
        )
        res.status(200).json({ message: "Successfully deleted" })
    } catch (error) {
        console.log(error)
        res.status(405).json(error)
    }

}

