import React from 'react'
import Link from 'next/link'

const AboutNav: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-2xl md:text-4xl font-bold ">About</div>
      <div>
        <Link href="/">
          <a className="text-xl hover:bg-gray-200 p-3 rounded-md font-bold hover:text-blue-500">
            Home
          </a>
        </Link>
      </div>
    </div>
  )
}

export default AboutNav