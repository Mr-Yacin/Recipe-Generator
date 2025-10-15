
import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

const Welcome: React.FC = () => {
    return (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
                <ChefHatIcon className="h-16 w-16 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome to the Recipe Generator!</h2>
            <p className="text-gray-600 dark:text-gray-400">
                Ready to cook something amazing? Just enter the ingredients you have, select your preferences, and let Gemini create a custom recipe for you.
            </p>
        </div>
    );
};

export default Welcome;
