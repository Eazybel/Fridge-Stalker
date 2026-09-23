"use client"
export default function Mealloader() {
  return (
     <main className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded-xl w-3/4"></div>
          <div className="w-full h-96 bg-slate-200 rounded-2xl"></div>
          <div className="space-y-3">
            <div className="h-5 bg-slate-200 rounded-md w-full"></div>
            <div className="h-5 bg-slate-200 rounded-md w-5/6"></div>
          </div>
        </div>
      </main>
  )
}