import { NotionRenderer, BlockMapType } from 'react-notion'
import Layout from '../../components/layout'
import 'prismjs/components/prism-bash'
import Link from 'next/link'
import PostContainer from '../../components/postContainer'
import { Post } from '../../types'
import { GetStaticPaths, GetStaticProps } from 'next'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

export const getStaticProps: GetStaticProps = async ({ params: { slug } }: any) => {
  const posts = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  const post = posts.find((t: any) => t.slug === slug)

  const blocks = await fetcher(
    `https://notion-api.splitbee.io/v1/page/${post!.id}`
  )

  return {
    props: {
      blocks,
      post,
    },
  }
}

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => {
  return (
    <div>
      <Layout title={post.title}>
        <PostContainer>
          <div className="mt-8">
            <Link href="/">
              <a className="text-gray-500 hover:text-lmode">⟵ Back</a>
            </Link>
          </div>
          <div className="mt-8">
            <div className="text-5xl font-bold leading-normal">
              {post.title}
            </div>
            <div className="flex space-between w-full text-2xl font-semibold">
              <div>By: {post.author[0].fullName}</div>
            </div>
            <div className="text-lg text-gray-500">{post.date}</div>
          </div>
          <div className="mt-4">
            <hr />
          </div>
          <div className="italic mt-10 mb-6">{post.preview}</div>

          <NotionRenderer blockMap={blocks} />
        </PostContainer>
      </Layout>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  return {
    paths: table.map((row: any) => `/posts/${row.slug}`),
    fallback: false,
  }
}

export default BlogPost

