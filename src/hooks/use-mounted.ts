'use client';

import { useEffect, useState } from 'react';

/** Returns `true` after the first client paint. Use sparingly to avoid hydration issues. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
