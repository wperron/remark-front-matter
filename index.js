const fs = require('fs')
const util = require('util')
const aReadFile = util.promisify(fs.readFile)
const areaddir = util.promisify(fs.readdir)
const fm = require('front-matter')
const remark = require('remark')
const html = require('remark-html')

const settings = {
  commonmark: true,
}

async function main() {
  const files = await areaddir('./content', {}).then(files => {
    return files.filter(f => f.match(/\.md$/g))
  })

  files.forEach(async file => {
    const content = await aReadFile(`./content/${file}`, 'utf8').then(async data => {
      return data
    })

    const frontmatter = fm(content)

    frontmatter.body = await remark()
      .data('settings', settings)
      .use(html)
      .process(frontmatter.body)
      .then(vfile => {
        return String(vfile)
      })
  
    console.log(frontmatter)
  })
}

main()
