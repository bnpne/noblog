require('dotenv').config()

module.exports = {
  env: {
    NOTION_BLOG_ID: process.env.NOTION_BLOG_ID,
    NOTION_ABOUT_ID: process.env.NOTION_ABOUT_ID
  }
}