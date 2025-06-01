import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Newspaper,
  MessageSquare,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  ListChecks,
  HeartHandshake,
  ChevronDown,
  PlusCircle,
  Settings,
  LogOut,
  UserRound,
  MoreHorizontal,
  Briefcase, // Example: for Pages if Flag is too generic
  MenuSquare, // Example: For See More/Less or general sections
} from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  count?: number;
  hasOptions?: boolean;
}

const NavLink: React.FC<NavItemProps & { className?: string }> = ({
  label,
  icon: Icon,
  href,
  isActive,
  onClick,
  count,
  className,
  hasOptions,
}) => {
  const baseClasses = 
    'w-full justify-start text-sm font-medium px-3 py-2.5 rounded-md flex items-center space-x-3';
  const activeClasses = isActive ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-sidebar-foreground/10';
  const textClass = isActive ? 'text-primary' : 'text-sidebar-foreground';

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(baseClasses, activeClasses, textClass, className)}
    >
      <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-sidebar-foreground/80')} />
      <span className="flex-1">{label}</span>
      {count && (
        <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold">
          {count}
        </span>
      )}
      {hasOptions && !isActive && (
        <MoreHorizontal className="h-4 w-4 text-sidebar-foreground/60 group-hover:text-sidebar-foreground" />
      )}
    </a>
  );
};

const SidebarLeftNav: React.FC = () => {
  const currentUser = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olennamason',
  };

  const mainNavItems: NavItemProps[] = [
    { label: 'News Feed', icon: Newspaper, href: '#', isActive: true, hasOptions: true },
    { label: 'Messenger', icon: MessageSquare, href: '#', count: 5 },
    { label: 'Watch', icon: PlaySquare, href: '#' },
    { label: 'Marketplace', icon: Store, href: '#' },
  ];

  const shortcutItems: NavItemProps[] = [
    { label: 'FarmVille 2', icon: Gamepad2, href: '#' },
    // Add more shortcuts here
  ];

  const exploreItems: NavItemProps[] = [
    { label: 'Events', icon: CalendarDays, href: '#' },
    { label: 'Pages', icon: Flag, href: '#' }, // Or Briefcase
    { label: 'Groups', icon: Users, href: '#' },
    { label: 'Friend Lists', icon: ListChecks, href: '#' },
    { label: 'Fundraisers', icon: HeartHandshake, href: '#' },
  ];

  const createItems = [
    { label: 'Ad', href: '#' },
    { label: 'Page', href: '#' },
    { label: 'Group', href: '#' },
    { label: 'Event', href: '#' },
    { label: 'Fundraiser', href: '#' },
  ];

  const [showMoreExplore, setShowMoreExplore] = React.useState(false);

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground flex flex-col shadow-lg z-20">
      <div className="p-4 flex items-center space-x-3 border-b border-sidebar-foreground/10">
        <Avatar className="h-9 w-9">
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
          <AvatarFallback className="bg-sidebar-foreground/20 text-sidebar-foreground">
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm truncate">{currentUser.name}</span>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-3 space-y-1.5">
          {mainNavItems.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}

          <Separator className="my-3 bg-sidebar-foreground/10" />

          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">
              Shortcuts
            </h3>
            {shortcutItems.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </div>

          <Separator className="my-3 bg-sidebar-foreground/10" />

          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">
              Explore
            </h3>
            {exploreItems.slice(0, showMoreExplore ? exploreItems.length : 3).map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-medium px-3 py-2.5 rounded-md flex items-center space-x-3 text-sidebar-foreground/80 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
              onClick={() => setShowMoreExplore(!showMoreExplore)}
            >
              <ChevronDown className={cn('h-5 w-5 transition-transform', showMoreExplore && 'rotate-180')} />
              <span>{showMoreExplore ? 'See Less' : 'See More'}</span>
            </Button>
          </div>
        </nav>
      </ScrollArea>

      <div className="p-3 border-t border-sidebar-foreground/10">
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider flex items-center">
          <PlusCircle className="h-4 w-4 mr-2 text-sidebar-foreground/70" />
          Create
        </h3>
        <div className="space-y-0.5">
          {createItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-1.5 text-xs text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-foreground/10 rounded-md"
            >
              {item.label}
            </a>
          ))}
        </div>
        <Separator className="my-3 bg-sidebar-foreground/10" />
        <NavLink icon={Settings} label="Settings" href="#" />
        <NavLink icon={LogOut} label="Logout" href="#" />
      </div>
    </aside>
  );
};

export default SidebarLeftNav;
