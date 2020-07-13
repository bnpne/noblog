import React, { ReactNode } from 'react'
import Head from 'next/head'
import Nav from './nav'

type Props = {
  children?: ReactNode,
  title?: string
}

const Layout = ({ children, title='default'}: Props) => {
  return (
    <div className="flex flex-col min-h-screen text-lmode dark:bg-black">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Nav />
        {children}
        <div className=" mt-32 h-10 text-center text-sm text-gray-500">
          Made with Notion ❤ 
        </div>
      </div>
    </div>
  )
}

export default Layout