import { db } from '@/lib/db';
import type { Prisma } from '@/generated/prisma/client';

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote';
  level?: number;
  text?: string;
  items?: string[];
  lang?: string;
  caption?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
}

export interface Post extends PostMeta {
  content: ContentBlock[];
}

type PrismaPost = Prisma.PostGetPayload<Record<string, never>>;

function toPostMeta(p: PrismaPost): PostMeta {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date.toISOString().split('T')[0],
    excerpt: p.excerpt,
    tags: p.tags,
    readingTime: p.readingTime,
    featured: p.featured,
  };
}

function toPost(p: PrismaPost): Post {
  return {
    ...toPostMeta(p),
    content: p.content as unknown as ContentBlock[],
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await db.post.findMany({
    orderBy: { date: 'desc' },
  });
  return posts.map(toPostMeta);
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const posts = await db.post.findMany({
    where: { featured: true },
    orderBy: { date: 'desc' },
  });
  return posts.map(toPostMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const post = await db.post.findUnique({ where: { slug } });
  return post ? toPost(post) : undefined;
}

export async function getAdjacentPosts(
  slug: string
): Promise<{ prev: PostMeta | null; next: PostMeta | null }> {
  const all = await getAllPosts();
  const index = all.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
