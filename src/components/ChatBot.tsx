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
  CheckCircle2,
  Settings,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { getStudioKnowledgeResponse } from '../data/studioKnowledge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
  n8nStatusNotice?: string;
  source?: 'n8n' | 'studio-fallback';
}

const DEFAULT_WEBHOOK_URL =
  'https://navkee.app.n8n.cloud/webhook/53ba3333-7904-4e00-b5d9-3a5f5348fcb8/chat';

const QUICK_PROMPTS = [
  '💐 What handmade bouquets do you offer?',
  '🪔 Tell me about the Fairy Bell lamp',
  '🧸 Can I customize a pet keychain?',
  '🎁 What are the delivery & shipping options?'
];

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('twist_bloom_n8n_url') || DEFAULT_WEBHOOK_URL;
  });
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionHealth, setConnectionHealth] = useState<{
    status: 'idle' | 'success' | 'warning' | 'error';
    message?: string;
  }>({ status: 'idle' });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: "Hi there! 🌸 Welcome to Twist & Bloom Studio. I'm your AI craft assistant, trained on our pipe-cleaner floral catalog and custom orders. How can I help you pick or customize the perfect keepsake today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'n8n'
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [sessionId, setSessionId] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session ID for n8n memory
  useEffect(() => {
    let sid = sessionStorage.getItem('twist_bloom_chat_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem('twist_bloom_chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Save webhook URL if changed
  const handleSaveWebhook = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('twist_bloom_n8n_url', url);
  };

  // Auto-scroll on new messages
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

  // Quick health test function for n8n webhook
  const testWebhookHealth = async () => {
    setTestingConnection(true);
    setConnectionHealth({ status: 'idle' });

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatInput: 'ping',
          message: 'ping',
          sessionId: 'health_test'
        })
      });

      const responseText = await res.text();

      if (res.status === 200 || res.ok) {
        setConnectionHealth({
          status: 'success',
          message: 'Active & Connected! n8n responded successfully.'
        });
      } else if (res.status === 404 && responseText.includes('not registered')) {
        setConnectionHealth({
          status: 'warning',
          message:
            'Workflow Inactive (404): In your n8n editor, toggle the "Active" switch ON in the top-right corner to activate this production URL.'
        });
      } else if (res.status === 503 || responseText.includes('503')) {
        setConnectionHealth({
          status: 'warning',
          message:
            'Gemini 503 Spike: Google API is experiencing temporary high demand. Enable "Retry On Fail" in your n8n AI Agent node settings.'
        });
      } else {
        setConnectionHealth({
          status: 'error',
          message: `HTTP ${res.status}: ${responseText.slice(0, 160)}`
        });
      }
    } catch (e: any) {
      setConnectionHealth({
        status: 'error',
        message: e.message || 'Network error or CORS issue reaching n8n URL.'
      });
    } finally {
      setTestingConnection(false);
    }
  };

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

    let replyText = '';
    let statusNotice: string | undefined = undefined;
    let source: 'n8n' | 'studio-fallback' = 'n8n';

    try {
      const payload = {
        chatInput: messageText,
        message: messageText,
        sessionId: sessionId || 'default_session',
        action: 'sendMessage'
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();

      if (response.ok) {
        // Successful response from active n8n workflow
        try {
          const data = JSON.parse(responseText);
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
          }
        } catch {
          replyText = responseText;
        }
      } else {
        // Handle n8n 404 (Workflow Inactive) or 503 (Gemini Spike) with instant fallback
        source = 'studio-fallback';

        if (response.status === 404 && responseText.includes('not registered')) {
          statusNotice =
            '💡 n8n Workflow Inactive (404): Toggle the "Active" switch ON in the top-right of your n8n canvas to activate this production URL. We answered your question below using our studio catalog:';
        } else if (response.status === 503 || responseText.includes('503')) {
          statusNotice =
            '💡 Google AI model experiencing temporary high demand (503). Answering from our verified studio catalog:';
        } else {
          statusNotice = `💡 n8n responded with status ${response.status}. Answering from verified studio catalog:`;
        }

        // Get smart fallback answer so customer is never left waiting
        replyText = getStudioKnowledgeResponse(messageText);
      }
    } catch (err: any) {
      console.warn('n8n request failed, using studio fallback:', err);
      source = 'studio-fallback';
      statusNotice =
        '💡 Could not connect to n8n webhook directly (likely CORS or network). Answering from our verified studio catalog:';
      replyText = getStudioKnowledgeResponse(messageText);
    } finally {
      setIsLoading(false);
    }

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: replyText || getStudioKnowledgeResponse(messageText),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      n8nStatusNotice: statusNotice,
      source
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleResetSession = () => {
    const newSid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    sessionStorage.setItem('twist_bloom_chat_session_id', newSid);
    setSessionId(newSid);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: "New session started! 🌸 How can I help you pick or customize our pipe-cleaner flowers, keychains, or lamps?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'n8n'
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const switchToTestUrl = () => {
    const testUrl = webhookUrl.replace('/webhook/', '/webhook-test/');
    handleSaveWebhook(testUrl);
  };

  const switchToProdUrl = () => {
    const prodUrl = webhookUrl.replace('/webhook-test/', '/webhook/');
    handleSaveWebhook(prodUrl);
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
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[440px] h-[570px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-[#E8DFD8] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-[#FAF7F2] border-b border-[#EAE1D9] px-4 py-3 flex items-center justify-between">
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
                onClick={() => setShowSettings(!showSettings)}
                title="n8n Webhook Settings & Health Check"
                aria-label="n8n Webhook Settings"
                className={`p-1.5 rounded-md transition-colors ${
                  showSettings
                    ? 'bg-[#EAE0D8] text-[#2C2420]'
                    : 'text-[#7A6C64] hover:text-[#2C2420] hover:bg-[#F3EBE4]'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
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

          {/* Settings / Diagnostic Panel */}
          {showSettings && (
            <div className="p-4 bg-[#FAF7F2] border-b border-[#EAE1D9] text-xs space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2C2420]">n8n Webhook Configuration</span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-[#7A6C64] hover:text-[#2C2420]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5F524A] mb-1">
                  Active Webhook URL:
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => handleSaveWebhook(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-[#DDD3CB] rounded-md text-[#2C2420] focus:ring-1 focus:ring-[#D97C65] focus:outline-none"
                />
              </div>

              {/* Mode switch */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#7A6C64]">Mode:</span>
                {webhookUrl.includes('/webhook-test/') ? (
                  <button
                    onClick={switchToProdUrl}
                    className="px-2 py-0.5 text-[10px] bg-white border border-[#DDD3CB] rounded font-semibold text-[#D97C65] hover:bg-[#FAF4EF]"
                  >
                    Switch to Production URL
                  </button>
                ) : (
                  <button
                    onClick={switchToTestUrl}
                    className="px-2 py-0.5 text-[10px] bg-white border border-[#DDD3CB] rounded font-semibold text-[#345E42] hover:bg-[#FAF4EF]"
                  >
                    Switch to Test URL
                  </button>
                )}
              </div>

              {/* Test button & status */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  onClick={testWebhookHealth}
                  disabled={testingConnection}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] rounded-md transition-colors disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${testingConnection ? 'animate-spin' : ''}`}
                  />
                  <span>Test n8n Connection</span>
                </button>

                <div className="text-[11px] text-[#7A6C64]">
                  Smart Studio Fallback: <span className="font-semibold text-[#345E42]">Enabled</span>
                </div>
              </div>

              {connectionHealth.status !== 'idle' && (
                <div
                  className={`p-2 rounded-md text-[11px] leading-tight ${
                    connectionHealth.status === 'success'
                      ? 'bg-[#EDF4EE] text-[#245034] border border-[#CFDFD3]'
                      : connectionHealth.status === 'warning'
                      ? 'bg-[#FEF9E7] text-[#7D6608] border border-[#F9E79F]'
                      : 'bg-[#FDF2F2] text-[#9B2C2C] border border-[#F8D7D7]'
                  }`}
                >
                  {connectionHealth.message}
                </div>
              )}

              {/* Quick instructions */}
              <div className="p-2 bg-white rounded-md border border-[#E9DFD8] text-[10px] text-[#6B5A52] space-y-1">
                <div className="font-semibold text-[#2C2420] flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#D97C65]" />
                  <span>How to fix n8n errors:</span>
                </div>
                <p>
                  1. <strong>404 Not Registered:</strong> Open your n8n workflow canvas and click the <strong>Active</strong> toggle in the top-right corner.
                </p>
                <p>
                  2. <strong>Gemini 503 Spikes:</strong> Open the AI Agent node in n8n, click <em>Settings</em> (gear icon), and enable <strong>Retry On Fail</strong> (3 tries, 2000ms delay).
                </p>
              </div>
            </div>
          )}

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

                  <div className="max-w-[85%] space-y-1.5">
                    {/* Optional Notice if n8n is inactive or busy */}
                    {msg.n8nStatusNotice && (
                      <div className="p-2 rounded-lg bg-[#FEF9E7] border border-[#F9E79F] text-[10px] text-[#7D6608] leading-tight flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#B7950B] shrink-0 mt-0.5" />
                        <span>{msg.n8nStatusNotice}</span>
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#D97C65] text-white rounded-br-xs'
                          : msg.isError
                          ? 'bg-[#FDF2F2] border border-[#F8D7D7] text-[#9B2C2C] rounded-bl-xs'
                          : 'bg-white border border-[#E8DFD8] text-[#2C2420] rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div
                      className={`text-[10px] text-[#9E9088] px-1 flex items-center gap-1.5 ${
                        isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {!isUser && msg.source === 'studio-fallback' && (
                        <span className="text-[#A4604E]">· Studio Catalog</span>
                      )}
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
                  <span className="text-[11px] text-[#7A6C64] ml-1">Consulting studio AI...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (when initial chat) */}
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
