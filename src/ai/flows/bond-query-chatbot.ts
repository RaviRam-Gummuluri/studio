'use server';

/**
 * @fileOverview An AI chatbot for answering questions about bonds, using a reasoning tool to fetch relevant data from the database.
 *
 * - bondQueryChatbot - A function that handles the bond query process.
 * - BondQueryChatbotInput - The input type for the bondQueryChatbot function.
 * - BondQueryChatbotOutput - The return type for the bondQueryChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BondQueryChatbotInputSchema = z.object({
  query: z.string().describe('The user query about bonds.'),
});
export type BondQueryChatbotInput = z.infer<typeof BondQueryChatbotInputSchema>;

const BondQueryChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query about bonds.'),
  reasoning: z.string().describe('The reasoning process used to answer the query.'),
});
export type BondQueryChatbotOutput = z.infer<typeof BondQueryChatbotOutputSchema>;

export async function bondQueryChatbot(input: BondQueryChatbotInput): Promise<BondQueryChatbotOutput> {
  return bondQueryChatbotFlow(input);
}

const fetchDataTool = ai.defineTool({
  name: 'fetchBondData',
  description: 'Fetches relevant bond data from the database based on the user query.',
  inputSchema: z.object({
    query: z.string().describe('The user query to use for fetching bond data.'),
  }),
  outputSchema: z.string().describe('The fetched bond data from the database.'),
}, async (input) => {
  // TODO: Implement the actual database fetching logic here.
  // This is a placeholder implementation.
  return `Dummy bond data for query: ${input.query}`;
});

const prompt = ai.definePrompt({
  name: 'bondQueryChatbotPrompt',
  input: {schema: BondQueryChatbotInputSchema},
  output: {schema: BondQueryChatbotOutputSchema},
  tools: [fetchDataTool],
  prompt: `You are a helpful AI chatbot that answers questions about bonds.

  First, use your reasoning to determine if you need to fetch bond data from the database using the fetchBondData tool.
  If the user's question requires specific bond information, use the tool to fetch the data.

  After fetching the data, use it to answer the user's question as accurately as possible.
  Include the reasoning process you used to arrive at the answer.

  User query: {{{query}}}

  Output format: Answer: <answer>\nReasoning: <reasoning>`,
});

const bondQueryChatbotFlow = ai.defineFlow(
  {
    name: 'bondQueryChatbotFlow',
    inputSchema: BondQueryChatbotInputSchema,
    outputSchema: BondQueryChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
