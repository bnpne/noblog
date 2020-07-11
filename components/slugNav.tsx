import React from 'react'
import Link from 'next/link'

type Props = {
  title: string
}

const SlugNav: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-2xl font-bold md:text-4xl md:font-bold ">
        {title}
      </div>
      <div className="text-xl font-bold">
        <Link href="/">
          <a className="text-xl hover:bg-gray-200 p-3 rounded-md font-bold hover:text-blue-500 mr-8 md:mr-12">
            Home
          </a>
        </Link>
        <Link href="/about">
          <a className=" text-xl hover:bg-gray-200 p-3 rounded-md font-bold hover:text-blue-500">
            About Me
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SlugNav