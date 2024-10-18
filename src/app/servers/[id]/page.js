import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dynamic from 'next/dynamic';

const ChannelList = dynamic(() => import('@/components/ChannelList'), { ssr: false });

export default async function ServerPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Channels for Server ID: {params.id}</h1>
      <ChannelList serverId={params.id} accessToken={session.accessToken} />
    </div>
  );
}