import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'

export type Post = {
  id: string
  slug: string
  title: string
  date: string
}

export const fetcher = async (url: any) => fetch(url).then((res) => res.json())

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

const Index: React.FC = (props: any) => {
  const { data, error } = useSWR(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`, 
    fetcher,
    { initialData: props.posts }
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading ...</div>

  // console.log(data)

  return (
    <div>
      <ul>
        {data.map((post: any) => {
          return (
            <li key={post.id}>
              <Link href="/[slug]" as={`${post.slug}`}>
                <a>{post.title} | {post.date}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Index
