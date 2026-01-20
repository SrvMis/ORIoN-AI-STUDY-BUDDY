'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProfilePage() {
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

        <Card>
          <CardHeader>
            <CardTitle>Feature Unavailable</CardTitle>
            <CardDescription>
              The user sign-in and profile functionality has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is no longer in use.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
