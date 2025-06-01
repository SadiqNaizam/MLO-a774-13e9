import React from 'react';
import { cn } from '@/lib/utils';

// Layout Building Blocks
import SidebarLeftNav from '@/components/layout/SidebarLeftNav';
import TopHeader from '@/components/layout/TopHeader';

// Organisms for Main Content Area
import PostComposer from '@/components/Dashboard/PostComposer';
import PostFeed from '@/components/Dashboard/PostFeed';

// Organisms for Right Sidebar
import StoriesSection from '@/components/Dashboard/StoriesSection';
import SuggestedGroups from '@/components/Dashboard/SuggestedGroups';
import ChatSection from '@/components/Dashboard/ChatSection';

/**
 * SocialMediaDashboardPage
 * 
 * This page represents the main social media feed overview. It assembles various
 * organisms into a Facebook-like dashboard structure, adhering to the SocialMediaLayout pattern.
 * It directly implements the three-column layout (Left Sidebar, Main Content, Right Sidebar)
 * with a fixed TopHeader.
 */
const SocialMediaDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Header: Fixed, spans above main content and sidebars programmatically */}
      <TopHeader />
      
      {/* Left Sidebar: Fixed navigation panel */}
      <SidebarLeftNav />

      {/* Main Content Area: Central column for dynamic content like posts */}
      {/* - mt-[60px]: Accounts for fixed TopHeader height */}
      {/* - ml-64: Accounts for fixed SidebarLeftNav width */}
      {/* - lg:mr-80: Accounts for fixed SidebarRight width on larger screens */}
      {/* - p-4 md:p-6: Padding within the main content area */}
      {/* - min-h-[calc(100vh-60px)]: Ensures main content can fill viewport height below header */}
      {/* - overflow-y-auto: Allows scrolling for content that exceeds viewport height */}
      <main
        className={cn(
          'mt-[60px]',
          'ml-64',
          'lg:mr-80',
          'p-4 md:p-6',
          'min-h-[calc(100vh-60px)] overflow-y-auto'
        )}
      >
        {/* Container for feed elements, centered with a max-width for readability */}
        {/* This div implements "mainContent.container" requirements: flex flex-col gap-4 */}
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          <PostComposer />
          <PostFeed />
        </div>
      </main>

      {/* Right Sidebar: Fixed panel for stories, suggestions, chat */}
      {/* - w-80: Fixed width */}
      {/* - h-screen: Full viewport height */}
      {/* - fixed top-0 right-0: Positions it on the right edge */}
      {/* - bg-card: Background color (maps to 'surface' from PRD) */}
      {/* - border-l border-border: Left border */}
      {/* - shadow-lg: Visual separation */}
      {/* - overflow-y-auto: Allows scrolling for content within the sidebar */}
      {/* - p-4: Padding inside the sidebar */}
      {/* - hidden lg:flex: Hides on smaller screens, visible as flex column on large screens */}
      {/* - flex-col space-y-4: Stacks children vertically with spacing */}
      {/* - z-0: Default stacking context, can be adjusted if overlapping issues arise. TopHeader is z-10. */}
      <aside
        className={cn(
          'w-80 h-screen fixed top-0 right-0 bg-card border-l border-border shadow-lg',
          'overflow-y-auto p-4 hidden lg:flex flex-col space-y-4 z-0'
        )}
      >
        <StoriesSection />
        <SuggestedGroups />
        <ChatSection />
      </aside>
    </div>
  );
};

export default SocialMediaDashboardPage;
