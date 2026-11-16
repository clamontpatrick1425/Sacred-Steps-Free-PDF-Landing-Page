import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  getDocFromServer,
  query,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with the provisioned firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const ADMIN_EMAIL = 'clamontpatrick@gmail.com';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

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
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
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
      console.warn('Firestore client is offline or network is disconnected.');
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

export interface SubscriberDocument extends SubscriberRecord {
  id: string;
}

/**
 * Saves a new subscriber to the Firestore 'subscribers' collection.
 * Adheres strictly to firebase-blueprint.json boundary limits.
 */
export async function saveSubscriberToFirestore(data: SubscriberRecord): Promise<string> {
  const sanitizedEmail = data.email.trim().toLowerCase().slice(0, 150);
  const sanitizedName = data.name.trim().slice(0, 100);
  const safeId = `${Date.now()}_${sanitizedEmail.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 50)}`;
  const collectionPath = 'subscribers';

  const payload = {
    name: sanitizedName,
    email: sanitizedEmail,
    isVipWaitlist: Boolean(data.isVipWaitlist),
    selectedFormats: (data.selectedFormats || []).slice(0, 10),
    source: (data.source || 'hero_starter_kit').slice(0, 50),
    createdAt: new Date().toISOString().slice(0, 50),
  };

  try {
    const subscriberRef = doc(db, collectionPath, safeId);
    await setDoc(subscriberRef, payload);
    return safeId;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `${collectionPath}/${safeId}`);
  }
}

/**
 * Lists all subscribers from Firestore (Admin only per firestore.rules).
 */
export async function fetchSubscribersFromFirestore(): Promise<SubscriberDocument[]> {
  const collectionPath = 'subscribers';
  try {
    const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as SubscriberRecord),
    }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, collectionPath);
  }
}

/**
 * Deletes a subscriber record by ID (Admin only per firestore.rules).
 */
export async function deleteSubscriberFromFirestore(subscriberId: string): Promise<void> {
  const path = `subscribers/${subscriberId}`;
  try {
    await deleteDoc(doc(db, 'subscribers', subscriberId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
