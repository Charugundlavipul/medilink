import { useMemo, useState } from "react";
import {
  Circle,
  MessageCircle,
  Paperclip,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";

import AvatarCircle from "@/components/base/AvatarCircle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Chat = {
  id: string;
  doctorName: string;
  specialty: string;
  initials: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
};

type Message = {
  role: "user" | "other";
  text: string;
  timestamp: string;
};

const chatsSeed: Chat[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    initials: "SJ",
    lastMessage: "That's a great observation about the ECG pattern.",
    timestamp: "5 min ago",
    unread: true,
    online: true,
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    specialty: "Neurology",
    initials: "MC",
    lastMessage: "Can we discuss the MRI findings from the case?",
    timestamp: "2 hours ago",
    unread: false,
    online: true,
  },
  {
    id: "3",
    doctorName: "Dr. Emma Wilson",
    specialty: "Radiology",
    initials: "EW",
    lastMessage: "Interested in collaboration opportunities at our lab.",
    timestamp: "1 day ago",
    unread: false,
    online: false,
  },
  {
    id: "4",
    doctorName: "Dr. James Rodriguez",
    specialty: "Internal Medicine",
    initials: "JR",
    lastMessage: "The patient responded well to the treatment protocol.",
    timestamp: "2 days ago",
    unread: false,
    online: false,
  },
  {
    id: "5",
    doctorName: "Dr. Lisa Anderson",
    specialty: "Pathology",
    initials: "LA",
    lastMessage: "Lab results are ready. Can we discuss them?",
    timestamp: "3 days ago",
    unread: false,
    online: true,
  },
];

const conversationSeed: Record<string, Message[]> = {
  "1": [
    {
      role: "other",
      text: "Hi! I reviewed your case presentation. Interesting findings.",
      timestamp: "Yesterday · 2:30 PM",
    },
    {
      role: "user",
      text: "Thanks! I'm particularly concerned about the ST elevation pattern.",
      timestamp: "Yesterday · 2:45 PM",
    },
    {
      role: "other",
      text: "That's a great observation about the ECG pattern.",
      timestamp: "Today · 10:15 AM",
    },
  ],
  "2": [
    {
      role: "user",
      text: "Hey Dr. Chen, I have a complex neuro case I'd like your input on.",
      timestamp: "Today · 9:00 AM",
    },
    {
      role: "other",
      text: "Sure, I'd be happy to help. What's the presentation?",
      timestamp: "Today · 9:15 AM",
    },
    {
      role: "user",
      text: "Patient presents with progressive cognitive decline and motor symptoms.",
      timestamp: "Today · 9:30 AM",
    },
    {
      role: "other",
      text: "Can we discuss the MRI findings from the case?",
      timestamp: "Today · 9:45 AM",
    },
  ],
};

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const chats = useMemo(() => chatsSeed, []);
  const conversationData = useMemo(() => conversationSeed, []);

  const filteredChats = chats.filter(
    (chat) =>
      chat.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedChatData = selectedChat ? chats.find((c) => c.id === selectedChat) : null;
  const conversationMessages = selectedChat ? conversationData[selectedChat] ?? [] : [];

  const handleSendMessage = () => {
    if (!selectedChat || !messageInput.trim()) return;
    setMessageInput("");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16 md:pb-8">
      <div className="rounded-3xl border border-border/60 bg-white/95 shadow-2xl backdrop-blur overflow-hidden">
        <div className="flex min-h-[520px] flex-col md:h-[calc(100vh-220px)] md:flex-row">
          <aside
            className={cn(
              "flex flex-col border-border/70 md:w-80 md:border-r md:h-full",
              selectedChatData ? "hidden md:flex" : "flex",
            )}
          >
            <div className="border-b border-border/60 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Inbox</div>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Conversations</h2>
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search doctors or specialties"
                  className="h-11 rounded-full border-border bg-muted/40 pl-11 pr-4 text-sm"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                <span className="rounded-full border border-border px-3 py-1">All</span>
                <span className="rounded-full border border-border px-3 py-1">Unread</span>
                <span className="rounded-full border border-border px-3 py-1">Starred</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 && (
                <div className="flex h-full items-center justify-center px-6 text-sm text-muted-foreground">
                  No conversations found.
                </div>
              )}
              <div className="divide-y divide-border/70">
                {filteredChats.map((chat) => {
                  const active = chat.id === selectedChat;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-6 py-4 text-left transition",
                        active ? "bg-primary/10" : "hover:bg-muted/60 focus-visible:bg-muted/80",
                      )}
                    >
                      <div className="relative">
                        <AvatarCircle initials={chat.initials} className="h-11 w-11" />
                        <Circle
                          className={cn(
                            "absolute -bottom-0.5 -right-0.5 h-3 w-3 drop-shadow-sm",
                            chat.online ? "text-emerald-500" : "text-muted-foreground/50",
                          )}
                          fill="currentColor"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-foreground">{chat.doctorName}</p>
                          <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{chat.specialty}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{chat.lastMessage}</p>
                      </div>
                      {chat.unread && <span className="inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />}    
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section className={cn("flex flex-1 flex-col rounded-t-3xl border-l border-border/60 bg-white md:h-full md:rounded-none", selectedChatData ? "flex" : "hidden md:flex")}>    
            {selectedChatData ? (
              <>
                <div className="relative overflow-hidden rounded-t-3xl border-b border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-4 md:rounded-none">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AvatarCircle initials={selectedChatData.initials} className="h-11 w-11" />
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{selectedChatData.doctorName}</h3>
                        <p className="text-xs text-muted-foreground">{selectedChatData.specialty}</p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 md:flex">
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-transparent bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm transition hover:border-primary/40 hover:bg-white md:hidden"
                  >
                    ? Back to inbox
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
                  <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-1">
                    {conversationMessages.map((msg, idx) => (
                      <div key={idx} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>                        
                        <div
                          className={cn(
                            "max-w-[85%] rounded-3xl px-4 py-3 shadow-sm transition md:max-w-[70%] lg:max-w-[60%]",
                            msg.role === "user"
                              ? "rounded-br-sm bg-primary text-primary-foreground shadow-primary/20"
                              : "rounded-bl-sm bg-muted/70 text-foreground",
                          )}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <span
                            className={cn(
                              "mt-2 block text-[11px] font-medium uppercase tracking-wide",
                              msg.role === "user"
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground/80",
                            )}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/60 px-4 py-4 md:px-8">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSendMessage();
                    }}
                    className="mx-auto flex w-full max-w-3xl items-end gap-3 px-1"
                  >
                    <div className="relative flex-1">
                      <button
                        type="button"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <textarea
                        rows={1}
                        value={messageInput}
                        onChange={(event) => setMessageInput(event.target.value)}
                        placeholder="Write a message..."
                        className="max-h-32 w-full resize-none rounded-full border border-border bg-muted/40 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground">
                    Conversations are private to your invited collaborators. Attach imaging, labs, or documents securely.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-6 text-center">
                <div className="rounded-full bg-primary/10 p-5 text-primary">
                  <MessageCircle className="h-10 w-10" />
                </div>
                <div className="max-w-xs space-y-2 text-sm text-muted-foreground">
                  <p className="text-base font-semibold text-foreground">Select a conversation</p>
                  <p>Choose a colleague from the inbox to review updates, discuss patient care, or plan the next case together.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}


