// lib/discordBot.js
import { Client, GatewayIntentBits } from 'discord.js';
import winston from 'winston';

// Set up logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} - ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'discord_bot.log' }),
    new winston.transports.Console()
  ]
});

// Bot configuration
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Store bot status
const botStatus = {
  isOnline: false,
  token: null
};

// Function to update bot's status
export async function updateStatus() {
  try {
    botStatus.isOnline = !botStatus.isOnline;
    const status = botStatus.isOnline ? 'online' : 'invisible';
    await client.user.setStatus(status);
    logger.info(`Bot status changed to ${botStatus.isOnline ? 'online' : 'offline'}`);
    return botStatus.isOnline;
  } catch (error) {
    logger.error(`Error updating status: ${error}`);
    throw error;
  }
}

export async function sendMessage(channelId, message) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
      throw new Error('Channel not found');
    }
    await channel.send(message);
    logger.info(`Message sent to channel ${channelId}: ${message}`);
  } catch (error) {
    logger.error(`Error sending message: ${error}`);
    throw error;
  }
}

export async function setToken(token) {
  try {
    await client.destroy();
    botStatus.token = token;
    await client.login(token);
    botStatus.isOnline = true;
    logger.info(`Logged in as ${client.user.tag}`);
  } catch (error) {
    logger.error(`Failed to set token: ${error}`);
    throw error;
  }
}

export async function getBotStatus() {
  return {
    isOnline: botStatus.isOnline,
    servers: client.guilds.cache.size,
    users: client.users.cache.size,
    uptime: client.uptime ? `${Math.floor(client.uptime / 60000)} minutes` : 'N/A'
  };
}

// Initialize the bot if token is available
if (process.env.DISCORD_BOT_TOKEN) {
  setToken(process.env.DISCORD_BOT_TOKEN).catch(error => {
    logger.error(`Failed to initialize bot: ${error}`);
  });
}