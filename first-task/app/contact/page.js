'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <h1>Nümunə</h1>
      <nav>
        <Link href="/"><button>Ana Səhifə</button></Link>
        <Link href="/about"><button>Haqqımızda</button></Link>
      </nav>
    </header>
  );
}
