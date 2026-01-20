'use client';

import React, { createContext, useContext } from 'react';

const FirebaseContext = createContext<any>(null);

export const FirebaseProvider: React.FC<{
  children: React.ReactNode;
  value: any;
}> = ({ children }) => {
  return <>{children}</>;
};

export const useFirebase = () => null;
export const useFirebaseApp = () => null;
export const useAuth = () => null;
export const useFirestore = () => null;
