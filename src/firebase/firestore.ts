'use client';
import {
  doc,
  setDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Creates or updates a user's profile in Firestore.
 * @param firestore - The Firestore instance.
 * @param user - The Firebase Auth user object.
 */
export function setUserProfile(firestore: Firestore, user: User) {
  const userProfileRef = doc(firestore, 'users', user.uid);
  const profileData = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
  };

  setDoc(userProfileRef, profileData, { merge: true }).catch(async (err) => {
    const permissionError = new FirestorePermissionError({
      path: userProfileRef.path,
      operation: 'write',
      requestResourceData: profileData,
    });
    errorEmitter.emit('permission-error', permissionError);
    console.error('Error setting user profile:', err);
  });
}
