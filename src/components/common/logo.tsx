import { BookOpen } from 'lucide-react';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <BookOpen className="h-6 w-6" />
      <h1 className="font-headline text-xl font-bold">StudyVerse</h1>
    </div>
  );
};

export default Logo;
