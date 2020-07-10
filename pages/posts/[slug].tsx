import { NotionRenderer, BlockMapType } from 'react-notion'
import { Post } from '../../types/index'
import Layout from '../../components/layout'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => (
  <Layout title={post.title}>
    <div className="m-auto max-w-2xl">
      <h1 className='text-5xl font-extrabold'>{post.title}</h1>
      <NotionRenderer blockMap={blocks} />
    </div>
  </Layout>
)

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