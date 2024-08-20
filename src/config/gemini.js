

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import.meta.env

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_TEST_VAR;


async function runChat(prompt) {

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});
       

  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};

const safetySetting = [

    {
        category:HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },

];

const chat = model.startChat({
    generationConfig,
    safetySetting,
    history: [

    ],
});

const result = await chat.sendMessage(prompt);
const response = result.response;
console.log(response.text());
return response.text();

}

export default runChat;