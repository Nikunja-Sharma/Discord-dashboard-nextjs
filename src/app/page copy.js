import LoginButton from '@/components/LoginButton';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ServerList from '@/components/ServerList';
const session = await getServerSession(authOptions);

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Discord Server Viewer</h1>
      {session ? (
        <>
          <p className="mb-4">Welcome, {session.user.name}!</p>
          <ServerList />
          <LoginButton />
        </>
      ) : (
        <LoginButton />
      )}
    </main>
  );
}