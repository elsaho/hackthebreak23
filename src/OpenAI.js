import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

console.log(openAI);
console.log(process.env.REACT_APP_OPENAI_API_KEY);
export default openAI;
