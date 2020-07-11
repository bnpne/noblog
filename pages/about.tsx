import React from 'react'
import { NotionRenderer } from 'react-notion'
import useSWR from 'swr'
import Layout from '../components/layout'
import AboutNav from '../components/aboutNav'

const fetcher = async (url: any) => fetch(url).then((res) => res.json())

const About = (props: any) => {
  const {
    data,
    error,
  } = useSWR(
    `https://notion-api.splitbee.io/v1/page/${process.env.NOTION_ABOUT_ID}`,
    fetcher,
    { initialData: props.blocks }
  )

  if (error) return <div className="text-lg font-bold">Failed to Load</div>
  if (!data) return <div className="text-lg font-bold">Loading ...</div>

  // console.log(data)

  return (
    <div>
      <Layout title='About'>
        <div className="mx-3 mt-5">
          <AboutNav />
          <NotionRenderer blockMap={data} />
        </div>

      </Layout>
    </div>
  )
}

export default About

export async function getStaticProps() {
  const blocks = await fetcher(
    `https://notion-api.splitbee.io/v1/page/${process.env.NOTION_ABOUT_ID}`
  )
  

  return {
    props: {
      blocks,
    },
  }
}