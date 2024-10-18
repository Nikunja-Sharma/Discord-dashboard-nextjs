'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    if (typeof window !== 'undefined' && window.location.pathname !== '/sadas') {
      return (
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
          Sign out
        </button>
      );
    }
    return null;
  }
  return (
    <button onClick={() => signIn('discord')} className="bg-blue-500 text-white px-4 py-2 rounded">
      Sign in
    </button>
  );
}