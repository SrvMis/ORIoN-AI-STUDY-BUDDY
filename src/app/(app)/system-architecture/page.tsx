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
          <CardContent>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 400"
              className="h-auto w-full max-w-full rounded-lg border bg-background"
            >
              <style>{`
                .text {
                  font-family: 'Space Grotesk', sans-serif;
                  fill: hsl(var(--foreground));
                  font-weight: 500;
                }
                .text-sm {
                  font-size: 12px;
                  fill: hsl(var(--muted-foreground));
                }
                .box {
                  stroke: hsl(var(--border));
                  stroke-width: 1.5;
                  fill: url(#box-gradient);
                }
                .arrow-text {
                  font-family: 'Inter', sans-serif;
                  fill: hsl(var(--accent));
                  font-size: 13px;
                  font-weight: 500;
                }
                #arrowhead path {
                  fill: hsl(var(--primary));
                }
                .icon {
                  fill: hsl(var(--primary));
                }
                .grid-line {
                  stroke: hsl(var(--border) / 0.5);
                  stroke-width: 0.5;
                }
                @keyframes dash {
                  to {
                    stroke-dashoffset: 20;
                  }
                }
                .animated-arrow {
                  stroke: hsl(var(--primary));
                  stroke-width: 2.5;
                  marker-end: url(#arrowhead);
                  stroke-dasharray: 10;
                  animation: dash 1s linear infinite;
                }
              `}</style>
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="hsl(var(--border) / 0.2)"
                    strokeWidth="1"
                  />
                </pattern>
                <linearGradient id="box-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 0.1 }} />
                </linearGradient>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="8"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M0 0 L10 3.5 L0 7 z" fill="hsl(var(--primary))" />
                </marker>
              </defs>

              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Client Box */}
              <g transform="translate(50, 150)">
                <rect width="180" height="100" rx="10" className="box" />
                <path d="M20 35 h20 l-5 10 l5 10 h-20 v-20 M30 35 v20" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" transform="translate(10, -5) scale(1.2)" />
                <text x="90" y="45" textAnchor="middle" className="text" fontSize="18">
                  Client
                </text>
                <text x="90" y="65" textAnchor="middle" className="text-sm">
                  Next.js / React
                </text>
              </g>

              {/* App Hosting Box */}
              <g transform="translate(310, 150)">
                <rect width="180" height="100" rx="10" className="box" />
                <path d="M 20 40 C 20 30, 40 30, 40 40 S 60 50, 60 40" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" transform="translate(-5, -10) scale(1.2)" />
                <path d="M 15 50 H 65" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" transform="translate(-5, -10) scale(1.2)" />
                <text x="90" y="45" textAnchor="middle" className="text" fontSize="18">
                  App Hosting
                </text>
                <text x="90" y="65" textAnchor="middle" className="text-sm">
                  Firebase Serverless
                </text>
              </g>

              {/* Google AI Box */}
              <g transform="translate(570, 150)">
                <rect width="180" height="100" rx="10" className="box" />
                <circle cx="25" cy="25" r="3" className="icon" transform="translate(10, 5)"/>
                <path d="M 25 28 v 15" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <path d="M 18 35 h 14" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                <path d="M 20 48 C 22 44, 28 44, 30 48" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none"/>
                <text x="90" y="45" textAnchor="middle" className="text" fontSize="18">
                  Google AI
                </text>
                <text x="90" y="65" textAnchor="middle" className="text-sm">
                  Gemini / Genkit
                </text>
              </g>

              {/* Arrows */}
              <path d="M235 200 H 305" className="animated-arrow" />
              <text x="270" y="190" textAnchor="middle" className="arrow-text">
                Request
              </text>
              <path d="M495 200 H 565" className="animated-arrow" />
              <text x="530" y="190" textAnchor="middle" className="arrow-text">
                API Call
              </text>
            </svg>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
