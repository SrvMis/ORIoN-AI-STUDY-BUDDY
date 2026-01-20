'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestion } from '@/ai/flows/ai-answer-questions';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Volume2,
  Copy,
  SendHorizonal,
  Terminal,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  query: z.string().min(2, {
    message: 'Query must be at least 2 characters.',
  }),
});

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
};

export default function ChatPage() {
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation();
  const WelcomeMessage: Message = {
    id: 0,
    role: 'assistant',
    content: t('Hello! I am your AI Study Buddy. Select a mode on the left and let\'s start learning.'),
  };
  const [messages, setMessages] = useState<Message[]>([WelcomeMessage]);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      startTransition(async () => {
        setError(null);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
        const userMessage: Message = {
          id: Date.now(),
          role: 'user',
          content: values.query,
        };
        setMessages((prev) => [...prev, userMessage]);

        const loadingMessage: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: '...', // Placeholder for loading
        };
        setMessages((prev) => [...prev, loadingMessage]);

        try {
          const result = await answerQuestion({
            topic: values.query, // Using query for both
            question: values.query,
          });
          const assistantMessage: Message = {
            id: loadingMessage.id,
            role: 'assistant',
            content: result.answer,
          };
          setMessages((prev) =>
            prev.map((m) => (m.id === loadingMessage.id ? assistantMessage : m))
          );
        } catch (e: any) {
          const errorMessage: Message = {
            id: loadingMessage.id,
            role: 'assistant',
            content: e.message || 'An error occurred. Please try again.',
            isError: true,
          };
          setMessages((prev) =>
            prev.map((m) => (m.id === loadingMessage.id ? errorMessage : m))
          );
          console.error(e);
        }
        form.reset({ query: '' });
      });
    },
    [form, startTransition]
  );

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.role === 'assistant' && message.content === '...') {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{t('Thinking...')}</span>
        </div>
      );
    }
    return (
      <p className={message.isError ? 'text-destructive' : ''}>
        {message.isError && (
          <span className="font-bold">{t('Error: ')}</span>
        )}
        {message.content}
      </p>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <audio ref={audioRef} />
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl space-y-8 p-4">
          <Alert className="border-primary">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-bold">Can't find the Terminal?</AlertTitle>
            <AlertDescription>
              The terminal panel is at the bottom of the screen. If it's hidden, try one of these methods:
              <ul className="list-disc pl-5 mt-2">
                <li>Press the keyboard shortcut: <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">`</kbd> (the backtick key).</li>
                <li>Go to the main menu at the top of the screen and select <strong>View &gt; Terminal</strong>.</li>
              </ul>
            </AlertDescription>
          </Alert>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                }`}
              >
                <div className="prose prose-sm max-w-none text-current dark:prose-invert">
                 {renderMessageContent(message)}
                </div>
                {message.role === 'assistant' && message.content !== '...' && message.id !== 0 && !message.isError && (
                  <div className="-mb-2 mt-2 flex items-center gap-2 border-t pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReadAloud(message.content)}
                      disabled={isSpeaking}
                      className="h-auto p-1 text-xs text-muted-foreground"
                    >
                      {isSpeaking ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <Volume2 className="mr-1 h-3 w-3" />
                      )}
                      {t('Read Aloud')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(message.content)}
                      className="h-auto p-1 text-xs text-muted-foreground"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      {t('Copy')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-card/50 p-4">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
            <Textarea
              placeholder={t('Type a topic or concept...')}
              className="min-h-12 resize-none rounded-full py-3 pl-4 pr-14"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)();
                }
              }}
              {...form.register('query')}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Button type="submit" size="icon" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <SendHorizonal />
                )}
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {t('AI can make mistakes. Always verify important information.')}
          </p>
        </div>
      </div>
    </div>
  );
}
