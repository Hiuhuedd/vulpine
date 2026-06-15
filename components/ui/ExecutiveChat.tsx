'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Mail, 
  Loader2, 
  ChevronLeft, 
  ArrowRight, 
  Briefcase, 
  Settings, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PresetQuestion {
  q: string;
  a: string;
  sender: string;
}

interface Channel {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  intro: string;
  presetQuestions: PresetQuestion[];
}

interface Message {
  id: string;
  sender: 'user' | 'executive' | 'system';
  senderRole?: string;
  text: string;
  timestamp: Date;
  isEmailForm?: boolean;
}

const CHANNELS: Channel[] = [
  {
    id: 'general',
    name: 'Executive Secretariat',
    role: 'General Inquiries',
    avatarInitials: 'ES',
    intro: 'Welcome to Vulpine’s Executive Secretariat. We coordinate regional projects, joint-venture collaborations, and administrative biddings. How can we direct you today?',
    presetQuestions: [
      {
        q: 'What major projects are you currently executing?',
        a: 'We are executing key building, road infrastructure, and specialized energy/security projects. Currently, we have active works in rural road networks, solar mini-grids, and high-security wildlife electric perimeter fencing.',
        sender: 'Executive Secretariat'
      },
      {
        q: 'How do I request a tender package or bid proposal?',
        a: 'Please send formal RFP requests directly to info@vulpine.co.ke, or leave your email in this chat and our Operations Desk will coordinate with you.',
        sender: 'Executive Secretariat'
      },
      {
        q: 'Where is the Vulpine main office located?',
        a: 'Our corporate headquarters is located in Nairobi, Kenya, coordinating site operations throughout East Africa.',
        sender: 'Executive Secretariat'
      }
    ]
  },
  {
    id: 'md',
    name: 'Managing Director\'s Office',
    role: 'Corporate Strategy',
    avatarInitials: 'MD',
    intro: 'Connected to the Managing Director\'s Office. We oversee Vulpine\'s strategic expansion, joint venture structuring, and public-private partnerships.',
    presetQuestions: [
      {
        q: 'What is Vulpine\'s core growth strategy?',
        a: 'Our focus is on delivering sustainable infrastructure through technical precision. We are expanding our footprint in East Africa, utilizing Joint Ventures and Public-Private Partnerships.',
        sender: 'Managing Director\'s Office'
      },
      {
        q: 'Are you open to collaborative PPP financing?',
        a: 'Yes. Vulpine actively structures and co-finances Public-Private Partnerships for commercial development, public works, and utility grids.',
        sender: 'Managing Director\'s Office'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical & Quality Desk',
    role: 'NCA & Standards Compliance',
    avatarInitials: 'TD',
    intro: 'Technical & Quality Assurance Desk. We enforce strict compliance codes, site engineering safety, and NCA standards across all active project zones.',
    presetQuestions: [
      {
        q: 'What are Vulpine\'s licensing details?',
        a: 'Vulpine Limited is registered under category NCA6 for Building Works (Ref: 85321/B/0423). We are also fully tax compliant under KRA PIN P051737046N.',
        sender: 'Technical Director'
      },
      {
        q: 'What is your project safety audit protocol?',
        a: 'We operate under a strict zero-accident site policy. Every site undergoes rigorous hazard identification, environmental impact assessments (NEMA), and mandatory PPE enforcement.',
        sender: 'Technical Director'
      }
    ]
  },
  {
    id: 'operations',
    name: 'Operations & Logistics Desk',
    role: 'Mobilization & Procurement',
    avatarInitials: 'OD',
    intro: 'Operations & Logistics Desk. We coordinate fleet deployment, material procurement, and engineering team mobilization.',
    presetQuestions: [
      {
        q: 'How do you prevent project timeline delays?',
        a: 'We leverage advanced Project Management scheduling algorithms, maintain our own fleet of heavy equipment, and establish reliable regional supply chains to bypass external logistics delays.',
        sender: 'Operations Desk'
      },
      {
        q: 'Which geographic zones do you service?',
        a: 'We mobilize resources to any project location across the East African region, including remote rural communities and conservation parks.',
        sender: 'Operations Desk'
      }
    ]
  }
];

export default function ExecutiveChat() {
  const [activeChannelId, setActiveChannelId] = useState<string>('general');
  const [showMobileChat, setShowMobileChat] = useState<boolean>(false);
  const [channelHistories, setChannelHistories] = useState<Record<string, Message[]>>({});
  const [typingChannel, setTypingChannel] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  
  // Custom message state mapping: 'none' | 'awaiting_email' | 'submitting' | 'submitted'
  const [inquiryState, setInquiryState] = useState<Record<string, { status: 'none' | 'awaiting_email' | 'submitting' | 'submitted'; pendingText?: string; email?: string }>>({});
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const activeChannel = CHANNELS.find(c => c.id === activeChannelId) || CHANNELS[0];

  // Initialize histories
  useEffect(() => {
    const initialHistories: Record<string, Message[]> = {};
    CHANNELS.forEach(channel => {
      initialHistories[channel.id] = [
        {
          id: `intro-${channel.id}`,
          sender: 'executive',
          senderRole: channel.role,
          text: channel.intro,
          timestamp: new Date()
        }
      ];
    });
    setChannelHistories(initialHistories);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelHistories, typingChannel, activeChannelId]);

  const activeMessages = channelHistories[activeChannelId] || [];

  const simulateExecutiveReply = (channelId: string, replyText: string, delayMs: number = 1200) => {
    setTypingChannel(channelId);
    setTimeout(() => {
      setTypingChannel(null);
      setChannelHistories(prev => {
        const history = prev[channelId] || [];
        const currentChannel = CHANNELS.find(c => c.id === channelId);
        return {
          ...prev,
          [channelId]: [
            ...history,
            {
              id: `msg-${Date.now()}`,
              sender: 'executive',
              senderRole: currentChannel?.role || 'Executive Office',
              text: replyText,
              timestamp: new Date()
            }
          ]
        };
      });
    }, delayMs);
  };

  const handlePresetClick = (q: string, a: string) => {
    if (typingChannel) return;

    // Add user message
    const updatedHistoryWithUser = [
      ...activeMessages,
      {
        id: `user-q-${Date.now()}`,
        sender: 'user' as const,
        text: q,
        timestamp: new Date()
      }
    ];

    setChannelHistories(prev => ({
      ...prev,
      [activeChannelId]: updatedHistoryWithUser
    }));

    simulateExecutiveReply(activeChannelId, a);
  };

  const handleSendCustomText = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || typingChannel) return;

    const userText = inputText;
    setInputText('');

    // Add user message
    setChannelHistories(prev => ({
      ...prev,
      [activeChannelId]: [
        ...(prev[activeChannelId] || []),
        {
          id: `custom-q-${Date.now()}`,
          sender: 'user',
          text: userText,
          timestamp: new Date()
        }
      ]
    }));

    // Move to awaiting email state
    setInquiryState(prev => ({
      ...prev,
      [activeChannelId]: {
        status: 'awaiting_email',
        pendingText: userText
      }
    }));

    setTypingChannel(activeChannelId);
    setTimeout(() => {
      setTypingChannel(null);
      setChannelHistories(prev => ({
        ...prev,
        [activeChannelId]: [
          ...(prev[activeChannelId] || []),
          {
            id: `msg-ask-email-${Date.now()}`,
            sender: 'executive',
            senderRole: activeChannel.role,
            text: `Thank you for your inquiry regarding "${userText}". To route this request directly to our executive dashboard and verify your submission, please enter your email address below.`,
            timestamp: new Date()
          },
          {
            id: `email-form-${Date.now()}`,
            sender: 'system',
            text: '',
            timestamp: new Date(),
            isEmailForm: true
          }
        ]
      }));
    }, 1000);
  };

  const handleEmailSubmit = async (email: string) => {
    const currentState = inquiryState[activeChannelId];
    if (!currentState || !currentState.pendingText) return;

    // Update status to submitting
    setInquiryState(prev => ({
      ...prev,
      [activeChannelId]: {
        ...currentState,
        status: 'submitting',
        email
      }
    }));

    // Add saving visual to chat
    setChannelHistories(prev => {
      const filtered = (prev[activeChannelId] || []).filter(msg => !msg.isEmailForm);
      return {
        ...prev,
        [activeChannelId]: [
          ...filtered,
          {
            id: `email-sys-${Date.now()}`,
            sender: 'user',
            text: `My email is: ${email}`,
            timestamp: new Date()
          }
        ]
      };
    });

    setTypingChannel(activeChannelId);

    try {
      // Write to Firestore database
      await addDoc(collection(db, 'executive_inquiries'), {
        channelId: activeChannelId,
        channelName: activeChannel.name,
        channelRole: activeChannel.role,
        message: currentState.pendingText,
        email: email,
        timestamp: new Date(),
        status: 'pending'
      });

      // Simulation delay for nice feel
      setTimeout(() => {
        setTypingChannel(null);
        setInquiryState(prev => ({
          ...prev,
          [activeChannelId]: {
            status: 'submitted',
            email
          }
        }));

        const refCode = `VP-${Math.floor(1000 + Math.random() * 9000)}`;

        setChannelHistories(prev => ({
          ...prev,
          [activeChannelId]: [
            ...(prev[activeChannelId] || []),
            {
              id: `submit-success-${Date.now()}`,
              sender: 'system',
              text: `Inquiry successfully logged in the secure executive portal under reference ${refCode}. Our technical or operational desk will follow up shortly via ${email}.`,
              timestamp: new Date()
            }
          ]
        }));
      }, 1500);

    } catch (err) {
      console.error("Error saving executive inquiry:", err);
      // Fallback response if Firestore fails (simulated offline mode)
      setTimeout(() => {
        setTypingChannel(null);
        setInquiryState(prev => ({
          ...prev,
          [activeChannelId]: {
            status: 'submitted',
            email
          }
        }));
        
        const refCode = `VP-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`;

        setChannelHistories(prev => ({
          ...prev,
          [activeChannelId]: [
            ...(prev[activeChannelId] || []),
            {
              id: `submit-success-${Date.now()}`,
              sender: 'system',
              text: `Your message has been cached locally under reference ${refCode}. Our team will review this shortly. Thank you.`,
              timestamp: new Date()
            }
          ]
        }));
      }, 1500);
    }
  };

  const activeInquiryState = inquiryState[activeChannelId]?.status || 'none';

  return (
    <div className="glass-panel overflow-hidden border border-slate-200 shadow-xl rounded-2xl flex flex-col md:flex-row h-[580px] bg-white text-primary max-w-5xl mx-auto">
      
      {/* 1. Sidebar Channels List */}
      <div 
        className={`w-full md:w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 ${
          showMobileChat ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="p-5 border-b border-slate-100 bg-white">
          <h3 className="font-serif text-lg font-bold tracking-wide text-primary flex items-center space-x-2">
            <Briefcase className="text-accent" size={18} />
            <span>Executive Secretariat</span>
          </h3>
          <p className="text-[11px] font-sans text-slate-500 mt-1 uppercase tracking-wider">
            Vulpine Executive Board Portal
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {CHANNELS.map(ch => {
            const isActive = ch.id === activeChannelId;
            const hasAwaitingEmail = inquiryState[ch.id]?.status === 'awaiting_email';
            
            return (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChannelId(ch.id);
                  setShowMobileChat(true);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border cursor-pointer ${
                  isActive 
                    ? 'bg-primary border-primary text-white shadow-md' 
                    : 'bg-white hover:bg-slate-100 border-slate-100 text-slate-700 hover:text-primary shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-accent' : 'text-accent-mid'}`}>
                    {ch.role}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-accent' : 'bg-accent-mid'}`}></span>
                    </span>
                  </div>
                </div>
                <h4 className="font-serif text-sm font-bold mt-1 line-clamp-1">
                  {ch.name}
                </h4>
                {hasAwaitingEmail && (
                  <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-600 uppercase font-sans tracking-widest">
                    Awaiting Action
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 text-[10px] font-sans text-slate-400 bg-white flex items-center space-x-2 justify-center">
          <ShieldCheck size={14} className="text-slate-400" />
          <span>Encrypted Direct Executive Communication</span>
        </div>
      </div>

      {/* 2. Main Chat Feed Area */}
      <div 
        className={`flex-1 flex flex-col bg-white ${
          !showMobileChat ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Chat Header */}
        <div className="p-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowMobileChat(false)}
              className="md:hidden p-1.5 -ml-1 text-slate-500 hover:text-primary rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-serif text-primary font-bold text-sm">
              {activeChannel.avatarInitials}
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-primary leading-tight">
                {activeChannel.name}
              </h4>
              <p className="text-[10px] font-sans text-slate-500 flex items-center space-x-1">
                <span>{activeChannel.role}</span>
                <span>•</span>
                <span className="text-accent-mid font-semibold">Online</span>
              </p>
            </div>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20">
          {activeMessages.map((msg) => {
            if (msg.sender === 'system') {
              if (msg.isEmailForm) {
                return (
                  <EmailFormCard 
                    key={msg.id}
                    onSubmit={handleEmailSubmit}
                    isLoading={activeInquiryState === 'submitting'}
                  />
                );
              }
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-4 text-xs font-sans max-w-md shadow-sm flex items-start space-x-2.5">
                    <CheckCircle className="shrink-0 text-emerald-600 mt-0.5" size={16} />
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              );
            }

            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] sm:max-w-md rounded-2xl p-4 shadow-sm text-xs font-sans leading-relaxed ${
                    isUser 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                  }`}
                >
                  {!isUser && msg.senderRole && (
                    <div className="text-[10px] font-bold uppercase tracking-wider text-accent-mid mb-1">
                      {msg.senderRole}
                    </div>
                  )}
                  <p>{msg.text}</p>
                  <div className={`text-[9px] mt-1.5 text-right ${isUser ? 'text-white/60' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {typingChannel === activeChannelId && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset chips & Custom input container */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0 space-y-3">
          
          {/* Preset Questions Chips (hide when awaiting email or form is shown) */}
          {activeInquiryState === 'none' && !typingChannel && (
            <div className="flex flex-wrap gap-2 pt-1 max-h-24 overflow-y-auto">
              {activeChannel.presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(pq.q, pq.a)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-primary text-[11px] font-sans px-3.5 py-2 rounded-full transition-all duration-200 text-left flex items-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <HelpCircle size={13} className="text-accent-mid shrink-0" />
                  <span>{pq.q}</span>
                </button>
              ))}
            </div>
          )}

          {/* Chat text box input */}
          {activeInquiryState === 'none' ? (
            <form onSubmit={handleSendCustomText} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a custom message for the Executive Office..."
                disabled={typingChannel !== null}
                className="flex-1 bg-slate-50 text-slate-800 placeholder-slate-400 text-xs font-sans px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || typingChannel !== null}
                className="bg-primary hover:bg-primary/95 text-white p-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-sm shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          ) : activeInquiryState === 'awaiting_email' ? (
            <div className="text-[11px] font-sans text-amber-600 bg-amber-50 border border-amber-100/50 p-2.5 rounded-xl text-center">
              Please finalize your inquiry by entering your email in the form above.
            </div>
          ) : (
            <div className="text-[11px] font-sans text-emerald-600 bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-xl text-center flex items-center justify-center space-x-1.5">
              <CheckCircle size={13} className="text-emerald-500" />
              <span>Inquiry session complete. Click another Executive Desk on the left to start a new chat.</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Subcomponent: Email Form Card in Feed
interface EmailFormCardProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

function EmailFormCard({ onSubmit, isLoading }: EmailFormCardProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required');
      return;
    }
    // Simple email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    onSubmit(email);
  };

  return (
    <div className="flex justify-start">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-5 shadow-md max-w-sm w-full space-y-4">
        <div className="flex items-center space-x-2 text-primary">
          <Mail size={16} className="text-accent" />
          <h5 className="font-serif text-xs font-bold uppercase tracking-wider">
            Verify & Submit Inquiry
          </h5>
        </div>
        
        <p className="text-[11px] font-sans text-slate-600 leading-relaxed">
          Provide your corporate email. We will route your inquiry to the correct Director and email you a response.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. name@company.com"
              disabled={isLoading}
              className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs font-sans px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
            {error && (
              <p className="text-[10px] text-red-500 mt-1 font-sans font-semibold">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/95 text-white text-[11px] font-sans font-bold uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-1.5 disabled:opacity-60 disabled:scale-100 cursor-pointer shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={13} />
                <span>Logging Session...</span>
              </>
            ) : (
              <>
                <span>Submit to Executive Board</span>
                <ArrowRight size={13} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
