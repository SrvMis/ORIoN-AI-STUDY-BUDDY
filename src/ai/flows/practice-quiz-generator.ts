'use server';

/**
 * @fileOverview A practice quiz generator AI agent.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the quiz.'),
  numQuestions: z.number().describe('The number of questions to generate.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answer options.'),
      answer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated quiz.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz generator. Generate a quiz with {{numQuestions}} questions on the topic of {{topic}}.

The quiz should be returned as a JSON array of objects. Each object should have the following keys:
- question: The quiz question.
- options: An array of possible answer options.
- answer: The correct answer to the question. This MUST be one of the options given.

Here's an example of what the output should look like:

[
  {
    "question": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Rome"],
    "answer": "Paris"
  },
  {
    "question": "What is the highest mountain in the world?",
    "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    "answer": "Mount Everest"
  }
]

Make sure each question is unique and tests the user's knowledge of the topic.  Do not use questions from this example.  The options should be plausible, and there should be 4 options per question.

Ensure that the output can be parsed as valid JSON.

{{topic}}
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
