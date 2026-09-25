"use client";
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import HeaderMeal from "@/app/components/Header/HeaderMeal"

export type MealsType = {
  idMeal: string;
  strArea?: string;
  strCountry?: string;
  strMeal: string;
  strMealThumb: string;
};

export default function MealItems() {
  const [meals, setMeals] = useState<MealsType[] | []>([]); // safe init
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const paramsItem = useParams<{ mealItem: string }>();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${paramsItem?.mealItem}`);
        
        if (!res.ok) throw new Error('Failed to fetch meals');
        
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    if (paramsItem?.mealItem) {
      fetchMeal();
    }
  }, [paramsItem?.mealItem]);

  // 1. Loading State UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // 2. Error State UI
  if (error) {
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  // 3. Empty State UI
  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        No meals found for "{paramsItem?.mealItem}".
      </div>
    );
  }

  // 4. Main Grid View
  return (<>
  <HeaderMeal allMeals={meals}/>
  
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 capitalize">
        Category: {paramsItem?.mealItem}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals?.map((meal) => (
          <div 
            key={meal.idMeal} 
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  fill
                  sizes="auto"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-2">
                  {meal.strMeal}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  {meal.strArea && <span className="bg-gray-100 px-2 py-1 rounded-md">{meal.strArea}</span>}
                  <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-medium">ID: {meal.idMeal}</span>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <Link
                target="_blank"
                href={`/meal/${meal.idMeal}`}
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm"
              >
                See Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  
  </>);
}