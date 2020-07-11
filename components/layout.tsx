import React, { ReactNode } from 'react'
import Head from 'next/head'


type Props = {
  children?: ReactNode,
  title?: string
}

const Layout = ({ children, title='default'}: Props) => {
  return (
    <div className="flex flex-col min-h-screen text-lmode">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen max-w-3xl mx-auto px-6 ">
        {children}
        {/* <div className=" mx-3 mt-12 h-10 text-center text-sm font-semibold text-gray-500">
          Made with ❤ by{' '}
          <span>
            <a href="https://twitter.com/bnpneio">Ben Paine</a>
          </span>
        </div> */}
      </div>
    </div>
  )
}

export default Layout