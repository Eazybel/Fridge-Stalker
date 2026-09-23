"use client";

type mealType = {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCountry: string;
  strMeasure: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
  keys: string;
};
type mealTypePartia = Partial<mealType>;

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import MealLoader from "@/app/components/MEALCOMPONENT/mealloader"
import MealError from "@/app/components/MEALCOMPONENT/mealError"

export default function Page() {
  const paramsItem = useParams<{ mealType: string }>();
  const [recipe, setRecipe] = useState<mealTypePartia>();
  const [isLoading, setLoad] = useState(true);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [measures, setMeasures] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramsItem.mealType}`
        );
        if (!res.ok) throw new Error("Failed to fetch recipe details");
        
        const data = await res.json();
        const fetchedMeal = data.meals[0];
        setRecipe(fetchedMeal);

        // Handle YouTube URL extraction safely
        if (fetchedMeal?.strYoutube) {
          const strUrl = fetchedMeal.strYoutube.split("v=")[1]?.split("&")[0];
          if (strUrl) {
            setUrl(`https://www.youtube.com/embed/${strUrl}`);
          }
        }

        // Handle Dynamic Ingredients & Measures loop
        if (fetchedMeal?.idMeal) {
          const meals = fetchedMeal as Record<string, any>;
          const newIngredient: string[] = [];
          const newMeasure: string[] = [];
          
          for (let i = 1; i <= 20; i++) {
            const ing = meals[`strIngredient${i}`];
            const mea = meals[`strMeasure${i}`];
            
            if (ing && ing.trim() !== "") {
              newIngredient.push(ing);
              newMeasure.push(mea ? mea.trim() : "");
            }
          }
          setIngredients(newIngredient);
          setMeasures(newMeasure);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoad(false);
      }
    };

    if (paramsItem?.mealType) {
      fetchData();
    }
  }, [paramsItem?.mealType]);

  // Loading Skeleton State
  if (isLoading) {
    return  <MealLoader/>
    
  }

  // Error State
  if (error) {
    return <MealError error={error}/>
  }

  // Split instructions by line breaks to create steps
  const instructionSteps = recipe?.strInstructions
    ? recipe.strInstructions.split(/\r?\n/).filter((step) => step.trim() !== "")
    : [];

  return (
    <main className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      {recipe && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          
          {/* Header Banner Section */}
          <div className="p-6 sm:p-10 border-b border-slate-100 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {recipe.strCategory && (
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold tracking-wide uppercase">
                  {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase">
                  🌍 {recipe.strArea}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {recipe.strMeal}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Recipe ID: {recipe.idMeal}</p>
          </div>

          <div className="p-6 sm:p-10 space-y-10">
            
            {/* Main Image */}
            {recipe.strMealThumb && (
              <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <Image
                  src={recipe.strMealThumb}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  alt={recipe.strMeal || "Food thumbnail"}
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Ingredients & Measures Table Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>🛒</span> Ingredients & Measurements
              </h2>
              
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-sm font-semibold">
                      <th className="py-3.5 px-6">Ingredient</th>
                      <th className="py-3.5 px-6">Measure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                    {ingredients.map((ingredient: string, index: number) => (
                      <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-6 font-medium text-slate-900">{ingredient}</td>
                        <td className="py-3 px-6 text-orange-600 font-semibold">{measures[index] || "To taste"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions Section */}
            {instructionSteps.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>📝</span> Step-by-Step Instructions
                </h2>
                <div className="space-y-3">
                  {instructionSteps.map((step, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-relaxed"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Tutorial Section */}
            {url && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🎥</span> Video Tutorial
                </h2>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900">
                  <iframe
                    src={url}
                    title={recipe.strMeal || "Recipe Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}