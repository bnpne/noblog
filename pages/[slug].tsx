import { NotionRenderer, BlockMapType } from 'react-notion'
import { fetcher, Post } from './'

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => (
  <div className="content">
    <h1>{post.title}</h1>
    <NotionRenderer blockMap={blocks} />
  </div>
)

export async function getStaticProps({ params: { slug } }: any) {
  // Get all posts again
  const posts = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  // Find the current blogpost by slug
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
    paths: table.map((row: any) => `/${row.slug}`),
    fallback: true,
  }
}

export default BlogPost
