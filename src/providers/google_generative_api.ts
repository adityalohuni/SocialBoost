import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const google_llm = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
