import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL_BLOG!.replace(
  'sslmode=require',
  'sslmode=verify-full'
);

const db = new PrismaClient({
  adapter: new PrismaPg(
    new pg.Pool({
      connectionString,
    })
  ),
});

const POSTS = [
  {
    slug: 'hello-world',
    title: 'Hello, World — 出发与期待',
    date: new Date('2026-06-20'),
    excerpt:
      '这是博客的第一篇文章。聊聊为什么开始写博客，以及接下来的写作计划与技术方向。',
    tags: ['随笔', '博客'],
    readingTime: '3 min read',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: '写博客这个念头在脑子里转了许久，终于在这个午后落了地。建站、选技术栈、调样式 —— 折腾的快乐大概只有程序员才懂。',
      },
      {
        type: 'heading',
        level: 2,
        text: '为什么开始写',
      },
      {
        type: 'paragraph',
        text: '费曼说，教是最好的学。当你能把一件事写清楚，才算真正理解它。这个博客既是笔记本，也是公开的思考痕迹 —— 记录在前端、TypeScript 和软件开发中踩过的坑与心得。',
      },
      {
        type: 'paragraph',
        text: '还有一个私心：在 AI 生成内容泛滥的时代，留下一点由人类慢慢敲出来的文字。慢下来，认真想，好好写。',
      },
      {
        type: 'heading',
        level: 2,
        text: '接下来会写什么',
      },
      {
        type: 'list',
        items: [
          'Next.js 16 新特性的实战笔记',
          'TypeScript 类型体操与实用模式',
          'Tailwind CSS v4 的迁移与心得',
          'React Server Components 心智模型',
          '偶尔的阅读推荐与生活随笔',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '技术选型',
      },
      {
        type: 'paragraph',
        text: '这个博客用 Next.js 16 + Tailwind CSS 4 搭建，部署在 Vercel。选这套技术栈没有特别的理由 —— 只是刚好在学，刚好想做。Server Components by default、async 请求 API 这些新范式，边写博客边实践再合适不过。',
      },
      {
        type: 'code',
        lang: 'tsx',
        text: '// 写博客也是写代码\nconst blog = {\n  framework: "Next.js 16",\n  styling: "Tailwind CSS 4",\n  host: "Vercel",\n  philosophy: "Less is more",\n};',
      },
      {
        type: 'paragraph',
        text: '内容为王，工具只是工具。但用好工具，能让内容更好地被看到、被阅读。',
      },
    ],
  },
  {
    slug: 'nextjs-16-deep-dive',
    title: 'Next.js 16 新特性深度解析',
    date: new Date('2026-06-15'),
    excerpt:
      'Next.js 16 带来了全新的 async 请求 API、Proxy 替代 Middleware、use cache 指令等重大变化。本文逐一拆解这些新特性及其最佳实践。',
    tags: ['Next.js', 'React', '前端'],
    readingTime: '8 min read',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'Next.js 16 是一个重要的里程碑版本。它重新思考了请求处理、缓存策略和构建管线，将 React 的现代范式深度整合进框架。本文整理了几个影响最大的变化。',
      },
      {
        type: 'heading',
        level: 2,
        text: 'async 请求 API',
      },
      {
        type: 'paragraph',
        text: '这是最大、也最容易踩的坑。Next.js 16 中，params、searchParams、cookies()、headers() 全部变为异步函数 —— 同步访问已被移除。',
      },
      {
        type: 'code',
        lang: 'tsx',
        text: "// ❌ 旧方式\ninterface Props {\n  params: { slug: string };\n}\n\nexport default function PostPage({ params }: Props) {\n  const post = getPost(params.slug);\n  return <article>{post.title}</article>;\n}\n\n// ✅ Next.js 16 方式\ninterface Props {\n  params: Promise<{ slug: string }>;\n}\n\nexport default async function PostPage({ params }: Props) {\n  const { slug } = await params;\n  const post = getPost(slug);\n  return <article>{post.title}</article>;\n}",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Proxy 替代 Middleware',
      },
      {
        type: 'paragraph',
        text: 'middleware.ts 被重命名为 proxy.ts，middleware 函数也改名 proxy。别凭惯性创建 middleware.ts —— 这个文件不会被识别。',
      },
      {
        type: 'heading',
        level: 2,
        text: "'use cache' 指令",
      },
      {
        type: 'paragraph',
        text: '全新的缓存策略。不再需要在路由级别配置 static/dynamic/revalidate，而是在 async 函数上直接标注 use cache。这让缓存粒度从「页面级」降到了「函数级」。',
      },
      {
        type: 'heading',
        level: 2,
        text: '小结',
      },
      {
        type: 'paragraph',
        text: 'Next.js 16 的改动幅度不小，但方向是清晰的：拥抱异步、精细化缓存、性能优先。迁移成本取决于项目对旧 API 的依赖程度 —— 建议逐步来，先让 lint 通过，再逐个模块测试。',
      },
    ],
  },
  {
    slug: 'tailwind-css-v4-guide',
    title: 'Tailwind CSS v4 迁移指南',
    date: new Date('2026-05-28'),
    excerpt:
      '从 v3 到 v4：CSS-first 配置、全新的 P3 色域调色板、容器查询、3D 变换工具类……一份详尽的迁移与实战指南。',
    tags: ['CSS', 'Tailwind', '前端'],
    readingTime: '6 min read',
    featured: true,
    content: [
      {
        type: 'paragraph',
        text: 'Tailwind CSS v4 是一次「引擎级」重写。不是加几个工具类那么简单，而是从配置方式到构建管线都翻新了。本文记录迁移过程中遇到的关键变化和心得。',
      },
      {
        type: 'heading',
        level: 2,
        text: 'CSS-First 配置',
      },
      {
        type: 'paragraph',
        text: '最大的心智转换：不再有 tailwind.config.ts。所有主题定制都在 CSS 文件中用 @theme 声明。设计令牌现在以原生 CSS 变量的形式存在。',
      },
      {
        type: 'heading',
        level: 2,
        text: '迁移建议',
      },
      {
        type: 'list',
        items: [
          '先升级到最新 v3 版本，确保代码干净',
          '用官方迁移工具运行自动化转换',
          '检查所有 @apply 指令 —— v4 对层叠规则更严格',
          '利用新的 bg-linear-to-r 等规范类名（gradient → linear）',
          '享受更快的构建速度和更小的 CSS 产出',
        ],
      },
    ],
  },
  {
    slug: 'typescript-patterns',
    title: 'TypeScript 实用模式总结',
    date: new Date('2026-05-10'),
    excerpt:
      '在日常开发中积累的几个 TypeScript 模式：品牌类型、可辨识联合、模板字面量类型等。',
    tags: ['TypeScript', '编程'],
    readingTime: '5 min read',
    content: [
      {
        type: 'paragraph',
        text: 'TypeScript 的类型系统足够强大，但用好它需要一些模式。以下是我在项目中最常使用的几个。',
      },
      {
        type: 'heading',
        level: 2,
        text: '品牌类型',
      },
      {
        type: 'paragraph',
        text: '防止将原始类型的值互相混用的经典方案。比如 UserId 和 PostId 都是 string，但不应互换。',
      },
      {
        type: 'heading',
        level: 2,
        text: '可辨识联合',
      },
      {
        type: 'paragraph',
        text: '用字面量字段区分联合类型的变体，配合 switch 获得穷举检查。这是 TypeScript 最优雅的模式之一。',
      },
      {
        type: 'heading',
        level: 2,
        text: '模板字面量类型',
      },
      {
        type: 'paragraph',
        text: '做 string 级别的类型体操时非常好用，比如从路由映射到其参数类型。',
      },
    ],
  },
  {
    slug: 'react-server-components',
    title: '理解 React Server Components 的心智模型',
    date: new Date('2026-04-22'),
    excerpt:
      'RSC 不是 SSR 2.0。本文从组件边界、数据流、序列化三个角度建立对 Server Components 的正确直觉。',
    tags: ['React', '前端', '架构'],
    readingTime: '7 min read',
    content: [
      {
        type: 'paragraph',
        text: 'React Server Components（RSC）可能是近年来最被误解的 React 特性。它常被当作「SSR 2.0」来理解，但这个类比是错的。',
      },
      {
        type: 'heading',
        level: 2,
        text: 'RSC ≠ SSR',
      },
      {
        type: 'paragraph',
        text: 'SSR 解决的是「让 HTML 更快到达用户」。RSC 解决的是「让 JavaScript 不要到达用户」—— Server Component 的组件代码永远不会发送到浏览器。',
      },
      {
        type: 'heading',
        level: 2,
        text: '心智模型检查清单',
      },
      {
        type: 'list',
        items: [
          '这个组件需要直接访问数据库吗？→ Server Component',
          '这个组件需要用户交互（点击、输入、滚动监听）吗？→ Client Component',
          '这个组件只是一个「展示壳」，数据从父组件传来？→ 都可以',
          '不确定？→ 默认用 Server Component，需要时再切',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: '小结',
      },
      {
        type: 'paragraph',
        text: 'RSC 的心智模型不是「把 HTML 提前渲染」，而是「让 JavaScript 留在服务器」。一旦转过这个弯，use client 从「默认值」变成了需要深思熟虑的「例外」。',
      },
    ],
  },
];

async function seed() {
  console.log('🌱 开始播种...');

  for (const post of POSTS) {
    await db.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: {
        ...post,
        featured: post.featured ?? false,
      },
    });
    console.log(`  ✅ ${post.slug}`);
  }

  console.log(`🎉 完成 — ${POSTS.length} 篇文章已写入`);
  await db.$disconnect();
}

seed().catch((e) => {
  console.error('❌ 播种失败:', e);
  process.exit(1);
});
