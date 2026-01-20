'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  collection,
  query,
  onSnapshot,
  Query,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const useCollection = <T extends DocumentData>(
  path: string,
  q?: Query
) => {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const collectionQuery = useMemo(
    () => (firestore ? q || query(collection(firestore, path)) : null),
    [firestore, path, q]
  );

  useEffect(() => {
    if (!collectionQuery) {
      if (!firestore) {
        setIsLoading(false);
      }
      return;
    }

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot: QuerySnapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(docs);
        setIsLoading(false);
      },
      (err: FirestoreError) => {
        const permissionError = new FirestorePermissionError({
            path: collectionQuery.path,
            operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionQuery, firestore]);

  return { data, isLoading, error };
};
