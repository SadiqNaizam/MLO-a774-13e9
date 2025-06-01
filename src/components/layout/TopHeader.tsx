import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Facebook,
  Users,
  MessageSquare,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
  HelpCircle,
  ShieldQuestion, // Used for Help & Support (alternative to HelpCircle)
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const currentUser = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olennamason',
  };

  const notificationCount = 36;
  const messageCount = 8;
  const friendRequestCount = 2;

  return (
    <header
      className={cn(
        'fixed top-0 left-64 right-80 h-[60px] bg-card border-b border-border',
        'flex items-center justify-between px-4 z-10 shadow-sm',
        className
      )}
    >
      {/* Left Section: Logo and Search */} 
      <div className="flex items-center space-x-3">
        <a href="#" aria-label="Homepage">
          <Facebook className="h-8 w-8 text-primary" />
        </a>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="pl-9 h-9 text-sm rounded-full bg-background focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Right Section: User Profile and Actions */} 
      <div className="flex items-center space-x-2">
        {/* Action Buttons */} 
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-secondary relative">
          <Users className="h-5 w-5 text-foreground" />
          {friendRequestCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-[16px] p-0.5 text-[10px] flex items-center justify-center">
              {friendRequestCount}
            </Badge>
          )}
          <span className="sr-only">Friend Requests</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-secondary relative">
          <MessageSquare className="h-5 w-5 text-foreground" />
          {messageCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-[16px] p-0.5 text-[10px] flex items-center justify-center">
              {messageCount}
            </Badge>
          )}
          <span className="sr-only">Messages</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-secondary relative">
          <Bell className="h-5 w-5 text-foreground" />
          {notificationCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-[16px] p-0.5 text-[10px] flex items-center justify-center">
              {notificationCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Profile Dropdown */} 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1 rounded-full hover:bg-secondary h-10">
              <Avatar className="h-7 w-7">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium text-foreground truncate max-w-[100px]">{currentUser.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">View your profile</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings & Privacy</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShieldQuestion className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
