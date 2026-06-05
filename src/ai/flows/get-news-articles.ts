'use server';
/**
 * @fileOverview A flow that fetches recent news articles on specified topics.
 *
 * - getNewsArticles - Fetches a list of news articles.
 * - NewsArticleSchema - The schema for a single news article.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsArticleSchema = z.object({
  id: z.string().describe('A unique identifier for the article.'),
  title: z.string().describe('The headline of the news article.'),
  description: z.string().describe('A brief summary of the news article.'),
  category: z.string().describe('The category of the news (e.g., Recycling, Pollution, Sustainability).'),
  date: z.string().describe('The publication date of the article.'),
  imagePrompt: z.string().describe('A descriptive prompt for generating a relevant image for the article.'),
});

const GetNewsArticlesOutputSchema = z.array(NewsArticleSchema);
export type GetNewsArticlesOutput = z.infer<typeof GetNewsArticlesOutputSchema>;

const FALLBACK_ARTICLES: GetNewsArticlesOutput = [
  {
    id: 'fallback-1',
    title: 'The Future of Circular Economy',
    description: 'Innovative startups are redesigning products to be fully recyclable, reducing global waste by up to 40%.',
    category: 'Sustainability',
    date: new Date().toISOString(),
    imagePrompt: 'circular economy cycle',
  },
  {
    id: 'fallback-2',
    title: 'New Advances in Plastic Recycling',
    description: 'Scientists have discovered a new chemical process that allows low-grade plastics to be upcycled into high-value materials.',
    category: 'Recycling',
    date: new Date().toISOString(),
    imagePrompt: 'plastic recycling facility',
  },
  {
    id: 'fallback-3',
    title: 'Urban Composting Gains Momentum',
    description: 'Major cities are implementing neighborhood-wide composting programs to divert organic waste from landfills.',
    category: 'Waste Management',
    date: new Date().toISOString(),
    imagePrompt: 'urban compost bin',
  },
  {
    id: 'fallback-4',
    title: 'Protecting Our Oceans from Microplastics',
    description: 'A new international treaty aims to strictly regulate industrial runoff to prevent microplastic accumulation in marine ecosystems.',
    category: 'Pollution',
    date: new Date().toISOString(),
    imagePrompt: 'clean ocean waves',
  }
];

export async function getNewsArticles(): Promise<GetNewsArticlesOutput> {
  return getNewsArticlesFlow();
}

const prompt = ai.definePrompt({
  name: 'getNewsArticlesPrompt',
  output: { schema: GetNewsArticlesOutputSchema },
  prompt: `You are a news curator for an environmental and waste management company. 
  
  Your task is to provide a list of 4 recent, engaging news articles related to waste reduction, recycling, pollution, and sustainability. 
  
  For each article, provide a unique ID, a title, a short description, a relevant category, a recent date (within the last week), and a simple, descriptive prompt for an image generation model to create a relevant photo. The image prompt should be 2-3 words.
  
  Ensure the articles are distinct and cover different aspects of environmental news.`,
});

const getNewsArticlesFlow = ai.defineFlow(
  {
    name: 'getNewsArticlesFlow',
    outputSchema: GetNewsArticlesOutputSchema,
  },
  async () => {
    try {
      const { output } = await prompt();
      return output || FALLBACK_ARTICLES;
    } catch (error) {
      console.error('Genkit prompt error in getNewsArticlesFlow (likely high demand/503):', error);
      // Return fallback articles if the AI service is unavailable
      return FALLBACK_ARTICLES;
    }
  }
);
