import users from "../models/auth.js";

export const subscriptionType = async (req, res) => {
    const amount = req.body.amount;

    const _id = req.body.id;

    try {
        if (amount == 100) {
            var type = "Silver";
            var attempts = 5;
        } else if (amount == 1000) {
            var type = "Gold";
            var attempts = 999;
        } else {
            var type = "free";
            var attempts = 1;
        }

        const update = await users.findByIdAndUpdate(
            _id,
            {
                $set: {
                    "subscription.pack_type": type,
                    "subscription.attempts": attempts,
                    "subscription.pack_start_date": new Date(),
                },
            },
            { new: true }
        );

        res.status(200).json({
            type,
            amount,
            update,
        });
    } catch (error) {
        console.log(error);
    }
};

export const validationCheck = async (req, res) => {
    const _id = req.body.id;
    try {
        const existingUser = await users.findOne({ _id });

        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found." });
        }

        const packageDetails = existingUser.subscription;
        const packageDate = packageDetails.pack_start_date;
        // Specific date
        const specificDate = new Date(packageDate);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = specificDate.getTime() - new Date().getTime();

        // Convert in Days Unit
        const differenceInDays = Math.ceil(Math.abs(differenceInMilliseconds) / (1000 * 60 * 60 * 24));

        if (differenceInDays > 28) {
            await users.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        "subscription.pack_type": "free",
                        "subscription.attempts": 1,
                        "subscription.pack_start_date": new Date(),
                    },
                },
                { new: true }
            );
            res.status(200).json({ message: "Subscription Update" });
        } else {
            res.status(200).json({ message: "Subscription Not Update" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "id not found" });
    }
};