'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrainCircuit, Cloud, Zap } from 'lucide-react';

export default function SystemArchitecturePage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter">
            System Architecture
          </h1>
          <p className="text-muted-foreground">
            An overview of the components and services that power this
            application.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frontend</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Next.js & React</div>
              <p className="text-xs text-muted-foreground">
                Built with the Next.js App Router for a fast, modern web
                experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI & Generative Flows
              </CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Genkit</div>
              <p className="text-xs text-muted-foreground">
                AI features are powered by Genkit flows calling Google's Gemini
                models.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Styling & UI
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tailwind & ShadCN</div>
              <p className="text-xs text-muted-foreground">
                A sleek, futuristic UI built with Tailwind CSS and ShadCN UI
                components.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hosting & Backend
              </CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Firebase</div>
              <p className="text-xs text-muted-foreground">
                Hosted on Firebase App Hosting for scalable, serverless
                deployment.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Diagram</CardTitle>
            <CardDescription>
              A high-level look at the data and request flow.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 400"
              className="h-auto max-w-full"
            >
              <style>{`
                        .box { fill: hsl(var(--card)); stroke: hsl(var(--border)); stroke-width: 1; }
                        .text { font-family: Inter, sans-serif; fill: hsl(var(--foreground)); }
                        .arrow { fill: none; stroke: hsl(var(--accent)); stroke-width: 2; marker-end: url(#arrowhead); }
                        #arrowhead path { fill: hsl(var(--accent)); }
                    `}</style>
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="0"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M0 0 L10 3.5 L0 7 z" />
                </marker>
              </defs>

              {/* Boxes */}
              <rect
                x="50"
                y="150"
                width="150"
                height="80"
                rx="8"
                className="box"
              />
              <text
                x="125"
                y="185"
                text-anchor="middle"
                className="text"
                font-size="16"
              >
                Client
              </text>
              <text
                x="125"
                y="205"
                text-anchor="middle"
                className="text"
                font-size="12"
              >
                (Next.js/React)
              </text>

              <rect
                x="325"
                y="150"
                width="150"
                height="80"
                rx="8"
                className="box"
              />
              <text
                x="400"
                y="185"
                text-anchor="middle"
                className="text"
                font-size="16"
              >
                App Hosting
              </text>
              <text
                x="400"
                y="205"
                text-anchor="middle"
                className="text"
                font-size="12"
              >
                (Serverless)
              </text>

              <rect
                x="600"
                y="150"
                width="150"
                height="80"
                rx="8"
                className="box"
              />
              <text
                x="675"
                y="185"
                text-anchor="middle"
                className="text"
                font-size="16"
              >
                Google AI
              </text>
              <text
                x="675"
                y="205"
                text-anchor="middle"
                className="text"
                font-size="12"
              >
                (Gemini / Genkit)
              </text>

              {/* Arrows */}
              <path d="M205 190 H 320" className="arrow" />
              <path d="M480 190 H 595" className="arrow" />

              {/* Arrow Labels */}
              <text
                x="262.5"
                y="180"
                text-anchor="middle"
                className="text"
                font-size="12"
              >
                HTTP Request
              </text>
              <text
                x="537.5"
                y="180"
                text-anchor="middle"
                className="text"
                font-size="12"
              >
                API Call
              </text>
            </svg>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
