import { Plus, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface ChatHistory {
  id: string
  title: string
  timestamp: string
}

interface ChatSidebarProps {
  chatHistory: ChatHistory[]
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  activeChatId?: string
}

export function ChatSidebar({ chatHistory, onNewChat, onSelectChat, activeChatId }: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">AI Chat</h1>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <Separator />

      {/* Chat History */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-100 ${
                activeChatId === chat.id ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {chat.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {chat.timestamp}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}