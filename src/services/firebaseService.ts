import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp, doc, updateDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

export interface UserSettings {
  timezone: string;
  timeSlots: { time: string; hours: number; days: boolean[] }[];
}

export const getUserSettings = async (): Promise<UserSettings | null> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const docSnap = await getDocs(query(collection(db, 'users'), where('__name__', '==', user.uid)));
  
  if (!docSnap.empty) {
    return docSnap.docs[0].data() as UserSettings;
  }
  return null;
};

export const saveUserSettings = async (settings: UserSettings) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, settings, { merge: true });
};

export interface Post {
  id?: string;
  title: string;
  content: string;
  platform: 'linkedin' | 'youtube' | 'instagram';
  status: 'draft' | 'approved' | 'scheduled';
  scheduledDate?: Date | null;
  authorUID: string;
  createdAt: Date;
}

export const savePost = async (post: Omit<Post, 'id' | 'authorUID' | 'createdAt'>) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const postData = {
    ...post,
    authorUID: user.uid,
    createdAt: Timestamp.now(),
    scheduledDate: post.scheduledDate ? Timestamp.fromDate(post.scheduledDate) : null,
  };

  return await addDoc(collection(db, 'posts'), postData);
};

export const getApprovedPosts = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const q = query(
    collection(db, 'posts'),
    where('authorUID', '==', user.uid),
    where('status', '==', 'approved')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    scheduledDate: doc.data().scheduledDate ? doc.data().scheduledDate.toDate() : null,
  })) as Post[];
};

export const updatePostSchedule = async (postId: string, scheduledDate: Date) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { 
    status: 'scheduled',
    scheduledDate: Timestamp.fromDate(scheduledDate) 
  });
};

export const updatePostStatus = async (postId: string, status: 'draft' | 'approved' | 'scheduled') => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { status });
};

export const subscribeToPosts = (
  status: 'draft' | 'approved' | 'scheduled',
  callback: (posts: Post[]) => void
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const q = query(
    collection(db, 'posts'),
    where('authorUID', '==', user.uid),
    where('status', '==', status)
  );

  return onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      scheduledDate: doc.data().scheduledDate ? doc.data().scheduledDate.toDate() : null,
    })) as Post[];
    callback(posts);
  });
};
