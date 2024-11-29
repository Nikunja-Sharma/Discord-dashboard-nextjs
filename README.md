# Discord Bot Manager

Discord Bot Manager is a Next.js application that allows users to manage multiple Discord bots through a user-friendly web interface. This project integrates with Discord's API to provide bot management capabilities, including starting, stopping, and monitoring bot status.

## Features

- User authentication with Discord
- View and manage multiple Discord bots
- Start and stop bots remotely
- Monitor bot status (online/offline)
- Add new bots to the system
- Responsive design for desktop and mobile devices

## Technologies Used

- Next.js 14
- React
- Discord.js
- NextAuth.js for authentication
- Tailwind CSS for styling

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn package manager
- A Discord account and registered application(s) for your bot(s)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/discord-bot-manager.git
   cd discord-bot-manager
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

   Replace the placeholders with your actual Discord application credentials and NextAuth secret.

## Running the Application

To run the application in development mode:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure
