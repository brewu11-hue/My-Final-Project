'use server';

/**
 * @fileOverview A simple conversational AI flow for a chatbot assistant.
 *
 * - chat - A function that handles the conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  prompt: z.string().describe('The user\'s latest message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string().describe('The model\'s response.');
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { history, prompt } = input;

    const chatHistory = history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const response = await ai.generate({
      prompt: prompt,
      history: chatHistory,
      config: {
        // Add safety settings if needed
      },
    });

    return response.text;
  }
);
