"use client";

import { useState, useEffect } from "react";
import {useRouter} from 'next/navigation'
import Image from "next/image";
import Link from "next/link";

type CategoryType = {
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
  idCategory: string;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const router=useRouter()
const clickHandler=(category:string)=>{
router.push(`/category/${category}`)
}
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Discover Culinary Delights
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Explore Food <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
            Browse through our handpicked collection of global food categories, ingredients, and authentic recipes to fuel your next kitchen adventure.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 animate-pulse">
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
                <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                  <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto text-center py-16 px-4 bg-white rounded-3xl border border-red-100 shadow-sm">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Unable to load categories</h3>
            <p className="text-sm text-slate-500">Please check your connection and try refreshing the page.</p>
          </div>
        )}

        {/* Categories Grid */}
        {!isLoading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div 
                key={category.idCategory} 
                className="group relative bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 mb-5">
                    <Image
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Category Title */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {category.strCategory}
                    </h2>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      ID: {category.idCategory}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                    {category.strCategoryDescription}
                  </p>
                </div>

                {/* Action Link / Button */}
                <Link href={`/category/${category.strCategory}`} className="w-full py-2.5 px-4 rounded-xl bg-slate-50 text-slate-700 font-medium text-sm group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200 flex items-center justify-center gap-2">
                  <span>Explore Meals</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}