'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  GraduationCap,
  FileText,
  Trash2,
  MessageSquare,
  Network,
  Cpu,
} from 'lucide-react';
import Logo from '@/components/common/logo';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const sidebarNavItems = [
  { href: '/chat', icon: GraduationCap, label: 'Explain Topic' },
  { href: '/quiz', icon: FileText, label: 'Generate Quiz' },
];

const tabNavItems = [
  { href: '/chat', label: 'Interactive Prototype' },
  { href: '/system-architecture', label: 'System Architecture' },
  { href: '/tech-specs', label: 'Tech Specs' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      {/* Left Sidebar */}
      <aside className="flex h-screen w-72 flex-col gap-8 border-r bg-secondary/50 p-4">
        <header className="flex items-center gap-2">
          <Logo />
        </header>

        <div className="space-y-4">
          <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Modes
          </h2>
          <nav className="flex flex-col gap-2">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className="justify-start gap-3 px-3"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="justify-start gap-3 px-3"
              asChild
            >
              <Link href="/chat">
                <Trash2 className="h-5 w-5" />
                <span>Clear Chat</span>
              </Link>
            </Button>
          </nav>
        </div>

        <div className="mt-auto space-y-4">
          <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Configuration
          </h2>
          <div className="flex items-center justify-between rounded-lg border bg-card p-3">
            <span className="text-sm font-medium">Dark Mode</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="border-b bg-card px-6 py-2">
          <Tabs value={pathname} className="w-full">
            <TabsList>
              {tabNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <TabsTrigger value={item.href}>{item.label}</TabsTrigger>
                </Link>
              ))}
            </TabsList>
          </Tabs>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
