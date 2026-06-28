import type { JSX } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CopyButton } from '@/components/CopyButton';
import { ReadingProgress } from '@/components/ReadingProgress';
import { getPostBySlug, getAdjacentPosts, getAllPosts } from '@/lib/posts';
import type { ContentBlock } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level ?? 2}` as keyof JSX.IntrinsicElements;
            const styles: Record<number, string> = {
              2: 'mt-12 mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100',
              3: 'mt-8 mb-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100',
            };
            return (
              <Tag key={i} className={styles[block.level ?? 2] ?? styles[2]}>
                {block.text}
              </Tag>
            );
          }

          case 'paragraph':
            return (
              <p
                key={i}
                className="my-5 leading-8 text-zinc-600 dark:text-zinc-350"
              >
                {block.text}
              </p>
            );

          case 'code':
            return (
              <div key={i} className="group/code relative my-6 -mx-4 sm:mx-0">
                {block.lang && (
                  <div className="flex items-center justify-between rounded-t-xl border border-zinc-800 bg-zinc-900 px-4 py-2">
                    <span className="text-xs font-medium text-zinc-500">
                      {block.lang}
                    </span>
                  </div>
                )}
                <CopyButton code={block.text ?? ''} />
                <pre
                  className={`overflow-x-auto bg-zinc-900 px-4 py-4 text-sm leading-relaxed ${
                    block.lang
                      ? 'rounded-b-xl border-x border-b border-zinc-800'
                      : 'rounded-xl'
                  }`}
                >
                  <code className="text-zinc-200">{block.text}</code>
                </pre>
              </div>
            );

          case 'list':
            return (
              <ul key={i} className="my-5 space-y-2">
                {block.items?.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 leading-7 text-zinc-600 dark:text-zinc-350"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-400 dark:bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="relative my-8 border-l-[3px] border-blue-400 bg-blue-50/50 px-6 py-4 text-zinc-600 dark:border-blue-500 dark:bg-blue-950/20 dark:text-zinc-350"
              >
                <p className="leading-8">{block.text}</p>
                {block.caption && (
                  <cite className="mt-2 block text-sm not-italic text-zinc-400 dark:text-zinc-500">
                    —— {block.caption}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <ReadingProgress />
      <Navbar />

      <main className="flex-1 px-6 pb-20 pt-8 sm:pb-28 sm:pt-12">
        <article className="mx-auto max-w-3xl">
          {/* ───── Post Header ───── */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
                >
                  {tag}
                </Link>
              ))}
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-3 border-b border-zinc-100 pb-6 dark:border-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                K
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Kincy
                </p>
                <time
                  className="text-sm text-zinc-400 dark:text-zinc-500"
                  dateTime={post.date}
                >
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* ───── Post Content ───── */}
          <div className="text-zinc-600 dark:text-zinc-350">
            <ContentRenderer blocks={post.content} />
          </div>

          {/* ───── Post Footer ───── */}
          <div className="mt-16 border-t border-zinc-100 pt-8 dark:border-zinc-800">
            {/* Tags roundup */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                标签:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-flex items-center rounded-full border border-zinc-200 px-3 py-0.5 text-xs font-medium text-zinc-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-blue-600 dark:hover:text-blue-400"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Adjacent posts */}
            <nav
              aria-label="文章导航"
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="group rounded-xl border border-zinc-200/70 p-5 transition-all hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:hover:border-blue-800/50"
                >
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    ← 上一篇
                  </span>
                  <p className="mt-1 font-medium text-zinc-700 transition-colors group-hover:text-blue-600 dark:text-zinc-300 dark:group-hover:text-blue-400">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/posts/${next.slug}`}
                  className="group rounded-xl border border-zinc-200/70 p-5 text-right transition-all hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:hover:border-blue-800/50"
                >
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    下一篇 →
                  </span>
                  <p className="mt-1 font-medium text-zinc-700 transition-colors group-hover:text-blue-600 dark:text-zinc-300 dark:group-hover:text-blue-400">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </nav>

            {/* Back to home */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← 返回首页
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
