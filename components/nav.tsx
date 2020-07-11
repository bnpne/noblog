import React from 'react'
import Link from 'next/link'

const Nav: React.FC = () => {
  return (
    <div className="mx-3 mt-5 mb-8 flex justify-between items-center">
      <div className="text-2xl md:text-4xl font-bold ">{process.env.MY_NAME}'s Blog</div>
      <div>
        <div>
          <Link href="/about">
            <a className="text-xl hover:bg-gray-200 p-3 rounded-md font-bold hover:text-blue-500">
              About Me
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav