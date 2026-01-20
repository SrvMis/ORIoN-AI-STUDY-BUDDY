'use client';

import React from 'react';

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children,
}) => {
  return <>{children}</>;
};
