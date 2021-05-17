import Link from 'next/link';

export default function page2() {
  return (
    <div>
        Page 2
        <br />
        <Link
        href="/">
          Home
        </Link>
        This pages does show the CSP header.
    </div>
  )
}
