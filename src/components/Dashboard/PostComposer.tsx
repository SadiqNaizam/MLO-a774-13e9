import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, UserPlus, Smile, Video, ListChecks, Edit3, MoreHorizontal } from 'lucide-react';

interface PostComposerProps {
  className?: string;
  currentUserAvatarUrl?: string;
  currentUserName?: string;
}

const PostComposer: React.FC<PostComposerProps> = ({
  className,
  currentUserAvatarUrl = "https://i.pravatar.cc/150?u=currentuser", // Default placeholder
  currentUserName = "Olenna"
}) => {
  const [postText, setPostText] = React.useState<string>('');

  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <Tabs defaultValue="make-post" className="w-full">
        <CardHeader className="p-0 border-b border-border">
          <TabsList className="grid w-full grid-cols-3 rounded-none bg-card">
            <TabsTrigger value="make-post" className="py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground hover:bg-secondary/50">
              <Edit3 className="w-4 h-4 mr-2" /> Make Post
            </TabsTrigger>
            <TabsTrigger value="photo-video" className="py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground hover:bg-secondary/50">
              <ImageIcon className="w-4 h-4 mr-2" /> Photo/Video
            </TabsTrigger>
            <TabsTrigger value="live-video" className="py-3 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground hover:bg-secondary/50">
              <Video className="w-4 h-4 mr-2" /> Live Video
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="p-0">
          <TabsContent value="make-post" className="mt-0 p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="mt-1">
                <AvatarImage src={currentUserAvatarUrl} alt={currentUserName} />
                <AvatarFallback>{currentUserName?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder={`What's on your mind, ${currentUserName}?`}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="flex-1 text-base border-none resize-none focus-visible:ring-0 min-h-[60px] p-2"
              />
            </div>
            <hr className="my-3 border-border" />
            <div className="flex items-center justify-between">
                <div className="flex space-x-1 sm:space-x-2">
                    <Button variant="ghost" size="sm" className="text-secondary-foreground hover:bg-secondary/80 px-2 sm:px-3">
                        <ListChecks className="w-5 h-5 mr-1 sm:mr-2 text-orange-500" />
                        <span className="hidden sm:inline text-sm">List</span>
                         <span className="sm:hidden text-sm">List</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-secondary-foreground hover:bg-secondary/80 px-2 sm:px-3">
                        <ImageIcon className="w-5 h-5 mr-1 sm:mr-2 text-green-500" />
                        <span className="hidden sm:inline text-sm">Photo/Video</span>
                        <span className="sm:hidden text-sm">Photo</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-secondary-foreground hover:bg-secondary/80 px-2 sm:px-3">
                        <UserPlus className="w-5 h-5 mr-1 sm:mr-2 text-blue-500" />
                        <span className="hidden sm:inline text-sm">Tag Friends</span>
                        <span className="sm:hidden text-sm">Tag</span>
                    </Button>
                </div>
                 <Button variant="ghost" size="icon" className="text-secondary-foreground hover:bg-secondary/80">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </div>
          </TabsContent>
          <TabsContent value="photo-video" className="mt-0 p-4">
            <p className="text-sm text-muted-foreground">Functionality to upload photos or create an album would be here.</p>
          </TabsContent>
          <TabsContent value="live-video" className="mt-0 p-4">
            <p className="text-sm text-muted-foreground">Functionality to start a live video session would be here.</p>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default PostComposer;
