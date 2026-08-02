import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { CommandPalette } from './CommandPalette';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { useLibrary } from '../../context/LibraryContext';
import { Search, Menu } from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { setIsCommandPaletteOpen } = useLibrary();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Sidebar trigger & Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              title="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block truncate">
              <Breadcrumbs />
            </div>
          </div>

          {/* Right: Search, Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Cmd+K trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline font-normal text-slate-500">Quick search...</span>
              <kbd className="hidden md:inline font-mono text-[10px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Center */}
            <NotificationDropdown />

            {/* User Profile */}
            <ProfileDropdown />
          </div>
        </div>
      </header>

      {/* Cmd + K Search Dialog Modal */}
      <CommandPalette />
    </>
  );
};
