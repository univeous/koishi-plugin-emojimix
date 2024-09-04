import { Context, Time, segment, Schema, Quester } from 'koishi'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export const name = 'emojimix'
export interface Config {
  emojiEndpoint?: string;
  mixDataEndpoint?: string;
}

export const Config: Schema<Config> = Schema.object({
  emojiEndpoint: Schema.string().default('https://www.gstatic.com/android/keyboard/emojikitchen/'),
  mixDataEndpoint: Schema.string().default('https://github.com/univeous/koishi-plugin-emojimix/raw/master/data.json').description('emoji 混合数据的 endpoint 。'),
})

function getCodePoint(emoji: string) {
  return Array.from(emoji)
    .map(char => char.codePointAt(0).toString(16))
    .map(hex => 'u' + hex)
    .join('-')
}

const codePointsToEmoji = (codepoint: string) => {
  const components = codepoint.replace(/u/g, '').split('-')
  return components.map(code => String.fromCodePoint(parseInt(code, 16))).join('')
}

interface Data {
  [emoji1: string]: { [emoji2: string]: string }
}

export async function apply(ctx: Context, config: Config) {
  const logger = ctx.logger('emojimix')
  const path = join(__dirname, '..', 'data.json')
  let emojis: Data = await readFile(path, 'utf-8').then(data => JSON.parse(data))
  ctx.http.get(config.mixDataEndpoint).then(data => {
    writeFile(path, data, 'utf-8')
    emojis = JSON.parse(data)
  }).catch((e) => {
    logger.warn(e)
  })

  ctx.command("emojimix [emoji1] [emoji2]", "输出两个emoji的混合图片").action(async (_, e1, e2) => {
    if (e1 && !/\p{Emoji}/u.test(e1)) return `${e1}不是emoji`
    if (e2 && !/\p{Emoji}/u.test(e2)) return `${e2}不是emoji`

    let emoji1: Data[string]
    let codePoint1: string
    let codePoint2: string
    let date: string
    let url: string
    let first_try = true

    while (true) {
      try {
        if (e1)
          codePoint1 = getCodePoint(e1)
        else
          codePoint1 = Object.keys(emojis)[Math.floor(Math.random() * Object.keys(emojis).length)]
        emoji1 = emojis[codePoint1]
        if (e2)
          codePoint2 = getCodePoint(e2)
        else
          codePoint2 = Object.keys(emoji1)[Math.floor(Math.random() * Object.keys(emoji1).length)]
        date = emoji1[codePoint2]

        url = `${config.emojiEndpoint}${date}/${codePoint1}/${codePoint1}_${codePoint2}.png`
        await ctx.http.get(url)
        break
      } catch (error) {
        if (e1 && e2) {
          if (first_try) {
            [e1, e2] = [e2, e1]
            first_try = false
            continue
          }
          return '不存在对应的emojimix。'
        } else break
      }
    }

    return `${codePointsToEmoji(codePoint1)}+${codePointsToEmoji(codePoint2)}=${segment("image", { url: url })}`
  })
}
