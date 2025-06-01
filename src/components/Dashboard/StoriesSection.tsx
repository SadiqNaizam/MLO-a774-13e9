import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusCircle, Settings, Archive as ArchiveIcon } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  userAvatarUrl: string; // For fallback or small display
  storyStyle: string; // e.g. 'bg-gradient-to-br from-purple-500 to-pink-500'
  isViewed?: boolean;
}

const storiesData: Story[] = [
  { id: 's1', userName: 'John Doe', userAvatarUrl: 'https://i.pravatar.cc/150?img=10', storyStyle: 'bg-gradient-to-br from-purple-400 to-pink-400', isViewed: false },
  { id: 's2', userName: 'Jane Smith', userAvatarUrl: 'https://i.pravatar.cc/150?img=11', storyStyle: 'bg-gradient-to-br from-blue-400 to-green-400', isViewed: false },
  { id: 's3', userName: 'Mike Brown', userAvatarUrl: 'https://i.pravatar.cc/150?img=12', storyStyle: 'bg-gradient-to-br from-yellow-400 to-orange-400', isViewed: true },
  { id: 's4', userName: 'Lisa White', userAvatarUrl: 'https://i.pravatar.cc/150?img=13', storyStyle: 'bg-gradient-to-br from-red-400 to-pink-400', isViewed: false },
  { id: 's5', userName: 'Chris Green', userAvatarUrl: 'https://i.pravatar.cc/150?img=14', storyStyle: 'bg-gradient-to-br from-teal-400 to-cyan-400', isViewed: true },
  { id: 's6', userName: 'Emily Blue', userAvatarUrl: 'https://i.pravatar.cc/150?img=15', storyStyle: 'bg-gradient-to-br from-indigo-400 to-purple-400', isViewed: false },
  { id: 's7', userName: 'David Black', userAvatarUrl: 'https://i.pravatar.cc/150?img=16', storyStyle: 'bg-gradient-to-br from-gray-400 to-slate-500', isViewed: false },
];

interface StoriesSectionProps {
  className?: string;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ className }) => {
  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-base font-semibold">Stories</CardTitle>
        <div className="space-x-1">
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-secondary/80 px-2">
                <ArchiveIcon className="w-3.5 h-3.5 mr-1" /> Archive
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-secondary/80 px-2">
                <Settings className="w-3.5 h-3.5 mr-1" /> Settings
            </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 pb-2">
            {/* Add to Your Story item */}
            <div className="flex flex-col items-center space-y-1 w-[70px] text-center cursor-pointer group shrink-0">
              <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-muted transition-colors relative overflow-hidden">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage src="https://i.pravatar.cc/150?u=addstory" alt="Add to story" className="object-cover"/>
                  <AvatarFallback className="rounded-none">YOU</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <PlusCircle className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground group-hover:text-primary">Add to Story</p>
            </div>

            {/* Story items */}
            {storiesData.map((story) => (
              <div key={story.id} className="flex flex-col items-center space-y-1 w-[70px] text-center cursor-pointer group shrink-0">
                <div className={cn(
                    "w-14 h-14 rounded-lg p-0.5",
                    story.isViewed ? "bg-border" : "bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500"
                )}>
                    <div className={cn("w-full h-full rounded-[5px] p-0.5 bg-card flex items-center justify-center overflow-hidden")}>
                        <div
                          className={cn("w-full h-full rounded-[3px] flex items-center justify-center overflow-hidden", story.storyStyle)}
                        >
                           <Avatar className="w-10 h-10 border-2 border-card">
                               <AvatarImage src={story.userAvatarUrl} alt={story.userName} className="object-cover" />
                               <AvatarFallback>{story.userName.charAt(0).toUpperCase()}</AvatarFallback>
                           </Avatar>
                        </div>
                    </div>
                </div>
                <p className="text-xs font-medium text-foreground truncate w-full group-hover:text-primary">{story.userName}</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoriesSection;
