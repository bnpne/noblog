# No-Blog
### Create a blog with Notion as a CMS  

Check out the [Demo](https://noblog-demo.vercel.app/)  

#### Made by [Ben Paine](https://twitter.com/bnpneio)
  
## Get Started

## Run Locally

1. Fork the Repository, clone it, and run `npm install`
2. Fill in the `.env` file
3. Run `npm run dev`
4. Copy the page ID for the **Post** page and paste it into `NOTION_BLOG_ID` in the `.env` file  
   - Example: if the url is `https://www.notion.so/b4fdfbc46b534ce58883dd887cae3978?v=50fd8c5289ca4ff0abf6f96209a5bb79` the id would be `b4fdfbc46b534ce58883dd887cae3978`

## Deploy to Vercel

1. Duplicate [this Notion template](https://www.notion.so/b4fdfbc46b534ce58883dd887cae3978?v=50fd8c5289ca4ff0abf6f96209a5bb79) and make it public
2. Copy the page ID for the **Post** page and create a new Environment Variable when prompted called `NOTION_BLOG_ID` and paste the id 
   - Example: if the url is `https://www.notion.so/b4fdfbc46b534ce58883dd887cae3978?v=50fd8c5289ca4ff0abf6f96209a5bb79` the id would be `b4fdfbc46b534ce58883dd887cae3978`
   
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/bnpne/noblog/tree/master&env=NOTION_BLOG_ID&envDescription=Required+env+values+for+deploying&envLink=https://github.com/bnpne/noblog#deploy-to-vercel)

## Create Blog Post

1. Simply go to the Post page, and click **New**
2. Fill in the Page name, Slug, Date, and Author
3. When you're ready, check published
4. Done, the slug and post will appear on the page

## ⚠️ CAVEAT

The slug has to be either one word or seperated by a hyphen. For example, a slug for *Hello World* needs to be either *"helloworld"* or *"hello-world"*.

## About Page

This page is your About page and will not appear in your blog, but rather will appear under the `About` Link. **DO NOT DELETE THIS POST**, you may break the site. If you do not want an about page, go into `/components/nav.tsx` and remove the respective link and you should be safe to delete the `About` post
   
## License
[MIT](./LICENSE)
