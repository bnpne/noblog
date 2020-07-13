import React from 'react'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <div className="flex justify-between my-8 w-screen max-w-4xl mx-auto px-8 sm:px-12 md:px-24">
      <div className="font-bold text-lg">My Notion Blog</div>
      <div className="flex justify-between">
        <Link href="/">
          <a className="text-gray-500 hover:text-lmode mr-8">Home</a>
        </Link>
        <Link href="/about">
          <a className="text-gray-500 hover:text-lmode">About</a>
        </Link>
      </div>
    </div>
  )
}

export default Nav