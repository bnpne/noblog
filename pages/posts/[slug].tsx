import { NotionRenderer, BlockMapType } from 'react-notion'
import { Post } from '../../types/index'
import Link from 'next/link'
import Layout from '../../components/layout'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => {
  return (
    <div>
      <Layout title={post.title}>
        <div className="mx-3 mt-5">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold md:text-5xl md:font-extrabold ">{post.title}</div>
            <div className="text-xl font-semibold">
              <Link href="/">
                <a className="text-xl hover:bg-gray-200 p-3 rounded-md font-semibold hover:text-blue-500 mr-8 md:mr-12">
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className=" text-xl hover:bg-gray-200 p-3 rounded-md font-semibold hover:text-blue-500">
                  About Me
                </a>
              </Link>
            </div>
          </div>
          <NotionRenderer blockMap={blocks} />
        </div>
      </Layout>
    </div>
  )
}

export default BlogPost

export async function getStaticProps({ params: { slug } }: any) {
  const posts = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  const post = posts.find((t: any) => t.slug === slug)

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post!.id}`
  ).then((res) => res.json())

  return {
    props: {
      blocks,
      post,
    },
  }
}

export async function getStaticPaths() {
  const table = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  return {
    paths: table.map((row: any) => `/posts/${row.slug}`),
    fallback: true,
  }
}