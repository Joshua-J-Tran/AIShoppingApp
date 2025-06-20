import { useState } from 'react'
import { ChatSidebar } from '@/components/ChatSidebar'
import { ProductShowcase } from '@/components/ProductShowcase'
import { ChatArea } from '@/components/ChatArea'

// Mock data
const mockChatHistory = [
  {
    id: '1',
    title: 'Best wireless headphones under $200',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Gaming laptop recommendations',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    title: 'Running shoes for marathon training',
    timestamp: '3 days ago'
  }
]

const mockProducts = [
  {
    id: '1',
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    price: '$279.99',
    originalPrice: '$349.99',
    rating: 4.8,
    reviewCount: 12543,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    store: 'Amazon',
    discount: '20% OFF'
  },
  {
    id: '2',
    name: 'Apple AirPods Pro (2nd Generation)',
    price: '$199.99',
    originalPrice: '$249.99',
    rating: 4.7,
    reviewCount: 8932,
    image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=300',
    store: 'Best Buy',
    discount: '20% OFF'
  },
  {
    id: '3',
    name: 'Bose QuietComfort 45 Bluetooth Headphones',
    price: '$249.99',
    originalPrice: '$329.99',
    rating: 4.6,
    reviewCount: 5621,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    store: 'Target',
    discount: '24% OFF'
  }
]

const mockMessages = [
  {
    id: '1',
    content: 'Hi! I\'m looking for wireless headphones under $300. Can you help me find the best options?',
    sender: 'user' as const,
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    content: 'I\'d be happy to help you find the best wireless headphones under $300! I\'ve found some excellent options that are currently on sale. Let me show you the top 3 picks based on reviews, features, and value:\n\n1. **Sony WH-1000XM4** - Excellent noise cancellation and sound quality\n2. **Apple AirPods Pro (2nd Gen)** - Great for iOS users with spatial audio\n3. **Bose QuietComfort 45** - Superior comfort for long listening sessions\n\nAll of these are currently discounted and have excellent reviews. Would you like me to provide more details about any specific model?',
    sender: 'ai' as const,
    timestamp: '10:31 AM'
  }
]

function App() {
  const [activeChatId, setActiveChatId] = useState('1')
  const [messages, setMessages] = useState(mockMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewChat = () => {
    setMessages([])
    setActiveChatId('')
  }

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId)
    // In a real app, you would load the messages for this chat
    setMessages(mockMessages)
  }

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: 'I understand you\'re looking for product recommendations. Let me search for the best options and compare prices across different retailers for you.',
        sender: 'ai' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar - 1/8 width */}
      <div className="w-1/8 min-w-[280px]">
        <ChatSidebar
          chatHistory={mockChatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
        />
      </div>

      {/* Main Chat Area - 7/8 width */}
      <div className="flex-1 flex flex-col">
        {/* Product Showcase */}
        <ProductShowcase products={mockProducts} />

        {/* Chat Area */}
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default App