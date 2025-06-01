import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SquarePen, Users2, Settings2, Search, Circle } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'away';
  lastMessagePreview?: string;
  unreadCount?: number;
}

const chatContactsData: Contact[] = [
  { id: 'c1', name: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/150?img=30', status: 'online' as const, lastMessagePreview: "Sure, sounds good!", unreadCount: 2 },
  { id: 'c2', name: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/150?img=31', status: 'away' as const, lastMessagePreview: "Can we fix it?" },
  { id: 'c3', name: 'Charlie Chaplin', avatarUrl: 'https://i.pravatar.cc/150?img=32', status: 'offline' as const, lastMessagePreview: "A day without laughter..." },
  { id: 'c4', name: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/150?img=33', status: 'online' as const },
  { id: 'c5', name: 'Edward Scissorhands', avatarUrl: 'https://i.pravatar.cc/150?img=34', status: 'offline' as const },
  { id: 'c6', name: 'Fiona Gallagher', avatarUrl: 'https://i.pravatar.cc/150?img=35', status: 'online' as const, lastMessagePreview: "Meeting at 5?", unreadCount: 1 },
  { id: 'c7', name: 'Gregory House', avatarUrl: 'https://i.pravatar.cc/150?img=36', status: 'away' as const },
];

interface ChatSectionProps {
  className?: string;
}

const ChatSection: React.FC<ChatSectionProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContacts = chatContactsData.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: 'online' | 'offline' | 'away') => {
    if (status === 'online') return 'fill-green-500 stroke-green-600';
    if (status === 'away') return 'fill-yellow-500 stroke-yellow-600';
    return 'fill-gray-400 stroke-gray-500';
  };

  return (
    <Card className={cn("w-full shadow-sm flex flex-col min-h-[300px] max-h-[400px]", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-3 border-b border-border">
        <div className="flex items-center space-x-2">
            <Circle className={cn("w-2.5 h-2.5", getStatusColor('online'))} />
            <h3 className="font-semibold text-sm text-foreground">Chat</h3>
        </div>
        <div className="flex items-center space-x-0.5">
          <Button variant="ghost" size="icon" className="w-7 h-7">
            <SquarePen className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7">
            <Users2 className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="w-7 h-7">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col overflow-hidden">
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8 h-8 text-xs rounded-md bg-background focus-visible:ring-1 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-2 space-y-0.5">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center p-1.5 rounded-md hover:bg-secondary cursor-pointer transition-colors"
                >
                  <div className="relative mr-2.5 shrink-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Circle
                      className={cn(
                        "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
                        getStatusColor(contact.status)
                      )}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-medium text-foreground truncate leading-tight">{contact.name}</p>
                    {(contact.lastMessagePreview || contact.unreadCount) ? (
                        <p className={cn("text-xs truncate leading-tight", contact.unreadCount && contact.unreadCount > 0 ? "text-primary font-semibold" : "text-muted-foreground")}>
                            {contact.lastMessagePreview || `${contact.unreadCount} new message${contact.unreadCount === 1 ? '' : 's'}`}
                        </p>
                    ) : (
                        <p className="text-xs text-muted-foreground truncate italic leading-tight">No new messages</p>
                    )}
                  </div>
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <div className="ml-auto text-[10px] bg-primary text-primary-foreground rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 font-semibold">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-center text-muted-foreground py-4">No contacts found.</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
