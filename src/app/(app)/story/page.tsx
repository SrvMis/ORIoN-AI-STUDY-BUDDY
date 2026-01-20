'use client';

import { useState, useTransition, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateStory } from '@/ai/flows/story-generator';
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
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
});

export default function StoryPage() {
  const [isPending, startTransition] = useTransition();
  const [story, setStory] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setStory(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      try {
        const result = await generateStory(values);
        setStory(result.story);
      } catch (e: any) {
        toast({
          variant: 'destructive',
          title: 'Story Generation Error',
          description: e.message || 'An error occurred. Please try again.',
        });
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
    try {
      const { audio } = await textToSpeech(text);
      if (audioRef.current) {
        audioRef.current.src = audio;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error('Audio playback failed:', e);
            toast({
              variant: 'destructive',
              title: 'Audio Error',
              description:
                'Could not play audio. Your browser might be blocking it.',
            });
            setIsSpeaking(false);
          });
        }
        audioRef.current.onended = () => {
          setIsSpeaking(false);
        };
      }
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Text-to-Speech Error',
        description: e.message || 'An error occurred during text-to-speech.',
      });
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
            AI Story Generator
          </h1>
          <p className="text-muted-foreground">
            Unleash your imagination. Provide a topic, and our AI will weave a
            unique story for you.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Create a Story</CardTitle>
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
                      <FormLabel>Story Topic</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., A robot who discovers music"
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
                  Generate Story
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
                Generating Story...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
        )}

        {story && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  The Story
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReadAloud(story)}
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
                <p>{story}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
