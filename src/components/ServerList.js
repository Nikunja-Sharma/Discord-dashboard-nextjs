import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Bot } from "lucide-react";

export default function ServerPage() {
  const { data: session } = useSession();
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.accessToken) {
      fetchGuilds(session.accessToken);
    }
  }, [session]);

  const fetchGuilds = async (accessToken) => {
    try {
      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGuilds(data);
    } catch (error) {
      console.error('Error fetching guilds:', error);
      setGuilds([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white">
      <header className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          
          <span className="text-xl font-bold">Your Discord Servers</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-gray-400">Loading servers...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guilds.length === 0 ? (
              <p className="text-gray-600">No servers available.</p>
            ) : (
              guilds.map((guild) => (
                <div key={guild.id} className="rounded-lg bg-[#1a1b2e] p-6">
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={`${guild.name} icon`}
                    className="mb-4 h-10 w-10 rounded-full"
                  />
                  <h2 className="mb-2 text-xl font-semibold">{guild.name}</h2>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className="bg-[#0a0b14] py-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 DiscordBot. All rights reserved.</p>
      </footer>
    </div>
  );
}