import React from 'react'
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

  // console.log(data[0].author[0].profilePhoto)

  return (
    <div className="w-screen max-w-4xl mx-auto px-8 lg:px-6 sm:px-12 md:px-24 mb-24 lg:max-w-screen-xl lg:grid lg:grid-col lg:grid-cols-3 ">
      {data.map((post: any) => {
        if (post.published && post.title !== 'About') {
          return (
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
              <div
                className="cursor-pointer my-4 mx-auto lg:mx-4 hover:bg-gray-200  max-w-md lg:max-w-sm border border-gray-400 rounded-md p-6"
                key={post.id}
              >
                <div className="text-2xl font-bold">{post.title}</div>
                <div className="flex justify-start items-center mt-4">
                  <img
                    className="rounded-full w-12 mr-6"
                    src={post.author[0].profilePhoto}
                  />
                  <div className="block">
                    <div className="text-lg font-bold mr-12 text-base">
                      {post.author[0].fullName}
                    </div>
                    <div className="text-base text-gray-400">{post.date}</div>
                  </div>
                </div>
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
