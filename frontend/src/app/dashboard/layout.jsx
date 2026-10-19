
export default function DashboardLayout({ children }) {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 text-slate-950 min-h-dvh p-3">
      <div className="max-w-7xl mx-auto space-y-6">
        <main>{children}</main>
      </div>
    </div>
  );
}
