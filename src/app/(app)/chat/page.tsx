'use client';

import { useState, useTransition, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestion } from '@/ai/flows/ai-answer-questions';
import { textToSpeech } from '@/ai/flows/text-to-speech';
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
import { Loader2, Sparkles, Volume2, User, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }),
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters.',
  }),
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
  topic?: string;
};

export default function ChatPage() {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      question: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setError(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      const userMessage: Message = {
        role: 'user',
        content: values.question,
        topic: values.topic,
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const result = await answerQuestion(values);
        const assistantMessage: Message = {
          role: 'assistant',
          content: result.answer,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (e: any) {
        setError(e.message || 'An error occurred. Please try again.');
        console.error(e);
      }
      form.reset({ topic: values.topic, question: '' });
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
  
  const handleClearChat = () => {
    setMessages([]);
    setError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <audio ref={audioRef} />
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
                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={isPending || isSpeaking}>
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Sparkles className="mr-2" />
                    )}
                    Get Answer
                  </Button>
                  {messages.length > 0 && (
                    <Button variant="outline" onClick={handleClearChat} type="button">
                      <Trash2 className="mr-2" />
                      Clear Chat
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {messages.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold">Chat History</h2>
            {messages.map((message, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-transparent">
                    {message.role === 'user' ? (
                      <User />
                    ) : (
                      <Sparkles className="text-primary" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <Card className="flex-1">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        {message.role === 'user' ? 'You' : 'AI Study Buddy'}
                      </p>
                      {message.role === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleReadAloud(message.content)}
                          disabled={isPending || isSpeaking}
                          className="h-8 w-8"
                        >
                          {isSpeaking ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Volume2 />
                          )}
                          <span className="sr-only">Read aloud</span>
                        </Button>
                      )}
                    </div>
                    {message.role === 'user' && message.topic && (
                      <p className="text-sm text-muted-foreground">
                        Topic: {message.topic}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                      <p>{message.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-transparent">
                    <Sparkles className="text-primary" />
                  </AvatarFallback>
                </Avatar>
                <Card className="flex-1">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                      <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {error && !isPending && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
