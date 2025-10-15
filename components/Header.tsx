
import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <ChefHatIcon className="h-8 w-8 text-emerald-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
          Gemini Recipe Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
