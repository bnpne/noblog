import React from 'react'
import Layout from '../components/layout'
import PostList from '../components/postList'

const Index: React.FC = () => {
  return (
    <div>
      <Layout title="Home">
        <PostList />
      </Layout>
    </div>
  )
}

export default Index
