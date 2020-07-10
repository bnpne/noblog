import React, { ReactNode } from 'react'
import Head from 'next/head'
import Nav from './nav'

type Props = {
  children?: ReactNode,
  title?: string
}

const Layout = ({ children, title='default'}: Props) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen max-w-3xl mx-auto px-6">
        <Nav />
        {children}
      </div>
    </div>
  )
}

export default Layout