import React from 'react'
import Layout from '../components/layout'
import { NotionRenderer, BlockMapType } from 'react-notion'
import { Post } from '../types/index'
import PostContainer from '../components/postContainer'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

export async function getStaticProps() {
  const posts = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  const post = posts.find((t: any) => t.title === 'About')

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

const About: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks
}) => {
  return (
    <Layout title="About">
      <PostContainer>
        <NotionRenderer blockMap={blocks} />
      </PostContainer>
    </Layout>
  ) 
}

export async function getStaticPaths() {
  const table = await fetcher(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_BLOG_ID}`
  )

  return {
    paths: table.map((row: any) => `/about`),
    fallback: true,
  }
}

export default About