
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

const TimeInfo: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{value}</p>
    </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{recipe.recipeName}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{recipe.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
        <TimeInfo label="Servings" value={recipe.servings} />
        <TimeInfo label="Prep Time" value={recipe.prepTime} />
        <TimeInfo label="Cook Time" value={recipe.cookTime} />
        <TimeInfo label="Total Time" value={recipe.totalTime} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">&#10003;</span>
                <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-emerald-500 text-white rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold mr-3 flex-shrink-0">{index + 1}</span>
                <span className="text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
