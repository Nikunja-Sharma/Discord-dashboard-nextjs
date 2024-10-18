import React, { useState, useEffect } from 'react';

const BotManagement = () => {
  const [allBots, setAllBots] = useState([]);
  const [activeBots, setActiveBots] = useState([]);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBotModalOpen, setIsAddBotModalOpen] = useState(false);

  useEffect(() => {
    fetchBots();
  }, []);

  // Filter out duplicate bots, keeping only the most recent one
  const filterDuplicateBots = (bots) => {
    const botMap = new Map();
    // Sort by _id in descending order to get the most recent entries first
    // MongoDB ObjectIDs contain a timestamp, so sorting by _id will sort by creation time
    bots.sort((a, b) => b._id.localeCompare(a._id));
    
    // Keep only the first (most recent) occurrence of each botId
    bots.forEach(bot => {
      if (!botMap.has(bot.botId)) {
        botMap.set(bot.botId, bot);
      }
    });

    return Array.from(botMap.values());
  };

  const fetchBots = async () => {
    try {
      const [allBotsRes, activeBotsRes] = await Promise.all([
        fetch('http://localhost:5000/bots/all'),
        fetch('http://localhost:5000/bots/list')
      ]);

      const allBotsData = await allBotsRes.json();
      const activeBotsData = await activeBotsRes.json();

      // Filter out duplicates before setting state
      const uniqueBots = filterDuplicateBots(allBotsData);
      setAllBots(uniqueBots);
      setActiveBots(activeBotsData.activeBots || []);
    } catch (error) {
      console.error('Error fetching bots:', error);
      setMessage('Error fetching bots');
    }
  };

  const handleAddBot = async () => {
    if (!token) {
      setMessage('Please enter a token.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/bots/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Bot details not found.") {
          setMessage('Bot not found. Would you like to add it first?');
          setIsAddBotModalOpen(true);
          return;
        }
        throw new Error(data.error || 'Failed to start bot');
      }

      await fetchBots();
      setToken('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error starting bot:', error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewBot = async () => {
    try {
      const response = await fetch('http://localhost:5000/bots/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Failed to add bot');
      }

      await fetchBots();
      setToken('');
      setIsAddBotModalOpen(false);
      setIsModalOpen(false);
      setMessage('Bot added successfully!');
    } catch (error) {
      setMessage('Error adding bot: ' + error.message);
    }
  };

  const toggleBotStatus = async (bot, isActive) => {
    try {
      const response = await fetch(`http://localhost:5000/bots/${isActive ? 'stop' : 'start'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: bot.token }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Bot details not found.") {
          setMessage('Bot not found. Please try adding it again.');
          return;
        }
        throw new Error(data.error || `Failed to ${isActive ? 'stop' : 'start'} bot`);
      }

      await fetchBots();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isBotActive = (botId) => {
    return activeBots.some(bot => bot.botId === botId);
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-[#1a1b2e] p-4 rounded">
          <button onClick={onClose} className="text-red-500 mb-4">Close</button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Bot Card */}
        <div className="rounded-lg bg-[#1a1b2e] p-6 flex items-center justify-center flex-col">
          <div
            onClick={() => setIsModalOpen(true)}
            className="mb-4 h-10 w-10 rounded-full flex justify-center items-center bg-[#24253d] hover:cursor-pointer hover:bg-[#2a2b43]"
          >
            +
          </div>
          <h2 className="mb-2 text-[#80819d] text-xl font-semibold">Add Bots</h2>
          {message && <p className="text-center text-red-400">{message}</p>}
        </div>

        {/* Bot Cards */}
        {loading ? (
          <p className="text-center text-gray-400">Loading bots...</p>
        ) : (
          allBots.map((bot) => {
            const isActive = isBotActive(bot.botId);
            return (
              <div key={bot._id} className="rounded-lg bg-[#1a1b2e] p-6">
                <div className="flex justify-between items-start mb-4">
                  <img
                    src={bot.botAvatar}
                    alt={`${bot.botName} icon`}
                    className="h-10 w-10 rounded-full"
                  />
                  <button
                    onClick={() => toggleBotStatus(bot, isActive)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      isActive 
                        ? 'bg-[#24253d] text-green-400 hover:bg-[#2a2b43]' 
                        : 'bg-[#24253d] text-[#80819d] hover:bg-[#2a2b43]'
                    }`}
                  >
                    {!isActive ? '⚡' : '💤'}
                  </button>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-white">{bot.botName}</h2>
                <p className="text-sm text-[#80819d]">{bot.botTag}</p>
                <p className="text-xs text-[#80819d] mt-2">Status: <span className={`${isActive ? 'text-green-400' : 'text-[#ff3131]'}`}>{isActive ? 'Online' : 'Offline'}</span></p>
              </div>
            );
          })
        )}
      </div>

      {/* Start Bot Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-white mb-4">Start a bot</h2>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter bot token"
            className="w-full bg-[#24253d] text-white border border-[#2a2b43] p-2 rounded mb-4"
          />
          <button 
            onClick={handleAddBot} 
            className="w-full bg-[#24253d] text-white p-2 rounded hover:bg-[#2a2b43]"
          >
            Start Bot
          </button>
        </div>
      </Modal>

      {/* Add New Bot Modal */}
      <Modal isOpen={isAddBotModalOpen} onClose={() => setIsAddBotModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-white mb-4">Bot not found. Add new bot?</h2>
          <p className="text-[#80819d] mb-4">This bot token isn't registered. Would you like to add it as a new bot?</p>
          <div className="flex gap-4">
            <button 
              onClick={handleAddNewBot}
              className="flex-1 bg-[#24253d] text-white p-2 rounded hover:bg-[#2a2b43]"
            >
              Add New Bot
            </button>
            <button 
              onClick={() => setIsAddBotModalOpen(false)}
              className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BotManagement;