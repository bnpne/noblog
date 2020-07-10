import React from 'react'
import Layout from '../components/layout'
import PostList from '../components/postList'
import Nav from '../components/nav'

const Index: React.FC = () => {
  return (
    <div>
      <Layout title="Home">
        <Nav />
        <PostList />
      </Layout>
    </div>
  )
}

export default Index
