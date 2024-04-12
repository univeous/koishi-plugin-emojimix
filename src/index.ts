import { Context, Time, segment, Schema } from 'koishi'

export const name = 'emojimix'

const codePointsToEmoji = (codepoint: string) => {
  var data = codepoint.replace(/u/g, '').split('-')
  console.log(data)
  if (data.length == 1) {
    return String.fromCodePoint(parseInt(data[0], 16))
  } else if (data.length == 2) {
    return String.fromCodePoint(parseInt(data[0], 16), parseInt(data[1], 16))
  } else if (data.length == 3) {
    return String.fromCodePoint(parseInt(data[0], 16), parseInt(data[1], 16), parseInt(data[2], 16))
  }
}

export interface Config {
  emojiEndpoint?: string;
  mixDataEndpoint?: string;
}

export const Config: Schema<Config> = Schema.object({
  emojiEndpoint: Schema.string().default('https://www.gstatic.com/android/keyboard/emojikitchen/'),
  mixDataEndpoint: Schema.string().default('https://github.com/univeous/koishi-plugin-emojimix/raw/master/data.json').description('emoji 混合数据的 endpoint 。')
})

function getCodePoint(emoji: string) {
  var result = `u${emoji.codePointAt(0).toString(16)}`
  var idx = 2
  if(emoji.codePointAt(2)) {
    result += `-u${emoji.codePointAt(2).toString(16)}`
  }
  if(emoji.codePointAt(4)) {
    result += `-u${emoji.codePointAt(3).toString(16)}`
  }
  return result
}

export async function apply(ctx: Context, config: Config) {
  const emojis = JSON.parse(await ctx.http.get(config.mixDataEndpoint))[0]

  ctx.command("emojimix [emoji1] [emoji2]", "输出两个emoji的混合图片").action(async (_, e1, e2) => {
    if (e1 && !/\p{Emoji}/u.test(e1)) return `${e1}不是emoji`
    if (e2 && !/\p{Emoji}/u.test(e2)) return `${e2}不是emoji`

    let emoji1
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
        if(!emoji1){
          codePoint1 = codePoint1 + '-ufe0f'
          emoji1 = emojis[codePoint1]
        }
        emoji1 = emoji1.reduce((acc, cur) => {
          let key = Object.keys(cur)[0]
          acc[key] = cur[key]
          return acc
        })
        if (e2)
          codePoint2 = getCodePoint(e2)
        else
          codePoint2 = Object.keys(emoji1)[Math.floor(Math.random() * Object.keys(emoji1).length)]
        date = emoji1[codePoint2]
        if(!date){
          codePoint2 = codePoint2 + '-ufe0f'
          date = emoji1[codePoint2]
        }

        url = `${config.emojiEndpoint}${date}/${codePoint1}/${codePoint1}_${codePoint2}.png`
        console.log(url)
        await ctx.http.get(url)
        break
      } catch (error) {
        console.log(error)
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
