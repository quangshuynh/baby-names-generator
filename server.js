const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const openai_api_key = process.env.REACT_APP_OPENAI_API_KEY;

if (!openai_api_key) {   // exit server if the key is missing
  console.error("OpenAI API key is not defined in the environment.");
  process.exit(1);
}

const config = new Configuration({
  apiKey: openai_api_key,
});

const openai = new OpenAIApi(config);

// setup server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-003", // Use an appropriate OpenAI model
      max_tokens: 512,
      temperature: 0.7, // adjust temperature as needed
      prompt: prompt,
    });

    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.error("Error generating response from OpenAI:", error);
    res.status(500).send("Failed to generate response from OpenAI.");
  }
});

const PORT = 8020;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
