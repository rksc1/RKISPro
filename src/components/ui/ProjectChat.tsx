"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMessage } from "@/services/message-service";
import { Button } from "./Button";

export function ProjectChat({
  projectId,
  currentUserId
}: {
  projectId: string;
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/messages`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Simple polling every 10s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [projectId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get("content")?.toString().trim();
    const attachments = formData.getAll("attachments") as File[];
    const hasValidFile = attachments.some(f => f.size > 0);

    if (!content && !hasValidFile) return;

    setIsSending(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/messages`, {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const newMessage = await res.json();
        setMessages(prev => [...prev, newMessage]);
        form.reset();
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse rounded-lg bg-slate-100 p-8 text-center text-slate-500">Loading chat...</div>;
  }

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <div className="border-b border-line bg-slate-50 p-4">
        <h3 className="font-bold text-slate-950">Project Messages</h3>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map(msg => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div className="mb-1 text-xs font-semibold text-slate-500 capitalize">
                  {msg.senderRole}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isMe ? "bg-primary text-primary-content" : "bg-slate-100 text-slate-900"}`}>
                  {msg.content && <p className="whitespace-pre-wrap text-sm">{msg.content}</p>}
                  {msg.attachmentUrls?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.attachmentUrls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md border border-white/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt={`Attachment ${i}`} className="h-20 w-20 object-cover" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-line bg-slate-50 p-4">
        <div className="flex flex-col gap-2">
          <textarea
            name="content"
            placeholder="Type your message..."
            className="w-full resize-none rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            rows={2}
          />
          <div className="flex items-center justify-between">
            <input
              type="file"
              name="attachments"
              multiple
              accept="image/*,application/pdf"
              className="text-xs file:mr-2 file:rounded-md file:border-0 file:bg-slate-200 file:px-2 file:py-1 file:text-xs file:font-semibold"
            />
            <Button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
