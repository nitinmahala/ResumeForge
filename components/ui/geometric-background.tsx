export function GeometricBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-grid-slate-200/70 dark:bg-grid-slate-700/20 bg-[bottom_1px_center] dark:bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,50%,white)]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      {/* Dots pattern */}
      <div className="absolute inset-y-0 right-0 w-1/3">
        <div
          className="h-full w-full bg-dots-slate-200/50 dark:bg-dots-slate-700/20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3e%3ccircle cx='16' cy='16' r='1.5' stroke='rgb(15 23 42 / 0.1)'/%3e%3c/svg%3e")`,
            backgroundSize: "16px 16px",
          }}
        />
      </div>
    </div>
  )
}

