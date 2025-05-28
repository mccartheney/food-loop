import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

interface User {
  name: string;
  avatar: string;
  location?: string; 
}

interface Conversation {
  id: number;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface MessageListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const MessageList: React.FC<MessageListProps> = ({ conversations, activeConversation, onSelectConversation }) => {
  return (
    <div className="flex flex-col h-full rounded-3xl bg-white shadow-md overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-600">Your messages</h2>
      </div>
      
      {/* Search bar - removed border-b */}
      <div className="px-4 pb-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-1">
          {conversations.map((conversation, index) => (
            <div key={conversation.id}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                whileTap={{ scale: 0.995 }}
                className={`flex items-center px-4 py-2.5 cursor-pointer ${
                  activeConversation?.id === conversation.id ? 'bg-violet-50' : ''
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    {conversation.user.avatar ? (
                      <Image
                        src={conversation.user.avatar}
                        alt={conversation.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="text-xl text-slate-400">
                        {conversation.user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-700">{conversation.user.name}</p>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {conversation.user.location ? `I'm from ${conversation.user.location}` : ''}
                  </p>
                </div>
              </motion.div>
              
              {/* Light gray divider line for all conversations */}
              {index < conversations.length - 1 && (
                <div className="h-px bg-gray-100 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageList;