
import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface RecipeFormProps {
  onSubmit: (ingredients: string, mealType: string, dietaryRestrictions: string) => void;
  isLoading: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('any');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('none');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSubmit(ingredients, mealType, dietaryRestrictions);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              What ingredients do you have?
            </label>
            <textarea
              id="ingredients"
              rows={4}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
              placeholder="e.g., chicken breast, broccoli, rice, soy sauce"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate ingredients with commas.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meal Type
              </label>
              <select
                id="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
              >
                <option value="any">Any</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="dietary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dietary Restrictions
              </label>
              <select
                id="dietary"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
              >
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading || !ingredients.trim()}
            className="w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? <><LoadingSpinner /> Generating...</> : 'Generate Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
