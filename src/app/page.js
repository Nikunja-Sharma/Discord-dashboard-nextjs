import LoginButton from "@/components/LoginButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Bot, MessageCircle, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0b14] text-white">
      <header className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <span className="text-xl font-bold">DiscordBot</span>
        </div>
        <nav className="hidden space-x-4 md:flex">
          <a href="#features" className="hover:text-purple-400">Features</a>
          <a href="#pricing" className="hover:text-purple-400">Pricing</a>
          <a href="#docs" className="hover:text-purple-400">Docs</a>
        </nav>
        <div className="flex space-x-2">
          <LoginButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Supercharge Your Discord Server</h1>
          <p className="mb-8 text-xl text-gray-400">Engage your community with AI-powered conversations and moderation</p>
          <div className="flex justify-center space-x-4">
            <Link href="/servers">
              <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
            </Link>
            <Button variant="outline" className="text-purple-400 hover:bg-purple-900">Watch Demo</Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-[#1a1b2e] p-6">
            <MessageCircle className="mb-4 h-10 w-10 text-purple-400" />
            <h2 className="mb-2 text-xl font-semibold">Natural Conversations</h2>
            <p className="text-gray-400">Our AI understands context and nuance, providing human-like interactions.</p>
          </div>
          <div className="rounded-lg bg-[#1a1b2e] p-6">
            <Zap className="mb-4 h-10 w-10 text-yellow-400" />
            <h2 className="mb-2 text-xl font-semibold">Instant Responses</h2>
            <p className="text-gray-400">Lightning-fast replies keep your community engaged 24/7.</p>
          </div>
          <div className="rounded-lg bg-[#1a1b2e] p-6">
            <Bot className="mb-4 h-10 w-10 text-green-400" />
            <h2 className="mb-2 text-xl font-semibold">Custom Commands</h2>
            <p className="text-gray-400">Tailor the bot to your server's needs with easy-to-create custom commands.</p>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-[#1a1b2e] p-8">
          <h2 className="mb-4 text-2xl font-semibold">Join the DiscordBot Community</h2>
          <p className="mb-4 text-gray-400">Stay updated with the latest features and tips.</p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="bg-[#0a0b14] text-white" />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>

      <footer className="bg-[#0a0b14] py-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 DiscordBot. All rights reserved.</p>
      </footer>
    </div>
  )
}