import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Users } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  coverImageStyle: string; // e.g., 'bg-gradient-to-r from-cyan-500 to-blue-500'
  membersCount: number;
  memberAvatars?: string[]; // URLs for small avatar images
  category?: string;
}

const suggestedGroupsData: Group[] = [
  {
    id: 'g1',
    name: 'Mad Men (MADdicts)',
    coverImageStyle: 'bg-gradient-to-br from-red-700 via-gray-800 to-black',
    membersCount: 6195,
    memberAvatars: [
      'https://i.pravatar.cc/150?img=20',
      'https://i.pravatar.cc/150?img=21',
      'https://i.pravatar.cc/150?img=22',
      'https://i.pravatar.cc/150?img=23',
      'https://i.pravatar.cc/150?img=24',
    ],
    category: 'TV Show Community'
  },
  {
    id: 'g2',
    name: 'Dexter Morgan Fans',
    coverImageStyle: 'bg-gradient-to-br from-red-600 via-slate-800 to-neutral-900',
    membersCount: 6984,
    memberAvatars: [
      'https://i.pravatar.cc/150?img=25',
      'https://i.pravatar.cc/150?img=26',
      'https://i.pravatar.cc/150?img=27',
    ],
    category: 'TV Series Discussion'
  },
  {
    id: 'g3',
    name: 'React Developers Hub',
    coverImageStyle: 'bg-gradient-to-r from-sky-500 to-cyan-400',
    membersCount: 12800,
    memberAvatars: [
        'https://i.pravatar.cc/150?img=50',
        'https://i.pravatar.cc/150?img=51',
    ],
    category: 'Technology & Programming'
  },
];

interface SuggestedGroupsProps {
  className?: string;
}

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ className }) => {
  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
        <CardTitle className="text-base font-semibold">Suggested Groups</CardTitle>
        <Button variant="link" className="p-0 h-auto text-sm text-primary hover:no-underline hover:text-primary/80">
          See All
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 space-y-4">
        {suggestedGroupsData.map((group, index) => (
          <div key={group.id} className="space-y-2 pt-3 first:pt-0">
            {index > 0 && <hr className="border-border -mx-4 mb-3"/>}
            <div className={cn("h-24 rounded-md relative overflow-hidden group", group.coverImageStyle)}>
              {group.memberAvatars && group.memberAvatars.length > 0 && (
                <div className="absolute bottom-2 left-2 flex -space-x-2">
                  {group.memberAvatars.slice(0, 5).map((avatarUrl, idx) => (
                    <Avatar key={idx} className="h-6 w-6 border-2 border-card shadow-md">
                      <AvatarImage src={avatarUrl} alt={`Member ${idx + 1}`} />
                      <AvatarFallback>{group.name.charAt(idx) || 'U'}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-1">
                <div>
                    <h4 className="text-sm font-semibold text-foreground hover:underline cursor-pointer">{group.name}</h4>
                    <p className="text-xs text-muted-foreground">
                        {group.membersCount.toLocaleString()} members
                        {group.category && <span className="hidden sm:inline"> · {group.category}</span>}
                    </p>
                </div>
                <Button variant="outline" size="sm" className="border-border text-secondary-foreground hover:bg-secondary/80 hover:text-primary">
                    <Plus className="w-4 h-4 mr-1" /> Join
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;
