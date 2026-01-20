'use client';

import React, { useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { FirebaseProvider } from '@/firebase/provider';

interface FirebaseClientProviderProps {
  children: React.ReactNode;
}

export const FirebaseClientProvider: React.FC<FirebaseClientProviderProps> = ({
  children,
}) => {
  const [firebaseInstances, setFirebaseInstances] = useState<{
    firebaseApp: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
  }>({
    firebaseApp: null,
    auth: null,
    firestore: null,
  });

  useEffect(() => {
    const instances = initializeFirebase();
    setFirebaseInstances(instances);
  }, []);

  return (
    <FirebaseProvider value={firebaseInstances}>{children}</FirebaseProvider>
  );
};
