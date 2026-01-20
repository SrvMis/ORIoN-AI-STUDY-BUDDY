'use client';

import { BookOpen } from 'lucide-react';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { useTranslation } from '@/hooks/use-translation';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <span className="text-lg font-bold">SB</span>
      </div>
      <h1 className="text-lg font-bold">{t('AI Study Buddy')}</h1>
    </div>
  );
};

export default Logo;
