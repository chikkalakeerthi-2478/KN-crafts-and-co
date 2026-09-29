import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}

const N8N_WEBHOOK_URL =
  'https://navkee.app.n8n.cloud/webhook/53ba3333-7904-4e00-b5d9-3a5f5348fcb8/chat';

const QUICK_PROMPTS = [
  '💐 What handmade bouquets do you offer?',
  '🪔 Tell me about the Fairy Bell lamp',
  '🧸 Can I customize a pet keychain?',
  '🎁 What are the delivery & shipping options?'
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: "Hi there! 🌸 Welcome to Twist & Bloom Studio. I'm your AI craft assistant, powered by our studio knowledge base. How can I help you pick or customize the perfect pipe-cleaner keepsake today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [sessionId, setSessionId] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or retrieve session ID for n8n memory
  useEffect(() => {
    let sid = sessionStorage.getItem('twist_bloom_chat_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('twist_bloom_chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to n8n webhook
      // n8n Chat Trigger nodes accept { chatInput, sessionId } or { message, sessionId }
      const payload = {
        chatInput: messageText,
        message: messageText,
        sessionId: sessionId || 'default_session',
        action: 'sendMessage'
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorBody = '';
        try {
          errorBody = await response.text();
        } catch {
          // Ignore
        }

        if (response.status === 503) {
          throw new Error(
            'The AI service is currently experiencing high demand (503). Please tap retry or ask again in a moment.'
          );
        }

        throw new Error(
          `Studio AI assistant server responded with status ${response.status}. ${errorBody}`
        );
      }

      // Parse response from n8n
      const contentType = response.headers.get('content-type') || '';
      let replyText = '';

      if (contentType.includes('application/json')) {
        const data = await response.json();

        if (typeof data === 'string') {
          replyText = data;
        } else if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          replyText =
            first?.output ||
            first?.text ||
            first?.message ||
            first?.response ||
            JSON.stringify(first);
        } else if (typeof data === 'object' && data !== null) {
          replyText =
            data.output ||
            data.text ||
            data.message ||
            data.response ||
            data.result ||
            (data.data && (data.data.output || data.data.text)) ||
            JSON.stringify(data);
        } else {
          replyText = String(data);
        }
      } else {
        replyText = await response.text();
      }

      if (!replyText || replyText.trim() === '') {
        replyText =
          "I received your inquiry! If you'd like to place an immediate order, you can also reach our lead artisan Maya directly on WhatsApp.";
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('n8n chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text:
          err.message ||
          'Sorry, I could not reach our n8n studio agent at this moment. Please check your connection or try again shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = () => {
    const newSid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    sessionStorage.setItem('twist_bloom_chat_session_id', newSid);
    setSessionId(newSid);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: "New session started! 🌸 How can I help you with our handmade pipe-cleaner flowers, keychains, or lamps?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Widget Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-2 bg-white text-[#2C2420] text-xs py-1.5 px-3 rounded-full shadow-md border border-[#E8DFD8] flex items-center gap-1.5 cursor-pointer hover:bg-[#FAF7F2] transition-transform animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97C65]" />
            <span className="font-medium">Need craft advice? Chat with AI</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat' : 'Open studio craft AI assistant'}
          className="w-14 h-14 rounded-full bg-[#D97C65] hover:bg-[#C66B54] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D97C65] focus:ring-offset-2"
        >
          {isOpen ? <ChevronDown className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[420px] h-[540px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#E8DFD8] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-[#FAF7F2] border-b border-[#EAE1D9] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#FCECE5] text-[#D97C65] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#487352] rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="text-sm font-serif font-bold text-[#2C2420] flex items-center gap-1.5">
                  <span>Twist &amp; Bloom AI</span>
                  <span className="text-[10px] font-sans font-medium px-1.5 py-0.2 bg-[#EDF4EE] text-[#345E42] rounded">
                    n8n
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6C64]">Handmade Crafts Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetSession}
                title="Restart chat session"
                aria-label="Restart chat session"
                className="p-1.5 text-[#7A6C64] hover:text-[#2C2420] hover:bg-[#F3EBE4] rounded-md transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-1.5 text-[#7A6C64] hover:text-[#2C2420] hover:bg-[#F3EBE4] rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FDFBF7]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#FCECE5] text-[#D97C65] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[80%] space-y-1`}>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#D97C65] text-white rounded-br-xs'
                          : msg.isError
                          ? 'bg-[#FDF2F2] border border-[#F8D7D7] text-[#9B2C2C] rounded-bl-xs'
                          : 'bg-white border border-[#E8DFD8] text-[#2C2420] rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.isError && (
                        <div className="flex items-center gap-1 font-semibold mb-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Temporary Error</span>
                        </div>
                      )}
                      {msg.text}
                    </div>

                    <div
                      className={`text-[10px] text-[#9E9088] px-1 ${
                        isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#EAE0D8] text-[#5F524A] flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading typing bubble */}
            {isLoading && (
              <div className="flex gap-2.5 items-center justify-start">
                <div className="w-7 h-7 rounded-full bg-[#FCECE5] text-[#D97C65] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-[#E8DFD8] py-2.5 px-3.5 rounded-2xl rounded-bl-xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#D97C65] rounded-full animate-pulse" />
                  <span className="w-1.5 h-1.5 bg-[#D97C65] rounded-full animate-pulse delay-150" />
                  <span className="w-1.5 h-1.5 bg-[#D97C65] rounded-full animate-pulse delay-300" />
                  <span className="text-[11px] text-[#7A6C64] ml-1">Consulting studio bot...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (when 1 or 2 messages) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-[#F8F4EE] border-t border-[#EAE1D9] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  className="px-2.5 py-1 text-[11px] bg-white border border-[#DDD3CB] rounded-full text-[#5F524A] hover:bg-[#FAF4EF] hover:text-[#2C2420] hover:border-[#D97C65] transition-all whitespace-nowrap shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[#EAE1D9] flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask about bouquets, custom orders..."
              className="flex-1 px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3CB] rounded-xl text-[#2C2420] placeholder-[#9E9088] focus:outline-none focus:ring-1 focus:ring-[#D97C65] focus:border-[#D97C65] disabled:opacity-60"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="w-8 h-8 rounded-xl bg-[#D97C65] hover:bg-[#C66B54] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
