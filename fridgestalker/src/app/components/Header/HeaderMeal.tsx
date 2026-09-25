"use client";
import Link from 'next/link';
import { useState } from 'react';
export default function Header({allMeals}:any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-liniar-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              <span className="text-lg font-bold">🍳</span>
            </div>
            <span className="text-xl font-bold bg-liniar-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              Flavor<span className="text-orange-500">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link href="/" className="px-3.5 py-2 rounded-lg text-sm font-medium bg-orange-50 text-orange-600 transition-colors">
              Home
            </Link>
            <Link href="/pantry" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              Smart Pantry
            </Link>
            <Link href="/planner" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              Meal Planner
            </Link>
            <Link href="/favorites" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              Favorites
            </Link>
          </nav>

          {/* Search Input & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <form className="relative hidden sm:block w-48 lg:w-64">
              <label htmlFor="meal-search" className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </label>
              <input 
       
                type="text" 
                list="categoryList"
                id="meal-search" 
                placeholder="Search meals..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </form>
           

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors" 
              aria-label="Open Menu"
            >
              {isOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {/* Optional Mobile Search Bar */}
          <div className="relative sm:hidden pb-2">
            <input 
             list="categoryList"
              type="text" 
              placeholder="Search meals..." 
              className="w-full px-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500"
            />
          </div>

          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium bg-orange-50 text-orange-600"
          >
            Home
          </Link>
          <Link 
            href="/pantry" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Smart Pantry
          </Link>
          <Link 
            href="/planner" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Meal Planner
          </Link>
          <Link 
            href="/favorites" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Favorites
          </Link>
        </div>
      )}
      {allMeals&&<datalist id="categoryList">
             {
              allMeals.map((meal:Record<string,any>)=>{
                return <option value={meal.idMeal} key={meal.strMeal}>{meal.strMeal}</option>
              })
             }
</datalist>}
    </header>
  );
}