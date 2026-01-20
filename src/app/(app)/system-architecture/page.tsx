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
            <CardTitle>System Architecture Blueprint</CardTitle>
            <CardDescription>
              Data flow and component interaction diagram
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 900 650"
              className="h-auto w-full max-w-full rounded-lg bg-background"
            >
              <style>{`
                .line { stroke: hsl(var(--border)); stroke-width: 1.5; fill: none; }
                .box-label { font-size: 10px; font-weight: bold; fill: white; text-anchor: middle; }
                .box-title { font-size: 16px; font-weight: bold; text-anchor: middle; }
                .box-desc { font-size: 12px; text-anchor: middle; }
                
                .font-body { font-family: 'Inter', sans-serif; }
                .font-headline { font-family: 'Space Grotesk', sans-serif; }
    
                .pill-frontend { fill: #6366F1; }
                .box-frontend { fill: hsl(var(--muted)); stroke: #A5B4FC; }
                .text-frontend { fill: hsl(var(--foreground)); }
    
                .pill-security { fill: #F97316; }
                .box-security { fill: hsl(var(--muted)); stroke: #FDBA74; }
                .text-security { fill: hsl(var(--foreground)); }
                
                .pill-orchestration { fill: #475569; }
                .box-orchestration { fill: #1E293B; stroke: #334155; }
                .text-orchestration { fill: #F8FAFC; }
    
                .pill-storage { fill: #10B981; }
                .box-storage { fill: hsl(var(--muted)); stroke: #6EE7B7; }
                .text-storage { fill: hsl(var(--foreground)); }
    
                .pill-history { fill: #0EA5E9; }
                .box-history { fill: hsl(var(--muted)); stroke: #7DD3FC; }
                .text-history { fill: hsl(var(--foreground)); }
                
                .pill-api { fill: #A855F7; }
                .box-api { fill: #7C3AED; stroke: #A855F7; }
                .text-api-title { fill: #F8FAFC; }
                .text-api-desc { fill: #E0E7FF; }
              `}</style>

              <rect
                x="5"
                y="5"
                width="890"
                height="640"
                rx="20"
                fill="hsl(var(--card))"
              />

              {/* Lines */}
              <path className="line" d="M450 160 V 210" />
              <path className="line" d="M300 295 H 350" />
              <path className="line" d="M550 295 H 640" />
              <path className="line" d="M450 320 V 470" />
              <path className="line" d="M240 295 H 300" />
              <path className="line" d="M640 295 H 660" />
              <path className="line" d="M640 205 V 295" />
              <path className="line" d="M640 345 V 295" />
              

              {/* Frontend Client */}
              <g transform="translate(350, 80)">
                <rect
                  className="box-frontend"
                  width="200"
                  height="80"
                  rx="12"
                  strokeWidth="1.5"
                />
                <rect
                  className="pill-frontend"
                  x="50"
                  y="-10"
                  width="100"
                  height="20"
                  rx="10"
                />
                <text className="box-label font-body" x="100" y="5">
                  Frontend Client
                </text>
                <text
                  className="box-title font-headline text-frontend"
                  x="100"
                  y="40"
                >
                  React.js SPA
                </text>
                <text
                  className="box-desc font-body text-frontend"
                  fillOpacity="0.7"
                  x="100"
                  y="60"
                >
                  User Interface &amp; State Mgmt
                </text>
              </g>

              {/* Authentication */}
              <g transform="translate(80, 245)">
                <rect
                  className="box-security"
                  width="220"
                  height="100"
                  rx="12"
                  strokeWidth="1.5"
                />
                <rect
                  className="pill-security"
                  x="80"
                  y="-10"
                  width="60"
                  height="20"
                  rx="10"
                />
                <text className="box-label font-body" x="110" y="5">
                  Security
                </text>
                <text
                  className="box-title font-headline text-security"
                  x="110"
                  y="45"
                >
                  Authentication
                </text>
                <text
                  className="box-desc font-body text-security"
                  fillOpacity="0.7"
                  x="110"
                  y="65"
                >
                  Firebase Auth (Google Login)
                </text>
              </g>

              {/* Prompt Engineering Engine */}
              <g transform="translate(350, 220)">
                <rect
                  className="box-orchestration"
                  width="200"
                  height="100"
                  rx="20"
                  strokeWidth="1.5"
                />
                <rect
                  className="pill-orchestration"
                  x="55"
                  y="-10"
                  width="90"
                  height="20"
                  rx="10"
                />
                <text className="box-label font-body" x="100" y="5">
                  Orchestration
                </text>
                <text
                  className="box-title font-headline text-orchestration"
                  x="100"
                  y="40"
                  fontSize="14"
                >
                  Prompt Engineering Engine
                </text>
                <text
                  className="box-desc font-body text-orchestration"
                  fillOpacity="0.7"
                  x="100"
                  y="65"
                >
                  Context Management &amp; Sanitization
                </text>
              </g>

              {/* Firestore DB */}
              <g transform="translate(660, 160)">
                <rect
                  className="box-storage"
                  width="180"
                  height="90"
                  rx="12"
                  strokeWidth="1.5"
                />
                <rect
                  className="pill-storage"
                  x="65"
                  y="-10"
                  width="50"
                  height="20"
                  rx="10"
                />
                <text className="box-label font-body" x="90" y="5">
                  Storage
                </text>
                <text
                  className="box-title font-headline text-storage"
                  x="90"
                  y="40"
                >
                  Firestore DB
                </text>
                <text
                  className="box-desc font-body text-storage"
                  fillOpacity="0.7"
                  x="90"
                  y="60"
                >
                  User Profiles &amp; Saved Notes
                </text>
              </g>

              {/* History Service */}
              <g transform="translate(660, 300)">
                <rect
                  className="box-history"
                  width="180"
                  height="90"
                  rx="12"
                  strokeWidth="1.5"
                />
                <rect
                  className="pill-history"
                  x="65"
                  y="-10"
                  width="50"
                  height="20"
                  rx="10"
                />
                <text className="box-label font-body" x="90" y="5">
                  History
                </text>
                <text
                  className="box-title font-headline text-history"
                  x="90"
                  y="40"
                >
                  History Service
                </text>
                <text
                  className="box-desc font-body text-history"
                  fillOpacity="0.7"
                  x="90"
                  y="60"
                >
                  Chat Logs &amp; Context
                </text>
              </g>

              {/* Google Gemini API */}
              <g transform="translate(300, 470)">
                <rect
                  className="box-api"
                  width="300"
                  height="90"
                  rx="12"
                  strokeWidth="1.5"
                />
                <rect
                  className="pill-api"
                  x="110"
                  y="-10"
                  width="80"
                  height="20"
                  rx="10"
                />
                <text className="box-label font-body" x="150" y="5">
                  External API
                </text>
                <text
                  className="box-title font-headline text-api-title"
                  x="150"
                  y="45"
                >
                  Google Gemini API
                </text>
                <text
                  className="box-desc font-body text-api-desc"
                  fillOpacity="0.9"
                  x="150"
                  y="65"
                >
                  LLM Processing (Flash Model)
                </text>
              </g>
            </svg>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
