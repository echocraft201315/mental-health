import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem', background: 'var(--background1, #fff9f4)' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Welcome! Choose your portal:</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/client">
          <button style={{ padding: '1rem 2rem', fontSize: '1.25rem', borderRadius: '0.5rem', background: 'var(--primary1, #0ca5f2)', color: 'var(--primary-foreground1, #fff)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Client</button>
        </Link>
        <Link href="/coach/dashboard">
          <button style={{ padding: '1rem 2rem', fontSize: '1.25rem', borderRadius: '0.5rem', background: 'var(--luxury-gold, #ffc052)', color: '#222', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Coach</button>
        </Link>
      </div>
    </div>
  );
}
