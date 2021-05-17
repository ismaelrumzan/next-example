import Link from 'next/link';

export default function Home() {
  return (
    <div>
        Page 1
        <br />
        <Link
        href="/page2">
          Page 2
        </Link>
        This pages doesn't show the CSP header.
    </div>
  )
}
