import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, MapPin, Users, Globe, UsersRound } from 'lucide-react'; // Globe for Public, UsersRound for Friends
import { ImageIcon as PlaceholderImageIcon } from 'lucide-react'; // For image placeholder

interface PostAuthor {
  name: string;
  avatarUrl: string;
  profileUrl?: string;
}

interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

interface Post {
  id: string;
  author: PostAuthor;
  timestamp: string;
  content: string;
  imageStyle?: string; // For placeholder style like 'bg-gradient-to-br from-blue-200 to-indigo-300'
  location?: {
    name: string;
    mapUrl?: string;
  };
  taggedUsers?: PostAuthor[];
  stats: PostStats;
  privacy: 'Public' | 'Friends';
}

const initialPostsData: Post[] = [
  {
    id: '1',
    author: { name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/150?img=1', profileUrl: '#' },
    timestamp: '2 hrs ago',
    content: "Checking out some new stores downtown! The city is bustling with energy today. Found a great little coffee shop called 'The Daily Grind'. Highly recommend their cold brew!",
    location: { name: 'Raleigh, North Carolina', mapUrl: '#' },
    taggedUsers: [
        { name: 'Bryan Durand', avatarUrl: 'https://i.pravatar.cc/150?img=2'},
        { name: 'Anna Lee', avatarUrl: 'https://i.pravatar.cc/150?img=3'}
    ],
    stats: { likes: 125, comments: 18, shares: 7 },
    privacy: 'Public' as const,
  },
  {
    id: '2',
    author: { name: 'Alex Chen', avatarUrl: 'https://i.pravatar.cc/150?img=4', profileUrl: '#' },
    timestamp: '5 hrs ago',
    content: "Just finished a great workout session! Feeling pumped. #fitness #motivation. Who else hit the gym today? Shared my routine in the comments if anyone's interested.",
    stats: { likes: 230, comments: 45, shares: 12 },
    privacy: 'Friends' as const,
  },
  {
    id: '3',
    author: { name: 'Maria Rodriguez', avatarUrl: 'https://i.pravatar.cc/150?img=5', profileUrl: '#' },
    timestamp: '1 day ago',
    content: "Beautiful sunset captured on my evening walk. Nature's art is truly breathtaking. What a peaceful end to the day. Feeling grateful for these small moments.",
    imageStyle: 'bg-gradient-to-br from-orange-300 via-red-300 to-pink-400', // Placeholder for sunset image
    stats: { likes: 310, comments: 62, shares: 20 },
    privacy: 'Public' as const,
  },
];

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
                <Avatar>
                    <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <a href={post.author.profileUrl} className="font-semibold text-sm text-foreground hover:underline">
                    {post.author.name}
                    </a>
                    {post.location && (
                        <span className="text-xs text-muted-foreground"> is in <a href={post.location.mapUrl || '#'} className="hover:underline font-medium">{post.location.name}</a></span>
                    )}
                     {post.taggedUsers && post.taggedUsers.length > 0 && (
                      <span className="text-xs text-muted-foreground block sm:inline">
                        {' '}with{' '}
                        <a href="#" className="font-medium hover:underline">{post.taggedUsers[0].name}</a>
                        {post.taggedUsers.length > 1 && ` and ${post.taggedUsers.length - 1} other${post.taggedUsers.length - 1 > 1 ? 's' : ''}`}
                      </span>
                    )}
                    <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                    {post.timestamp} · {post.privacy === 'Public' ? <Globe className="w-3 h-3 ml-1 mr-0.5" /> : <UsersRound className="w-3 h-3 ml-1 mr-0.5" />} {post.privacy}
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 -mt-1 -mr-1">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <p className="text-sm text-foreground whitespace-pre-wrap mb-3">{post.content}</p>
        {post.imageStyle && (
          <div className={cn("aspect-video overflow-hidden bg-secondary border border-border rounded-md flex items-center justify-center", post.imageStyle)}>
            <PlaceholderImageIcon className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        {post.location && post.id === '1' && ( // Special map display for the first post as in example
            <div className="mt-3 border border-border rounded-md overflow-hidden">
                 <div className="aspect-video bg-secondary flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-muted-foreground/30" />
                 </div>
                 <div className="p-3 bg-card border-t border-border">
                    <p className="font-semibold text-sm text-foreground">{post.location.name}</p>
                    <p className="text-xs text-muted-foreground">City · United States</p>
                 </div>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-2 pb-3 px-4">
        {(post.stats.likes > 0 || post.stats.comments > 0 || post.stats.shares > 0) && (
            <div className="flex justify-between w-full text-xs text-muted-foreground mb-2">
                <div>{post.stats.likes > 0 && `${post.stats.likes.toLocaleString()} likes`}</div>
                <div className="space-x-3">
                    <span>{post.stats.comments > 0 && `${post.stats.comments.toLocaleString()} comments`}</span>
                    <span>{post.stats.shares > 0 && `${post.stats.shares.toLocaleString()} shares`}</span>
                </div>
            </div>
        )}
        <div className="grid grid-cols-3 gap-1 w-full border-t border-border pt-2">
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:bg-secondary/80 hover:text-primary">
            <ThumbsUp className="w-4 h-4 mr-2" /> Like
          </Button>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:bg-secondary/80 hover:text-primary">
            <MessageCircle className="w-4 h-4 mr-2" /> Comment
          </Button>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:bg-secondary/80 hover:text-primary">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface PostFeedProps {
  className?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ className }) => {
  const [posts, setPosts] = React.useState<Post[]>(initialPostsData);

  return (
    <div className={cn("space-y-4", className)}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
            No posts yet. Start sharing your thoughts!
        </Card>
      )}
    </div>
  );
};

export default PostFeed;
