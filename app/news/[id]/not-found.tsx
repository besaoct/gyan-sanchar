
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Article Not Found</h2>
      <p>Could not find the requested article.</p>
      <Link href="/news">Return to News</Link>
    </div>
  )
}
