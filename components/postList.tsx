import React from 'react'
import { Post } from '../types/index'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

const PostList: React.FC = (props: any) => {
  const {
    data,
    error,
  } = useSWR(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`,
    fetcher,
    { initialData: props.posts }
  )

  if (error) return <div className="text-lg font-bold">Failed to Load</div>
  if (!data) return <div className="text-lg font-bold">Loading ...</div>

  return (
    <div>
      {data.map((post: Post) => {
        if (post.published) {
          return (
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
              <div
                className="hover:bg-gray-200 cursor-pointer p-3 py-4 px-5  m-2 rounded-md"
                key={post.id}
              >
                <div className='leading-snug'>
                  <div className="text-2xl font-bold">{post.title}</div>
                  <div className="text-base font-semibold">By: {post.author[0].fullName}</div>
                </div>
                <div className="mt-2 text-base text-gray-400">{post.date}</div>
              </div>
            </Link>
          )
        } 
      })}
      
    </div>
  )
}

export default PostList


export async function getStaticProps() {
  const posts = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  return {
    props: {
      posts,
    },
  }
}