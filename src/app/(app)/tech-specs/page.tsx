'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const technologies = [
  { name: 'Next.js', version: '15.5.9', category: 'Framework' },
  { name: 'React', version: '19.2.1', category: 'Library' },
  { name: 'Genkit', version: '1.20.0', category: 'AI' },
  { name: 'Google Gemini', version: '2.5 Flash', category: 'AI Model' },
  { name: 'Tailwind CSS', version: '3.4.1', category: 'Styling' },
  { name: 'ShadCN UI', version: 'Latest', category: 'Components' },
  { name: 'TypeScript', version: '5', category: 'Language' },
  {
    name: 'Firebase App Hosting',
    version: 'Latest',
    category: 'Backend/Hosting',
  },
  { name: 'Lucide React', version: '0.475.0', category: 'Icons' },
  { name: 'Zod', version: '3.24.2', category: 'Validation' },
  { name: 'React Hook Form', version: '7.54.2', category: 'Forms' },
];

export default function TechSpecsPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter">
            Technical Specifications
          </h1>
          <p className="text-muted-foreground">
            A detailed list of the technologies and versions used in this
            project.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Core Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-semibold">{tech.name}</p>
                    <p className="text-sm text-muted-foreground">
                      v{tech.version}
                    </p>
                  </div>
                  <Badge variant="secondary">{tech.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
