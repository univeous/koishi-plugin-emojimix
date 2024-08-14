import { Context, Time, segment, Schema, Quester } from 'koishi'

export const name = 'emojimix'
export interface Config {
  emojiEndpoint?: string;
  mixDataEndpoint?: string;
  quester: Quester.Config;
}

export const Config: Schema<Config> = Schema.object({
  emojiEndpoint: Schema.string().default('https://www.gstatic.com/android/keyboard/emojikitchen/'),
  mixDataEndpoint: Schema.string().default('https://github.com/univeous/koishi-plugin-emojimix/raw/master/data.json').description('emoji 混合数据的 endpoint 。'),
  quester: Quester.Config,
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

export async function apply(context: Context, config: Config) {
  const ctx = context.isolate('http')
  ctx.http = context.http.extend(config.quester)
  const emojis = JSON.parse(await ctx.http.get(config.mixDataEndpoint))[0]

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
