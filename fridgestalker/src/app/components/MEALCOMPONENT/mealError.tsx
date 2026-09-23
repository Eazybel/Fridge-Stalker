type errorType={
    error:any
}
export default function MealError(props:errorType) {
  return (
    <main className="min-h-screen bg-slate-50/60 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white rounded-3xl border border-red-100 shadow-sm">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
            ⚠️
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Failed to load recipe</h3>
          <p className="text-sm text-slate-500">{props.error}</p>
        </div>
      </main>
  )
}