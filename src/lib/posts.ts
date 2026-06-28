export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote';
  level?: number; // heading level
  text?: string;
  items?: string[]; // list items
  lang?: string; // code language
  caption?: string; // blockquote attribution
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

const MOCK_POSTS: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World — 出发与期待',
    date: '2026-06-20',
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
    date: '2026-06-15',
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
        text: '这是最大、也最容易踩的坑。Next.js 16 中，params、searchParams、cookies()、headers() 全部变为异步函数 —— 同步访问已被移除。这意味着所有依赖路由参数的组件都需要加上 await：',
      },
      {
        type: 'code',
        lang: 'tsx',
        text: "// ❌ Next.js 15 的方式\ninterface Props {\n  params: { slug: string };\n}\n\nexport default function PostPage({ params }: Props) {\n  const post = getPost(params.slug);\n  return <article>{post.title}</article>;\n}\n\n// ✅ Next.js 16 的方式\ninterface Props {\n  params: Promise<{ slug: string }>;\n}\n\nexport default async function PostPage({ params }: Props) {\n  const { slug } = await params;\n  const post = getPost(slug);\n  return <article>{post.title}</article>;\n}",
      },
      {
        type: 'paragraph',
        text: '这个变化虽然需要改造已有代码，但设计上更诚实 —— 路由解析本来就是异步的，让框架底层的真实行为浮出水面，避免了隐式的同步糖衣。',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Proxy 替代 Middleware',
      },
      {
        type: 'paragraph',
        text: 'middleware.ts 被重命名为 proxy.ts，middleware 函数也改名 proxy。别犯惯性的创建 middleware.ts —— 这个文件不会被识别。新的 proxy 模型在处理请求转发、重写和响应修改方面更加灵活。',
      },
      {
        type: 'heading',
        level: 2,
        text: "'use cache' 指令",
      },
      {
        type: 'paragraph',
        text: '全新的缓存策略。不再需要在路由级别配置 static/dynamic/revalidate，而是在 async 函数上直接标注 use cache。这让缓存粒度从"页面级"降到了"函数级"：',
      },
      {
        type: 'code',
        lang: 'ts',
        text: "// 函数级别的缓存控制\nasync function getPost(slug: string) {\n  'use cache';\n  const post = await db.post.findUnique({ where: { slug } });\n  return post;\n}",
      },
      {
        type: 'paragraph',
        text: '配合 revalidateTag 的新签名（需要传第二个参数作为 cache profile 名称），缓存失效也更加精确可控。',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Turbopack 默认启用',
      },
      {
        type: 'paragraph',
        text: 'Turbopack 成为默认打包器，开发体验提升显著。热更新几乎零延迟，冷启动也比 Webpack 快了几个数量级。对于日常开发来说，这可能是感知最强的变化之一。',
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
    date: '2026-05-28',
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
        text: '最大的心智转换：不再有 tailwind.config.ts。所有主题定制都在 CSS 文件中用 @theme 声明：',
      },
      {
        type: 'code',
        lang: 'css',
        text: '@import "tailwindcss";\n\n@theme {\n  --color-primary: #3b82f6;\n  --font-display: "Geist", sans-serif;\n}',
      },
      {
        type: 'paragraph',
        text: '设计令牌现在以原生 CSS 变量的形式存在，这意味着你可以在任何地方用 var(--color-primary) 引用它们，不再需要 resolveConfig 这类运行时 API。',
      },
      {
        type: 'heading',
        level: 2,
        text: '新的 P3 调色板',
      },
      {
        type: 'paragraph',
        text: 'v4 的默认调色板针对 Display P3 色域重新设计。颜色更鲜活、更饱满 —— 在支持 P3 的屏幕上能感受到明显的色彩提升，而不支持的设备会自动回退到 sRGB。这是那种「无声的提升」，普通读者可能注意不到，但视觉质感确实不一样了。',
      },
      {
        type: 'heading',
        level: 2,
        text: '容器查询',
      },
      {
        type: 'paragraph',
        text: '第一方容器查询支持，终于不用再靠媒体查询来判断组件宽度了：',
      },
      {
        type: 'code',
        lang: 'html',
        text: '<div class="@container">\n  <div class="grid @lg:grid-cols-3 @md:grid-cols-2">\n    <!-- 基于父容器宽度响应，而非视口宽度 -->\n  </div>\n</div>',
      },
      {
        type: 'heading',
        level: 2,
        text: '暗色模式',
      },
      {
        type: 'paragraph',
        text: 'v4 的暗色模式变体更加灵活。新增的 @custom-variant dark 指令让你自定义暗色模式的触发条件：',
      },
      {
        type: 'code',
        lang: 'css',
        text: '/* 基于 class 策略（配合 next-themes） */\n@custom-variant dark (&:where(.dark, .dark *));\n\n/* 或基于系统偏好 */\n@custom-variant dark (&:where(@media (prefers-color-scheme: dark)));',
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
    date: '2026-05-10',
    excerpt:
      '在日常开发中积累的几个 TypeScript 模式：品牌类型、可辨识联合、模板字面量类型等。',
    tags: ['TypeScript', '编程'],
    readingTime: '5 min read',
    content: [
      {
        type: 'paragraph',
        text: 'TypeScript 的类型系统足够强大，但用好它需要一些模式。以下是我在项目中最常使用的几个，记下来方便回顾。',
      },
      {
        type: 'heading',
        level: 2,
        text: '品牌类型（Branded Types）',
      },
      {
        type: 'paragraph',
        text: '防止将原始类型的值互相混用的经典方案。比如 UserId 和 PostId 都是 string，但不应互换：',
      },
      {
        type: 'code',
        lang: 'ts',
        text: "type Brand<T, B> = T & { __brand: B };\ntype UserId = Brand<string, 'UserId'>;\ntype PostId = Brand<string, 'PostId'>;\n\nfunction getUser(id: UserId) { /* ... */ }\n\nconst userId = 'abc' as UserId;\nconst postId = 'xyz' as PostId;\ngetUser(userId); // ✅\n// getUser(postId); // ❌ 类型错误",
      },
      {
        type: 'heading',
        level: 2,
        text: '可辨识联合（Discriminated Unions）',
      },
      {
        type: 'paragraph',
        text: '用字面量字段区分联合类型的变体，配合 switch 获得穷举检查：',
      },
      {
        type: 'code',
        lang: 'ts',
        text: "type Result<T> =\n  | { status: 'success'; data: T }\n  | { status: 'loading' }\n  | { status: 'error'; message: string };\n\nfunction render<T>(result: Result<T>) {\n  switch (result.status) {\n    case 'success': return <Data data={result.data} />;\n    case 'loading': return <Spinner />;\n    case 'error': return <Error msg={result.message} />;\n  }\n}",
      },
      {
        type: 'heading',
        level: 2,
        text: '模板字面量类型',
      },
      {
        type: 'paragraph',
        text: '做 string 级别的类型体操时非常好用。比如从路由映射到其参数类型：',
      },
      {
        type: 'code',
        lang: 'ts',
        text: "type Route = `/posts/${string}` | `/tags/${string}`;\ntype RouteParams<T extends string> =\n  T extends `/posts/${infer Slug}` ? { slug: Slug }\n  : T extends `/tags/${infer Tag}` ? { tag: Tag }\n  : never;\n\ntype PostParams = RouteParams<'/posts/nextjs-16'>; // { slug: 'nextjs-16' }",
      },
      {
        type: 'heading',
        level: 2,
        text: '小结',
      },
      {
        type: 'paragraph',
        text: 'TypeScript 的类型不是为了让代码变复杂，而是为了让边界更明确、让错误提前暴露。这些模式在日常开发中已经帮了我很多次。',
      },
    ],
  },
  {
    slug: 'react-server-components',
    title: '理解 React Server Components 的心智模型',
    date: '2026-04-22',
    excerpt:
      'RSC 不是 SSR 2.0。本文从组件边界、数据流、序列化三个角度建立对 Server Components 的正确直觉。',
    tags: ['React', '前端', '架构'],
    readingTime: '7 min read',
    content: [
      {
        type: 'paragraph',
        text: 'React Server Components（RSC）可能是近年来最被误解的 React 特性。它常被当作「SSR 2.0」来理解，但这个类比是错的。RSC 解决的是一个完全不同的问题。',
      },
      {
        type: 'heading',
        level: 2,
        text: 'RSC ≠ SSR',
      },
      {
        type: 'paragraph',
        text: 'SSR（Server-Side Rendering）解决的是「让 HTML 更快到达用户」。服务端把组件渲染成 HTML，浏览器收到后 Hydrate。这个过程发生一次，之后和传统 SPA 一样。',
      },
      {
        type: 'paragraph',
        text: 'RSC 解决的是「让 JavaScript 不要到达用户」。Server Component 在服务端执行完毕，只发送序列化的 UI 描述（React Flight 格式），不发送组件代码。它永远不会 Hydrate —— 因为根本没有客户端对应物。',
      },
      {
        type: 'blockquote',
        text: 'SSR 加速了首次渲染。RSC 减少了发送到浏览器的 JavaScript 总量。它们是正交的优化维度。',
      },
      {
        type: 'heading',
        level: 2,
        text: '组件边界 = 数据流边界',
      },
      {
        type: 'paragraph',
        text: '理解了组件边界就理解了 RSC 的核心。Server Component 可以直接访问数据库、文件系统、后端 API —— 不需要 fetch、不需要 useEffect、不需要自定义 Hook。它就在服务器上运行：',
      },
      {
        type: 'code',
        lang: 'tsx',
        text: "// 这是一个 Server Component\n// 可以直接 await 数据库查询，不需要任何数据获取库\nexport default async function PostList() {\n  const posts = await db.post.findMany({\n    orderBy: { createdAt: 'desc' },\n    take: 10,\n  });\n\n  return (\n    <ul>\n      {posts.map((post) => (\n        <PostCard key={post.id} post={post} />\n      ))}\n    </ul>\n  );\n}",
      },
      {
        type: 'paragraph',
        text: '而 Client Component 只能通过 props 接收序列化后的数据。从这个角度，组件树不再只是「UI 的层级」，还是「数据能力的边界」—— 离服务器越近，权限越大。',
      },
      {
        type: 'heading',
        level: 2,
        text: '序列化是理解的关键',
      },
      {
        type: 'paragraph',
        text: 'Server Component 的返回值需要能被序列化。这意味着不能返回函数、不能返回类的实例、不能返回有循环引用的对象。这个限制不是 Bug，是设计意图 —— 它强制你将「需要交互」的部分隔离到 Client Component 中。',
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
          '这个组件只是一个「展示壳」，数据从父组件传来？→ Server Component 或 Client Component 都可以',
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
        text: 'RSC 的心智模型不是「把HTML提前渲染」，而是「让 JavaScript 留在服务器」。一旦转过这个弯，很多设计决策就自然了 — use client 从「默认值」变成了需要深思熟虑的「例外」。',
      },
    ],
  },
];

export function getAllPosts(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return MOCK_POSTS.map(({ content, ...meta }) => meta).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const sorted = getAllPosts();
  const index = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
