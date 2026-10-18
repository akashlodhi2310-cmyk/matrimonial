import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Lock,
  Unlock,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowLeft
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const {
    conversations,
    messages,
    activeConversationProfileId,
    setActiveConversationProfileId,
    sendMessage,
    getProfileById,
    currentUser,
    setCurrentView,
    plans,
    openCheckout,
    openAuthModal,
    unlockContactDetails
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-900">Sign-In Required</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Conversations and direct inquiries are reserved for registered Best Sathi members.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer"
        >
          Sign In or Register
        </button>
      </div>
    );
  }

  // Active conversation profile
  const activeProfile = activeConversationProfileId
    ? getProfileById(activeConversationProfileId)
    : conversations.length > 0
    ? getProfileById(conversations[0].profileId)
    : undefined;

  const currentChatProfileId = activeProfile?.id;
  const activeChatMessages = currentChatProfileId ? messages[currentChatProfileId] || [] : [];
  const isContactUnlocked = currentChatProfileId
    ? currentUser.membership.unlockedContactProfileIds.includes(currentChatProfileId)
    : false;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentChatProfileId) return;
    sendMessage(currentChatProfileId, inputMessage);
    setInputMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-rose-600 font-bold">
            Private Member Conversations
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Demonstration Messages
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl font-medium text-slate-800 shadow-xs">
            Remaining Unlocks: <span className="font-bold text-rose-600 tabular-nums">{currentUser.membership.remainingMessages}</span>
          </div>

          <button
            onClick={() => setCurrentView('membership')}
            className="text-xs font-bold px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Get More Unlocks
          </button>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[580px]">
        {/* Left Column: Conversations List */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
            Conversations ({conversations.length})
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {conversations.length > 0 ? (
              conversations.map((conv) => {
                const isSelected = conv.profileId === currentChatProfileId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationProfileId(conv.profileId)}
                    className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-rose-50/70 border-l-4 border-l-rose-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={conv.profilePhoto}
                        alt={conv.profileName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {conv.profileName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate mt-0.5">
                        {conv.profileProfession} · {conv.profileCity}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-1">
                        {conv.lastMessageText}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No active conversations yet.</p>
                <button
                  onClick={() => setCurrentView('explore')}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Browse profiles to start chat
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          {activeProfile ? (
            <>
              {/* Chat Top Bar */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentView('profile-detail', activeProfile.id)}
                    className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 cursor-pointer hover:opacity-90"
                  >
                    <img
                      src={activeProfile.photos[0]}
                      alt={activeProfile.displayName}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div>
                    <h3
                      onClick={() => setCurrentView('profile-detail', activeProfile.id)}
                      className="font-serif text-base font-bold text-slate-900 cursor-pointer hover:text-rose-600"
                    >
                      {activeProfile.displayName}
                    </h3>
                    <div className="text-[11px] text-slate-500">
                      {activeProfile.age} yrs · {activeProfile.city} · {activeProfile.profession}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('profile-detail', activeProfile.id)}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  View Full Profile
                </button>
              </div>

              {/* Demo Notice Inside Chat */}
              <div className="bg-rose-50/60 border-b border-rose-100 px-4 py-2 text-[11px] text-rose-950 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>
                  Demo Chat Interface: Messages are stored locally for testing. Automated polite demo replies occur after message submission.
                </span>
              </div>

              {/* Message List */}
              <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[420px] bg-slate-50/40">
                {activeChatMessages.map((msg) => {
                  const isMe = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                          isMe
                            ? 'bg-rose-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div
                          className={`text-[9px] mt-1 font-mono text-right ${
                            isMe ? 'text-white/70' : 'text-slate-400'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Write a polite demo message to ${activeProfile.displayName}...`}
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 text-slate-900"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-slate-500 space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-300" />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Select a Conversation
              </h3>
              <p>Choose an ongoing discussion from the list or unlock a new profile.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
