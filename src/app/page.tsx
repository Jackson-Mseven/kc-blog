import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getFeaturedPosts, getAllPosts } from '@/lib/posts';
import type { PostMeta } from '@/lib/posts';

function PostCardFeatured({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group relative flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800/50 dark:hover:shadow-blue-900/20 sm:p-8"
    >
      {/* Left gradient accent line */}
      <div className="absolute inset-y-4 left-0 w-0.75 rounded-full bg-linear-to-b from-blue-500 via-indigo-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {post.readingTime}
        </span>
      </div>

      <h3 className="text-xl font-semibold leading-7 text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400 sm:text-2xl">
        {post.title}
      </h3>

      <p className="mt-2 flex-1 leading-7 text-zinc-500 dark:text-zinc-400">
        {post.excerpt}
      </p>

      <time className="mt-5 block text-sm text-zinc-400 dark:text-zinc-500">
        {new Date(post.date).toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
    </Link>
  );
}

function PostListItem({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex items-baseline justify-between gap-6 border-b border-zinc-100 py-4 transition-colors hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <time className="text-sm text-zinc-400 dark:text-zinc-500">
            {new Date(post.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </time>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">
            {post.readingTime}
          </span>
          {post.tags.length > 0 && (
            <>
              <span className="text-zinc-300 dark:text-zinc-600">·</span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                {post.tags[0]}
              </span>
            </>
          )}
        </div>
      </div>
      <span className="shrink-0 text-sm tabular-nums text-zinc-400 dark:text-zinc-500">
        {new Date(post.date).getFullYear()}
      </span>
    </Link>
  );
}

export default function Home() {
  const featured = getFeaturedPosts();
  const recent = getAllPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ───── Hero ───── */}
        <section className="relative overflow-hidden px-6 pb-8 pt-20 sm:pb-12 sm:pt-28">
          {/* Decorative blobs */}
          <div className="blur-blob -left-32 top-0 h-72 w-72 from-blue-200 dark:from-blue-900/40" />
          <div className="blur-blob right-0 top-8 h-96 w-96 from-indigo-200 dark:from-indigo-900/30" />

          <div className="relative mx-auto max-w-5xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
              Kincy&apos;s{' '}
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-500 dark:text-zinc-400 sm:text-xl">
              写代码，也写思考。记录前端、TypeScript 与软件开发中的探索。
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com/kincy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://twitter.com/kincy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
              <a
                href="mailto:kincy@example.com"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </section>

        {/* ───── Featured Posts ───── */}
        <section className="px-6 pt-4 pb-12 sm:pb-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              精选文章
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <PostCardFeatured key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* ───── Recent Posts ───── */}
        <section className="px-6 pb-20 pt-4 sm:pb-28">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                最新文章
              </h2>
              <Link
                href="/archive"
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                查看全部 →
              </Link>
            </div>
            <div className="mt-4">
              {recent.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
