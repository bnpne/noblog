import { NotionRenderer, BlockMapType } from 'react-notion'
import { Post } from '../../types/index'
import Layout from '../../components/layout'
import 'prismjs/components/prism-bash'

//https://www.notion.so/Hello-World-d1868a84dd4844a4a45dafa08cde09b7


const fetcher = async (url: any) => fetch(url).then((res) => res.json())

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => {
  return (
    <div>
      <Layout title={post.title}>
        <div className="mt-12">
          <div>
            <div className="text-5xl font-bold leading-normal">
              {post.title}
            </div>
            <div className="flex space-between w-full text-2xl font-semibold">
              <div>By: {post.author[0].fullName}</div>
            </div>
            <div className="text-lg text-gray-500">{post.date}</div>
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