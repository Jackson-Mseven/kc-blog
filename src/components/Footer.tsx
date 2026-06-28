export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/60 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
        <span>&copy; {year} Kincy</span>
        <div className="flex items-center gap-5">
          <a
            href="/rss.xml"
            className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            RSS
          </a>
          <a
            href="https://github.com/kincy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            GitHub
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">
            Powered by Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
