import express from "express";
import axios from 'axios';
const router = express.Router();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// import { Translate } from '@google-cloud/translate';
const { Translate } = require('@google-cloud/translate').v2;
const projectId = "stackoverflow-396716";
const translate = new Translate({ projectId });


const translationAPIKey = process.env.TRANSLATION_API;

router.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
    console.log(targetLanguage)

    try {
        const translationResponse = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${translationAPIKey}`,
            {
                q: text,
                target: targetLanguage,
            }
        );

        const translatedText = translationResponse.data.data.translations[0].translatedText;
        console.log(translatedText)
        res.json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

export default router;