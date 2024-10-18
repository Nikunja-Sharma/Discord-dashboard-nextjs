'use client';

import { useState, useEffect } from 'react';

export default function ChannelList({ serverId, accessToken }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serverId && accessToken) {
      console.log('Access Token:', accessToken); // Debugging log
      console.log('Server ID:', serverId); // Debugging log
      fetchChannels();
    }
  }, [serverId, accessToken]);

  const fetchChannels = async (serverId, accessToken) => {
    try {
      const response = await fetch(`https://discord.com/api/v10/guilds/1223691959592554576/channels`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // or `Bot ${accessToken}` if using a bot token
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched channels:', data);
      return data;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  };

  if (loading) return <p>Loading channels...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ul className="space-y-2 mt-4">
      {channels.map((channel) => (
        <li key={channel.id} className="bg-gray-50 p-2 rounded">
          # {channel.name}
        </li>
      ))}
    </ul>
  );
}