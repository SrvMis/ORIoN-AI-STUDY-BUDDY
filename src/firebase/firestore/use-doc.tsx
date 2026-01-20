'use client';

export const useDoc = <T extends any>(path: string) => {
  return { data: null, isLoading: false, error: null };
};
