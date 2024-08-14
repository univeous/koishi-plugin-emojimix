const { writeFile } = require('fs/promises')

async function scrapData() {
  const resp1 = await fetch('https://emojikitchen.dev/')
    .then(response => response.text())
  const jsPathRegEx = /\/assets\/index-[A-Za-z0-9_]*\.js/g
  const jsPathMatch = resp1.match(jsPathRegEx)
  const jsPath = jsPathMatch[0]
  const resp2 = await fetch(`https://emojikitchen.dev/${jsPath}`)
    .then(response => response.text())
  const urlsRegEx = /https:\/\/www\.gstatic\.com\/android\/keyboard\/emojikitchen[^"]*/g
  const urlsMatch = resp2.match(urlsRegEx)
  const urls = [...new Set(urlsMatch)]
  const data = urls.map(url => {
    const match = url.match(/(\d{8})\/u[^"]+\/(u[^"]+)_(u[^"]+(?:-u[^"]+)?)\.png/)
    return match.slice(1)
  }).reduce((acc, [date, emoji, emoji2]) => {
    if (!acc[emoji]) acc[emoji] = {}
    acc[emoji][emoji2] = date
    return acc
  }, {})
  return data
}

scrapData().then(data => writeFile('data.json', JSON.stringify(data), 'utf-8'))
