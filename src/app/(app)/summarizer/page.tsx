'use client';

import { useState, useTransition, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeText } from '@/ai/flows/ai-summarizer-from-text';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Volume2 } from 'lucide-react';

const formSchema = z.object({
  text: z.string().min(100, {
    message: 'Text must be at least 100 characters to summarize.',
  }),
});

export default function SummarizerPage() {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setSummary(null);
      setError(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      try {
        const result = await summarizeText(values);
        setSummary(result.summary);
      } catch (e: any) {
        setError(e.message || 'An error occurred while summarizing. Please try again.');
        console.error(e);
      }
    });
  }

  const handleReadAloud = async (text: string) => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    setError(null);
    try {
      const { audio } = await textToSpeech(text);
      if (audioRef.current) {
        audioRef.current.src = audio;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error('Audio playback failed:', e);
            setError(
              'Could not play audio. Your browser might be blocking it or the format is not supported.'
            );
            setIsSpeaking(false);
          });
        }
        audioRef.current.onended = () => {
          setIsSpeaking(false);
        };
      }
    } catch (e: any) {
      setError(e.message || 'An error occurred during text-to-speech.');
      console.error(e);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <audio ref={audioRef} />
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter">
            AI Text Summarizer
          </h1>
          <p className="text-muted-foreground">
            Paste in any long text, article, or document, and get a quick,
            easy-to-read summary of the key points.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Summarize Your Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text to Summarize</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your text here..."
                          className="min-h-[250px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending || isSpeaking}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Sparkles className="mr-2" />
                  )}
                  Summarize
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
                Generating Summary...
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

        {summary && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  Summary
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReadAloud(summary)}
                  disabled={isPending}
                >
                  {isSpeaking ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Volume2 />
                  )}
                  <span className="sr-only">Read aloud</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                <p>{summary}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
