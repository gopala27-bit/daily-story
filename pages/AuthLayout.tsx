
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold font-serif text-center text-slate-800 mb-4">
          Daily Story
        </h1>
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
