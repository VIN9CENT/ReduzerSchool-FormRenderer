'use client';

import dynamic from 'next/dynamic';

const PHProvider = dynamic(
  () => import('@/components/PHProvider').then(mod => mod.PHProvider),
  { ssr: false }
);

export function PHProviderWrapper({ children }: { children: React.ReactNode }) {
  return <PHProvider>{children}</PHProvider>;
}