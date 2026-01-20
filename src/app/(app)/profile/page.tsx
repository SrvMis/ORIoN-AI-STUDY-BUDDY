'use client';

import Image from 'next/image';
import { useUser } from '@/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

const quizScoresData = [
  { topic: 'History', score: 80, fill: 'var(--color-history)' },
  { topic: 'Science', score: 92, fill: 'var(--color-science)' },
  { topic: 'Math', score: 75, fill: 'var(--color-math)' },
  { topic: 'Literature', score: 88, fill: 'var(--color-literature)' },
];

const progressData = [
    { date: 'Jan', averageScore: 65 },
    { date: 'Feb', averageScore: 68 },
    { date: 'Mar', averageScore: 75 },
    { date: 'Apr', averageScore: 80 },
    { date: 'May', averageScore: 82 },
    { date: 'Jun', averageScore: 88 },
];

const chartConfig = {
  score: {
    label: 'Score',
  },
  averageScore: {
    label: 'Avg. Score',
    color: 'hsl(var(--primary))',
  },
  history: {
    label: 'History',
    color: 'hsl(var(--chart-1))',
  },
  science: {
    label: 'Science',
    color: 'hsl(var(--chart-2))',
  },
  math: {
    label: 'Math',
    color: 'hsl(var(--chart-3))',
  },
  literature: {
    label: 'Literature',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;


export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };


  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter">
            User Profile
          </h1>
          <p className="text-muted-foreground">
            View your details, track your progress, and see how you're improving.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    {user.photoURL && (
                      <AvatarImage
                        src={user.photoURL}
                        alt="User Avatar"
                        width={100}
                        height={100}
                      />
                    )}
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">{user.displayName || 'User'}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge>Pro Member</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Your performance across different topics and over time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="mb-4 font-semibold">Quiz Scores by Topic</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart accessibilityLayer data={quizScoresData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="topic"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <YAxis />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="score" radius={4}>
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
                <Separator />
                <div>
                   <h3 className="mb-4 font-semibold">Progress Over Time</h3>
                   <ChartContainer config={chartConfig} className="h-[250px] w-full">
                      <LineChart accessibilityLayer data={progressData}>
                         <CartesianGrid vertical={false} />
                         <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                         <YAxis />
                         <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                         <Legend />
                         <Line dataKey="averageScore" type="monotone" stroke="var(--color-averageScore)" strokeWidth={2} dot={true} />
                      </LineChart>
                   </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
