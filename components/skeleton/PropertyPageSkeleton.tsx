export default function PropertyPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-12 animate-pulse">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="h-6 w-24 rounded-lg bg-black/10" />
          <div className="h-10 w-80 rounded-xl bg-black/10" />
          <div className="h-5 w-48 rounded-lg bg-black/10" />
        </div>
        <div className="h-14 w-36 rounded-2xl bg-black/10" />
      </div>
      <div className="my-8 h-[400px] w-full rounded-3xl bg-black/10 md:h-[500px]" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-8 w-48 rounded-lg bg-black/10" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded-md bg-black/10" />
            <div className="h-4 w-5/6 rounded-md bg-black/10" />
            <div className="h-4 w-4/6 rounded-md bg-black/10" />
            <div className="h-4 w-full rounded-md bg-black/10" />
          </div>
        </div>
        <div className="h-[450px] w-full rounded-3xl bg-black/10" />
      </div>
    </div>
  );
}
