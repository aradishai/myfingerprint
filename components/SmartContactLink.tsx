'use client';
import { useIsMobile } from '@/hooks/useIsMobile';

type Props = {
  waText: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const WA_BASE = 'https://wa.me/972542086591?text=';

export default function SmartContactLink({ waText, className, children, onClick }: Props) {
  const isMobile = useIsMobile();
  const href = isMobile ? `${WA_BASE}${encodeURIComponent(waText)}` : '#contact';
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
