import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { GetStaticProps } from 'next'
import ShowMoreText from 'react-show-more-text'


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

  if(props == null) {
    return <div>null</div>
  }

  if (error) return <div className="text-lg font-bold">Failed to Load</div>
  if (!data) return <div className="text-lg font-bold">Loading ...</div>

  // console.log(data[0].author[0].profilePhoto)
  return (
    <div className="w-screen max-w-4xl mx-auto px-8 mt-16 sm:px-12 md:px-12 mb-24 md:max-w-screen-lg md:grid md:grid-cols-2">
      {data.map((post: any) => {
        if (post.published && post.title !== 'About') {
          return (
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
              <div
                className="cursor-pointer my-4 hover:bg-gray-200 rounded-lg max-w-lg mx-auto md:mx-5 px-6 py-5"
                key={post.id}
              >
                <div className="text-2xl font-bold">{post.title}</div>
                <div className="mb-8 mt-1 text-sm italic">
                  <ShowMoreText
                    lines={2}
                    more=''
                  >
                    {post.preview}
                  </ShowMoreText>
                </div>
                <div className="flex justify-start mt-4">
                  <img
                    className="rounded-full w-12 h-12 mr-6"
                    src={post.author[0].profilePhoto}
                  />
                  <div className="block">
                    <div className="font-bold mr-12 text-base">
                      {post.author[0].fullName}
                    </div>
                    <div className="text-base text-gray-400">
                      {post.date}
                    </div>
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  return {
    props: {
      posts,
    },
  }
}
