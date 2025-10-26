import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, MessageCircle, Share2, Heart } from "lucide-react";

import AvatarCircle from "@/components/base/AvatarCircle";
import * as UI from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { caseMap, type CaseComment } from "@/data/cases";

export interface PostCardProps {
  doctor: string;
  specialty: string;
  avatarUrl?: string;
  initials: string;
  title: string;
  excerpt: string;
  tags: string[];
  likes: number;
  caseId?: string;
}

export default function PostCard(props: PostCardProps) {
  const navigate = useNavigate();
  const caseId = props.caseId ?? props.title.toLowerCase().replace(/\s+/g, "-");
  const discussionId = `discussion-${caseId}`;
  const caseData = caseMap[caseId];
  const [discussionOpen, setDiscussionOpen] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [commentThread, setCommentThread] = useState<CaseComment[]>(() => caseData?.comments ?? []);

  const handleCommentToggle = () => {
    setDiscussionOpen((prev) => !prev);
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = commentDraft.trim();
    if (!text) return;

    const newComment: CaseComment = {
      id: `local-${Date.now()}`,
      author: "You",
      specialty: "Contributing Clinician",
      initials: "YOU",
      timestamp: "Just now",
      text,
    };

    setCommentThread((prev) => [...prev, newComment]);
    setCommentDraft("");
    if (!discussionOpen) {
      setDiscussionOpen(true);
    }
  };

  const commentCount = commentThread.length;

  return (
    <article className="bg-card rounded-2xl border shadow-sm p-4 md:p-6">
      <header className="flex items-start gap-3">
        <AvatarCircle src={props.avatarUrl} alt={props.doctor} initials={props.initials} />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="font-semibold leading-tight">{props.doctor}</div>
              <div className="text-xs text-muted-foreground">{props.specialty}</div>
            </div>
            <UI.Button variant="outline" className="rounded-full h-8 px-4 text-xs">Follow</UI.Button>
          </div>
        </div>
      </header>

      <div className="mt-3 md:mt-4">
        <h3 className="font-semibold text-lg text-foreground">
          {props.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {props.excerpt}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {props.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border"
            >
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <UI.Button
            className="w-full rounded-full h-10 md:h-11 bg-primary text-primary-foreground"
            onClick={() => navigate(`/case/${caseId}`)}
          >
            View Case Details
          </UI.Button>
        </div>
      </div>

      <footer className="mt-4 md:mt-5 flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5"><Heart className="h-4 w-4" /><span className="text-sm">{props.likes}</span></div>
          <button
            type="button"
            onClick={handleCommentToggle}
            className="flex items-center gap-1.5 text-sm transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            aria-expanded={discussionOpen}
            aria-controls={discussionId}
          >
            <MessageCircle className={`h-4 w-4 ${discussionOpen ? "text-primary" : ""}`} />
            <span>{commentCount}</span>
          </button>
          <Bookmark className="h-4 w-4" />
        </div>
        <Share2 className="h-4 w-4" />
      </footer>

      {discussionOpen && (
        <div id={discussionId} className="mt-5 space-y-4 border-t border-border/60 pt-4">
          <form className="space-y-3" onSubmit={handleCommentSubmit}>
            <Textarea
              placeholder="Share your insight without leaving the feed..."
              value={commentDraft}
              onChange={(event) => setCommentDraft(event.target.value)}
              className="min-h-[96px] rounded-xl border border-border bg-background"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Comment threads update instantly for everyone following.</p>
              <UI.Button
                type="submit"
                size="sm"
                className="rounded-full bg-primary px-4 text-primary-foreground"
                disabled={!commentDraft.trim()}
              >
                Post Comment
              </UI.Button>
            </div>
          </form>

          <div className="space-y-3">
            {commentThread.length === 0 ? (
              <p className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                No comments yet. Start the discussion for your peers.
              </p>
            ) : (
              commentThread.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-2xl border border-border/60 bg-muted/20 p-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <AvatarCircle initials={comment.initials} className="h-9 w-9 text-xs" />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{comment.author}</span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-primary">{comment.specialty}</span>
                        {comment.isReply && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                            Author reply
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      <p className="text-sm leading-relaxed text-foreground">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </article>
  );
}
