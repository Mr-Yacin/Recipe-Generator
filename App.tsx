
import React, { useState, useCallback } from 'react';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import Header from './components/Header';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async (ingredients: string, mealType: string, dietaryRestrictions: string) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(ingredients, mealType, dietaryRestrictions);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Sorry, I couldn\'t come up with a recipe. Please check your ingredients and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
          
          <div className="mt-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <LoadingSpinner />
                <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">Crafting your recipe...</p>
              </div>
            )}
            {error && (
               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative shadow-md" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {recipe && <RecipeDisplay recipe={recipe} />}
            {!isLoading && !error && !recipe && <Welcome />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
