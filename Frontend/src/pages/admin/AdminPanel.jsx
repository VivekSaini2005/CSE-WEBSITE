import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/news', label: 'News' },
  { to: '/admin/faculty', label: 'Faculty' },
  { to: '/admin/projects', label: 'Projects' },
];

const AdminPanel = () => {
  return (
    <div className="min-h-[70vh] flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 p-6 flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-6 text-blue-700">Admin Panel</h2>
        {sidebarLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </aside>
      {/* Content Area */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
