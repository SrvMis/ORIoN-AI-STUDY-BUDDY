'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateQuiz, type GenerateQuizOutput } from '@/ai/flows/practice-quiz-generator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

type Quiz = GenerateQuizOutput['quiz'];

type QuizState = 'setup' | 'generating' | 'active' | 'results';

const setupFormSchema = z.object({
  topic: z.string().min(2, 'Topic must be at least 2 characters.'),
  numQuestions: z.coerce
    .number()
    .min(3, 'Must have at least 3 questions.')
    .max(10, 'Cannot have more than 10 questions.'),
});

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const setupForm = useForm<z.infer<typeof setupFormSchema>>({
    resolver: zodResolver(setupFormSchema),
    defaultValues: { topic: '', numQuestions: 5 },
  });

  const handleStartQuiz = (values: z.infer<typeof setupFormSchema>) => {
    setQuizState('generating');
    setError(null);
    startTransition(async () => {
      try {
        const result = await generateQuiz(values);
        setQuiz(result.quiz);
        setUserAnswers(new Array(result.quiz.length).fill(''));
        setQuizState('active');
      } catch (e: any) {
        console.error(e);
        setError(e.message || 'An error occurred while generating the quiz.');
        setQuizState('setup');
      }
    });
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of quiz, calculate score
      let correctAnswers = 0;
      quiz!.forEach((q, index) => {
        if (q.answer === userAnswers[index]) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setQuizState('results');
    }
  };

  const handleRestart = () => {
    setQuizState('setup');
    setQuiz(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setError(null);
    setupForm.reset();
  };

  const currentQuestion = quiz ? quiz[currentQuestionIndex] : null;

  const renderContent = () => {
    switch (quizState) {
      case 'generating':
        return (
          <Card className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">
              Generating your quiz...
            </p>
          </Card>
        );

      case 'active':
        return (
          currentQuestion && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Question {currentQuestionIndex + 1} of {quiz!.length}
                </CardTitle>
                <CardDescription className="pt-2 text-lg text-foreground">
                  {currentQuestion.question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={userAnswers[currentQuestionIndex]}
                  onValueChange={handleAnswerSelect}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <RadioGroupItem value={option} id={`option-${i}`} />
                      <Label
                        htmlFor={`option-${i}`}
                        className="font-normal text-base"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                 <Progress value={((currentQuestionIndex + 1) / quiz!.length) * 100} className="w-full" />
                <Button
                  onClick={handleNextQuestion}
                  disabled={!userAnswers[currentQuestionIndex]}
                >
                  {currentQuestionIndex < quiz!.length - 1
                    ? 'Next Question'
                    : 'Submit Quiz'}
                </Button>
              </CardFooter>
            </Card>
          )
        );

      case 'results':
        return (
          <Card className="text-center">
            <CardHeader>
              <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">
                You scored
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-primary">
                {score} / {quiz!.length}
              </p>
              <Progress value={(score / quiz!.length) * 100} className="mt-6" />
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={handleRestart}>
                <RotateCcw className="mr-2" />
                Take Another Quiz
              </Button>
            </CardFooter>
          </Card>
        );

      case 'setup':
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Create a Practice Quiz</CardTitle>
              <CardDescription>
                Test your knowledge on any topic.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...setupForm}>
                <form
                  onSubmit={setupForm.handleSubmit(handleStartQuiz)}
                  className="space-y-6"
                >
                  <FormField
                    control={setupForm.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., The Roman Empire" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={setupForm.control}
                    name="numQuestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Questions</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isPending}>
                    <Sparkles className="mr-2" />
                    Generate Quiz
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter">
            Practice Quiz Generator
          </h1>
          <p className="text-muted-foreground">
            Generate custom quizzes on any subject to reinforce your learning and
            prepare for exams.
          </p>
        </header>

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
        
        {renderContent()}
      </div>
    </div>
  );
}
