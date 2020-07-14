import React from 'react'
import Layout from '../components/layout'
import { NotionRenderer, BlockMapType } from 'react-notion'
import { Post } from '../types/index'
import PostContainer from '../components/postContainer'
import { GetStaticProps } from 'next'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

export const getStaticProps: GetStaticProps = async () => {
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

export default About