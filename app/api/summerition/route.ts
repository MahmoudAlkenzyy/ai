// import { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";

// const gptClient = () => {
//   const azure_oai_endpoint = "https://aisummrization.openai.azure.com/";
//   const azure_oai_key =
//     "7avxOsEvmPdNVYqIorGkbZTI791NP74BMpemF8QE3WnPERGEtC4lJQQJ99BBACYeBjFXJ3w3AAABACOGjwIh";

//   const client = new OpenAI({
//     apiKey: azure_oai_key,
//     baseURL: `${azure_oai_endpoint}/openai/deployments/gpt-35-turbo-16k`,
//     defaultQuery: { "api-version": "2024-05-01-preview" },
//     defaultHeaders: { "api-key": azure_oai_key },
//   });

//   return client;
// };

// const system_message =
//   "You summarize the conversation between the customer and the agent as answers to these questions in slang Arabic language: 1. What is the customer's problem? 2. What is the agent's solution and how he handled the customer? 3. Had the problem been solved? 4. What is the customer's reaction? 5. What is the customer satisfaction level percentage";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { text } = req.body;

//     try {
//       const response = await gptClient().chat.completions.create({
//         model: "gpt-35-turbo-16k", // Ensure this matches your deployment name
//         messages: [
//           { role: "system", content: system_message },
//           { role: "user", content: "hi" },
//         ],
//         temperature: 0.7,
//         max_tokens: 500,
//       });

//       const full_response = response.choices[0].message.content;
//       res.status(200).json({ response: full_response });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while processing your request." });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed." });
//   }
// }
