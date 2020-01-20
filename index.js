const fs = require('fs')
const util = require('util')
const aReadFile = util.promisify(fs.readFile)
const fm = require('front-matter')
const remark = require('remark')
const html = require('remark-html')

const settings = {
  commonmark: true,
}

async function main() {
  frontmatter = await aReadFile('./example.md', 'utf8').then(async data => {
    return fm(data)
  })

  frontmatter.body = await remark()
    .data('settings', settings)
    .use(html)
    .process(frontmatter.body)
    .then(vfile => {
      return String(vfile)
    })

  console.log(frontmatter)
}

main()
