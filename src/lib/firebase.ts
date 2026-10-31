import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, collection, getDocFromServer 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with the provisioned firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial Firestore connection per guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client is offline or network is disconnected.");
    }
    return false;
  }
}

export interface SubscriberRecord {
  name: string;
  email: string;
  isVipWaitlist: boolean;
  selectedFormats?: string[];
  source?: string;
  createdAt?: string;
}

/**
 * Saves a new subscriber to the Firestore 'subscribers' collection.
 * Uses a sanitized document ID based on email hash or timestamp to prevent collisions.
 */
export async function saveSubscriberToFirestore(data: SubscriberRecord): Promise<string> {
  const sanitizedEmail = data.email.trim().toLowerCase();
  // Safe ID adhering to ^[a-zA-Z0-9_\-]+$
  const safeId = `${Date.now()}_${sanitizedEmail.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50)}`;
  const collectionPath = 'subscribers';

  const payload = {
    name: data.name.trim(),
    email: sanitizedEmail,
    isVipWaitlist: Boolean(data.isVipWaitlist),
    selectedFormats: data.selectedFormats || [],
    source: data.source || 'hero_starter_kit',
    createdAt: new Date().toISOString(),
  };

  try {
    const subscriberRef = doc(db, collectionPath, safeId);
    await setDoc(subscriberRef, payload);
    return safeId;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${collectionPath}/${safeId}`);
  }
}
