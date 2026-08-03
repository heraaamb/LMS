import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-xs text-slate-500 font-medium space-x-1.5" aria-label="Breadcrumb">
      <Link to="/" className="text-slate-400 hover:text-slate-600 transition-colors flex items-center">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = value
          .replace(/-/g, ' ')
          .replace(/^(\w)/, (c) => c.toUpperCase());

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
            {isLast ? (
              <span className="text-slate-800 font-semibold truncate max-w-[150px]">{formattedName}</span>
            ) : (
              <Link to={to} className="hover:text-slate-700 transition-colors capitalize">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
