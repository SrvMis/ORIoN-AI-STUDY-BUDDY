'use client';

export const useCollection = <T extends any>(
  path: string,
  q?: any
) => {
  return { data: null, isLoading: false, error: null };
};
