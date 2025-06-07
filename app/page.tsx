import Link from 'next/link';

export default function Page() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Welcome to Supp Web</h1>
      <p>This is a Next.js 14 TypeScript app.</p>
      <ul>
        <li><Link href="/assessment">栄養アセスメント</Link></li>
        <li><Link href="/supplements">サプリメント相互作用</Link></li>
        <li><Link href="/care-plan">栄養ケアプラン</Link></li>
        <li><Link href="/monitoring">モニタリング</Link></li>
      </ul>
    </main>
  );
}
