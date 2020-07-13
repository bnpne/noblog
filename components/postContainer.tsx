import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode,
}

const PostContainer: React.FC = ({ children }: Props) => {
  return (
    <div className="w-screen max-w-4xl mx-auto px-8 sm:px-12 md:px-24 mb-24">
      {children}
    </div>
  )
}

export default PostContainer