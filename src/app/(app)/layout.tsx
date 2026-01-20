'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  FileText,
  Trash2,
  BookText,
  Feather,
  Languages,
} from 'lucide-react';
import Logo from '@/components/common/logo';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LanguageProvider, useLanguage, availableLanguages } from '@/context/language-provider';
import { useTranslation } from '@/hooks/use-translation';


function SidebarContent() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarNavItems = [
    { href: '/chat', icon: GraduationCap, label: t('Explain Topic') },
    { href: '/quiz', icon: FileText, label: t('Generate Quiz') },
    { href: '/summarizer', icon: BookText, label: t('Summarize Text') },
    { href: '/story', icon: Feather, label: t('Create a Story') },
  ];

  return (
    <>
      <header className="flex items-center gap-2">
        <Logo />
      </header>

      <div className="space-y-4">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('Modes')}
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
              <span>{t('Clear Chat')}</span>
            </Link>
          </Button>
        </nav>
      </div>

      <div className="mt-auto space-y-4">
        <h2 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('Configuration')}
        </h2>
        <div className="flex items-center justify-between rounded-lg border bg-card p-3">
          <span className="text-sm font-medium">{t('Dark Mode')}</span>
          <ThemeToggle />
        </div>
        <div className="rounded-lg border bg-card p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('Language')}</span>
            <Languages className="h-5 w-5 text-muted-foreground" />
          </div>
          {mounted && (
            <Select
              onValueChange={(value) => setLanguage(value as any)}
              defaultValue={language}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder={t('Select language')} />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTab = ['/chat', '/quiz', '/summarizer', '/story'].includes(pathname)
    ? '/chat'
    : pathname;

  const tabNavItems = [
    { href: '/chat', label: t('Interactive Prototype') },
    { href: '/system-architecture', label: t('System Architecture') },
    { href: '/tech-specs', label: t('Tech Specs') },
  ];
  
  return (
      <div className="flex min-h-screen bg-background font-sans text-foreground">
        {/* Left Sidebar */}
        <aside className="flex h-screen w-72 flex-col gap-8 border-r bg-secondary/50 p-4">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <header className="border-b bg-card px-6 py-2">
            {mounted && (
              <Tabs value={activeTab} className="w-full">
                <TabsList>
                  {tabNavItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <TabsTrigger value={item.href}>{item.label}</TabsTrigger>
                    </Link>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
   return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}
