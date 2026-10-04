export function AppErrorComponent({ error }: { error: Error }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl">This sheet failed to load.</h1>
      <p className="mt-3 text-muted">{error.message}</p>
    </main>
  );
}
