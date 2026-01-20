'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestion } from '@/ai/flows/ai-answer-questions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters.',
  }),
});

export default function ChatPage() {
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      question: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setAnswer(null);
      setError(null);
      try {
        const result = await answerQuestion(values);
        setAnswer(result.answer);
      } catch (e) {
        setError('An error occurred. Please try again.');
        console.error(e);
      }
    });
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter">
            AI Study Buddy
          </h1>
          <p className="text-muted-foreground">
            Ask any question on any topic, and our AI will provide a clear,
            concise explanation to help you learn.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Photosynthesis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., What are the main inputs and outputs of the Calvin Cycle?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles className="mr-2" />
                  )}
                  Get Answer
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isPending && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                Generating Answer...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        {answer && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                AI Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                <p>{answer}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
