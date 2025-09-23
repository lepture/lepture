import { fetch } from "ofetch"
import fs from 'node:fs/promises'

const url = "https://lepture.com/en/feed.json"


const fetchPosts = async () => {
  const resp = await fetch(url)
  const data = await resp.json()
  const posts = data["items"].slice(0, 2)
  const text = posts.map(item => {
    return `- [${item.title}](${item.url})`
  }).join('\n')

  let readme = await fs.readFile('README.md', { encoding: 'utf-8' })
  readme = readme.replace(
    /<!-- posts -->[\s\S]+$/,
    '<!-- posts -->\n\n' + text,
  )
  console.log(readme)
  await fs.writeFile('README.md', readme)
}

fetchPosts()
