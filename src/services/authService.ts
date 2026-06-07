import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser,
  type Unsubscribe,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export type AuthUser = {
  id: string
  email: string
  name: string
  avatar: string | null
  createdAt: string
}

function mapFirebaseUser(user: FirebaseUser): AuthUser {
  return {
    id: user.uid,
    email: user.email ?? '',
    name: user.displayName ?? user.email?.split('@')[0] ?? 'User',
    avatar: user.photoURL,
    createdAt: user.metadata.creationTime ?? new Date().toISOString(),
  }
}

async function register(
  email: string,
  password: string,
  displayName: string
): Promise<AuthUser> {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName })
  return mapFirebaseUser(credential.user)
}

async function login(email: string, password: string): Promise<AuthUser> {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return mapFirebaseUser(credential.user)
}

async function loginWithGoogle(): Promise<AuthUser> {
  const provider = new GoogleAuthProvider()
  const credential = await signInWithPopup(auth, provider)
  return mapFirebaseUser(credential.user)
}

async function logout(): Promise<void> {
  await signOut(auth)
}

async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser
}

function onSessionChange(callback: (user: AuthUser | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, firebaseUser => {
    callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null)
  })
}

export const authService = {
  register,
  login,
  loginWithGoogle,
  logout,
  sendPasswordReset,
  getCurrentUser,
  onSessionChange,
}
