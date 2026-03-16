import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let db: FirebaseFirestore.Firestore | null = null;
let hasLoggedWarning = false;

export const getDb = () => {
  if (db) return db;

  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountEnv) {
    if (!hasLoggedWarning) {
      console.warn('FIREBASE_SERVICE_ACCOUNT environment variable is missing. Scheduled publishing is disabled.');
      hasLoggedWarning = true;
    }
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountEnv);
    if (getApps().length === 0) {
      const app = initializeApp({
        credential: cert(serviceAccount),
        projectId: firebaseConfig.projectId,
      });
      db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    } else {
      db = getFirestore(getApps()[0], firebaseConfig.firestoreDatabaseId);
    }
    return db;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin with provided service account:', error);
    return null;
  }
};

export const getScheduledPosts = async () => {
  const database = getDb();
  if (!database) return [];

  const now = new Date();
  const snapshot = await database.collection('posts')
    .where('status', '==', 'scheduled')
    .where('scheduledDate', '<=', now)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const markPostAsPublished = async (postId: string) => {
  const database = getDb();
  if (!database) return;

  await database.collection('posts').doc(postId).update({ status: 'published' });
};
