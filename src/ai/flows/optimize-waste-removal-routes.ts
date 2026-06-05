'use server';

/**
 * @fileOverview Optimizes waste removal routes based on submitted requests, truck capacity, and historical data.
 *
 * - optimizeWasteRemovalRoutes - A function that handles the route optimization process.
 * - OptimizeWasteRemovalRoutesInput - The input type for the optimizeWasteRemovalRoutes function.
 * - OptimizeWasteRemovalRoutesOutput - The return type for the optimizeWasteRemovalRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeWasteRemovalRoutesInputSchema = z.object({
  requests: z
    .array(
      z.object({
        location: z.string().describe('The location of the waste removal request.'),
        volume: z.number().describe('The volume of waste to be removed (e.g., in cubic meters).'),
        timestamp: z.string().describe('The timestamp of the waste removal request.'),
      })
    )
    .describe('A list of waste removal requests with location, volume, and timestamp.'),
  truckCapacity: z.number().describe('The total capacity of the waste removal truck (e.g., in cubic meters).'),
  historicalData: z
    .array(
      z.object({
        route: z.array(z.string()).describe('A list of locations visited in the route.'),
        totalVolume: z.number().describe('The total volume of waste removed in the route.'),
        timestamp: z.string().describe('The timestamp of the route.'),
      })
    )
    .describe('Historical data of waste removal routes with locations, total volume, and timestamp.'),
});
export type OptimizeWasteRemovalRoutesInput = z.infer<typeof OptimizeWasteRemovalRoutesInputSchema>;

const OptimizeWasteRemovalRoutesOutputSchema = z.object({
  optimizedRoute: z
    .array(z.string())
    .describe('An optimized route of locations to visit in order, considering truck capacity and historical data.'),
  estimatedTravelTime: z
    .number()
    .describe('The estimated total travel time for the optimized route in minutes.'),
  unservicedRequests: z
    .array(
      z.object({
        location: z.string().describe('The location of the waste removal request.'),
        volume: z.number().describe('The volume of waste to be removed (e.g., in cubic meters).'),
        timestamp: z.string().describe('The timestamp of the waste removal request.'),
      })
    )
    .describe('A list of waste removal requests that could not be serviced due to capacity constraints.'),
});
export type OptimizeWasteRemovalRoutesOutput = z.infer<typeof OptimizeWasteRemovalRoutesOutputSchema>;

export async function optimizeWasteRemovalRoutes(
  input: OptimizeWasteRemovalRoutesInput
): Promise<OptimizeWasteRemovalRoutesOutput> {
  return optimizeWasteRemovalRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeWasteRemovalRoutesPrompt',
  input: {schema: OptimizeWasteRemovalRoutesInputSchema},
  output: {schema: OptimizeWasteRemovalRoutesOutputSchema},
  prompt: `You are an AI assistant specialized in optimizing waste removal routes.

You will receive a list of waste removal requests, the truck capacity, and historical data of past routes.
Your goal is to generate an optimized route that minimizes travel time and maximizes the amount of waste removed, while respecting the truck's capacity.

Waste Removal Requests:
{{#each requests}}
- Location: {{this.location}}, Volume: {{this.volume}}, Timestamp: {{this.timestamp}}
{{/each}}

Truck Capacity: {{truckCapacity}}

Historical Data:
{{#each historicalData}}
- Route: {{this.route}}, Total Volume: {{this.totalVolume}}, Timestamp: {{this.timestamp}}
{{/each}}

Based on this information, generate an optimized route, estimate the travel time, and list any unserviced requests.

Output format:
\\\`\`\`json
{{{outputSchema}}}
\\\`\`\`

Ensure that the total volume of waste in the optimized route does not exceed the truck capacity.
Consider historical data to estimate travel times between locations.
If a request cannot be serviced due to capacity constraints, include it in the unservicedRequests array.
`,
});

const optimizeWasteRemovalRoutesFlow = ai.defineFlow(
  {
    name: 'optimizeWasteRemovalRoutesFlow',
    inputSchema: OptimizeWasteRemovalRoutesInputSchema,
    outputSchema: OptimizeWasteRemovalRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
