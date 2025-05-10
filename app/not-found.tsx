import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center animate-fade-in">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-zinc-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all"
      >
        Go back home
      </Link>
    </main>
  );
}
