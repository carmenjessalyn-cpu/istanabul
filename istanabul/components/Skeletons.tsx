export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Lagi ngambil kabar anabul...</span>
      <div className="skeleton h-5 w-32" />
      <div className="skeleton mt-3 h-9 w-72 max-w-full" />
      <div className="skeleton mt-3 h-5 w-96 max-w-full" />
      <div className="mt-6 space-y-5">
        {[0, 1].map((i) => (
          <div key={i} className="card flex flex-col overflow-hidden sm:flex-row">
            <div className="skeleton aspect-[16/10] w-full rounded-none sm:aspect-auto sm:h-56 sm:w-48" />
            <div className="flex-1 space-y-3 p-5">
              <div className="skeleton h-7 w-40" />
              <div className="skeleton h-4 w-56 max-w-full" />
              <div className="skeleton h-10 w-full" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-11 w-44 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PetSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Lagi nyambungin ke kamar anabul...</span>
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-7 w-36" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <div className="skeleton mt-4 h-12 w-full" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-6">
        <div className="space-y-4">
          <div className="card aspect-video w-full bg-plum-2" />
          <div className="grid grid-cols-2 gap-3">
            <div className="skeleton h-12 rounded-full" />
            <div className="skeleton h-12 rounded-full" />
          </div>
        </div>
        <div className="space-y-5">
          <div className="card space-y-3 p-5">
            <div className="skeleton h-6 w-40" />
            <div className="grid grid-cols-3 gap-2">
              <div className="skeleton h-16" />
              <div className="skeleton h-16" />
              <div className="skeleton h-16" />
            </div>
            <div className="skeleton h-24" />
          </div>
          <div className="card space-y-3 p-5">
            <div className="skeleton h-6 w-32" />
            <div className="skeleton h-14" />
            <div className="skeleton h-14" />
          </div>
        </div>
      </div>
    </div>
  );
}
