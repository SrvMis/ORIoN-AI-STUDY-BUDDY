'use client';

import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="h-8 w-8 text-primary">
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <path
            d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeOpacity="0.4"
          />
          <path
            d="M32 48V32L44 24"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 20L20 24"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
           <path
            d="M44 44L40 40"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </svg>
      </div>
      <h1 className="text-lg font-bold">{t('App Name')}</h1>
    </div>
  );
};

export default Logo;
