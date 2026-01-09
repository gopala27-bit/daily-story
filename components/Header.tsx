
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BookIcon, ProfileIcon, WriteIcon } from './icons';

export const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/home" className="text-xl font-bold font-serif text-slate-800">
              Daily Story
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/home" className={navLinkClasses}>
              <BookIcon />
              Today's Stories
            </NavLink>
            <NavLink to="/write" className={navLinkClasses}>
              <WriteIcon />
              Write Story
            </NavLink>
            <NavLink to="/profile" className={navLinkClasses}>
              <ProfileIcon />
              Profile
            </NavLink>
          </div>
          <div className="flex items-center">
             <span className="text-sm text-slate-500 mr-4 hidden sm:inline">Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>
       {/* Mobile navigation */}
       <div className="md:hidden border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex justify-around">
            <NavLink to="/home" className={navLinkClasses}><BookIcon /></NavLink>
            <NavLink to="/write" className={navLinkClasses}><WriteIcon /></NavLink>
            <NavLink to="/profile" className={navLinkClasses}><ProfileIcon /></NavLink>
          </div>
       </div>
    </header>
  );
};

export default Header;
