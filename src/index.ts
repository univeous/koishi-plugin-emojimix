import { Context, Time, segment } from 'koishi'

export const name = 'emojimix'

const emojis = [
  [[128516], "20201001", ["smile", "happy"]],
  [[128512], "20201001", ["smile", "happy"]],
  [[128578], "20201001", ["smile", "happy"]],
  [[128579], "20201001", ["smile", "happy", "upsidedown"]],
  [[128515], "20201001", ["smile", "happy"]],
  [[128513], "20201001", ["smile", "happy", "cheese", "teeth", "grin"]],
  [[128522], "20201001", ["smile", "happy", "innocent", "blush"]],
  [[9786, 65039], "20201001", ["smile", "happy", "innocent", "blush"]],
  [[128519], "20201001", ["smile", "happy", "innocent", "angel", "holy", "halo"]],
  [[128518], "20201001", ["smile", "happy", "laugh", "xd"]],
  [[128514], "20201001", ["smile", "happy", "laugh", "cry", "lol", "lmao", "rofl"]],
  [[129315], "20201001", ["smile", "happy", "laugh", "cry", "side", "lol", "lmao", "rofl"]],
  [[128517], "20201001", ["smile", "happy", "sweat", "nervous", "awkward", "uncomfortable"]],
  [[128521], "20201001", ["smile", "happy", "wink"]],
  [[128535], "20201001", ["kiss"]],
  [[128537], "20201001", ["kiss"]],
  [[128538], "20201001", ["kiss", "blush"]],
  [[128536], "20201001", ["kiss", "heart", "love", "wink"]],
  [[128525], "20201001", ["smile", "happy", "heart", "love", "eyes"]],
  [[129392], "20201001", ["smile", "happy", "heart", "love"]],
  [[129321], "20201001", ["smile", "happy", "star", "eyes"]],
  [[128539], "20201001", ["smile", "happy", "tongue"]],
  [[128541], "20201001", ["smile", "happy", "tongue", "laugh", "xd"]],
  [[128523], "20201001", ["smile", "happy", "tongue", "yum"]],
  [[128540], "20201001", ["smile", "happy", "tongue", "wink"]],
  [[129322], "20201001", ["smile", "happy", "tongue", "eyes", "joking", "funny"]],
  [[129297], "20201001", ["smile", "happy", "money", "dollar", "currency", "tongue", "eyes"]],
  [[129394], "20201001", ["smile", "cry", "dying", "inside", "sad"]],
  [[129303], "20201001", ["smile", "happy", "blush", "hug", "hand"]],
  [[129323], "20201001", ["smile", "whisper", "shush", "quiet", "secret", "silent"]],
  [[129325], "20201001", ["blush", "embarrass", "hand", "cover", "quiet"]],
  [[129762], "20211115", ["hand", "cover", "quiet", "secret"]],
  [[129763], "20211115", ["hand", "cover", "eye", "peeking", "secret"]],
  [[129296], "20201001", ["quiet", "zip", "silent"]],
  [[128566], "20201001", ["speechless", "silent", "quiet", "no", "mouth"]],
  [[129300], "20201001", ["think", "ponder", "question", "thought", "confuse", "hand"]],
  [[129320], "20201001", ["confuse", "question", "suspicious", "distrust", "eyebrow"]],
  [[128528], "20201001", ["neutral", "blank", "straight", "bored"]],
  [[128529], "20201001", ["neutral", "blank", "straight", "bored", "eyes", "shut", "tired", "annoyed"]],
  [[128566, 8205, 127787, 65039], "20210218", ["clouds", "peekaboo", "spy", "hidden"]],
  [[128527], "20201001", ["suspicious", "sus", "funtimes", "mischievous", "suggestive", "smirk", "smug"]],
  [[128524], "20201001", ["happy", "satisf", "relaxed", "chill", "relieved", "calm", "peace", "thank"]],
  [[128556], "20201001", ["uncomfortable", "awkward", "eek", "icky"]],
  [[128580], "20201001", ["rolling", "eyes", "omg", "done", "with", "life"]],
  [[128530], "20201001", ["annoyed", "grump", "side", "eye", "skeptic", "tired", "negative"]],
  [[9785, 65039], "20201001", ["sad", "upset"]],
  [[128558, 8205, 128168], "20210218", ["sad", "tired", "depress", "sigh", "exhale", "air", "cloud"]],
  [[128542], "20201001", ["sad", "depress", "upset", "disappoint"]],
  [[128532], "20201001", ["sad", "depress", "upset", "remorse"]],
  [[129317], "20201001", ["lie", "liar", "nose", "pinocchio", "disbelief"]],
  [[129393], "20201001", ["yawn", "tired", "bored", "sleepy", "uninterested"]],
  [[128554], "20201001", ["sleepy", "tired", "bored", "uninterested"]],
  [[128564], "20201001", ["sleepy", "tired", "bored", "uninterested", "z"]],
  [[129316], "20201001", ["happy", "smile", "drooling", "hunger", "hungry", "drool"]],
  [[128567], "20201001", ["sick", "mask", "covid", "corona", "virus", "hospital", "face", "cover"]],
  [[129298], "20201001", ["sick", "fever", "thermometer", "heat", "warm", "hot", "sad"]],
  [[129301], "20201001", ["sick", "hurt", "bandage", "injury", "sad"]],
  [[129314], "20201001", ["sick", "green", "shrek", "vomit", "puke", "nausea"]],
  [[129326], "20201001", ["sick", "green", "vomit", "puke", "icky"]],
  [[129319], "20201001", ["sick", "nose", "tissue", "sad", "xd"]],
  [[129397], "20201001", ["warm", "hot", "heat", "horny", "sweat", "tongue", "red"]],
  [[129398], "20201001", ["cold", "freeze", "frozen", "chill", "snow", "snowflake", "ice", "teeth", "blue"]],
  [[128565], "20201001", ["dead", "cross", "x", "eyes", "shook", "shock"]],
  [[129396], "20201001", ["happy", "smile", "drunk", "intoxicted", "woozy", "blush", "horny"]],
  [[129760], "20211115", ["melt", "happy", "smile", "heat", "warm", "hot", "dying", "acceptance"]],
  [[129327], "20201001", ["shook", "shock", "mindblow", "explosion", "eyes", "permanent", "brain", "damage"]],
  [[129312], "20201001", ["happy", "cowboy", "hat"]],
  [[129395], "20201001", ["party", "hat", "happy", "celebrate"]],
  [[129400], "20201001", ["disguised", "detective", "glasses", "nose", "moustache", "mustache"]],
  [[129488], "20201001", ["monocle", "frown", "curious", "detective"]],
  [[128526], "20201001", ["cool", "glasses", "sun", "hot"]],
  [[128533], "20201001", ["sad", "unsure", "hesitate", "frown", "disappoint"]],
  [[129764], "20211115", ["sad", "unsure", "hesitate", "frown", "disappoint"]],
  [[128543], "20201001", ["sad", "worry", "frown", "concern", "disappoint"]],
  [[128577], "20201001", ["sad", "upset"]],
  [[128558], "20201001", ["shook", "shock"]],
  [[128559], "20201001", ["shook", "shock", "astonish", "surprise"]],
  [[128562], "20201001", ["shook", "shock", "astonish", "surprise"]],
  [[128551], "20201001", ["shook", "shock", "astonish", "surprise", "worry"]],
  [[128550], "20201001", ["shook", "shock", "astonish", "surprise", "worry"]],
  [[128552], "20201001", ["fear", "cold", "worry", "shook", "shock", "concern"]],
  [[128560], "20201001", ["fear", "cold", "worry", "shook", "shock", "concern", "sweat"]],
  [[128561], "20201001", ["fear", "cold", "worry", "petrify", "shook", "shocked", "surprise", "haunt", "scared"]],
  [[128563], "20201001", ["blush", "flush", "embarrass", "surprise"]],
  [[129761], "20211115", ["army", "salute", "hand"]],
  [[129765], "20211115", ["transparent", "faded", "fading", "dotted", "dashed", "see", "through"]],
  [[129401], "20211115", ["happy", "tear", "cry", "puppy", "eyes"]],
  [[129402], "20201001", ["sad", "beg", "plead", "puppy", "eyes"]],
  [[129299], "20201001", ["nerd", "glasses", "smile", "smart", "intelligent", "harry", "potter"]],
  [[128546], "20201001", ["sad", "tear", "cry"]],
  [[128557], "20201001", ["sad", "tear", "cry", "flood", "loud"]],
  [[128549], "20201001", ["sad", "sweat"]],
  [[128531], "20201001", ["sad", "sweat"]],
  [[128555], "20201001", ["loud", "scream", "shout", "moan"]],
  [[128553], "20201001", ["loud", "scream", "shout", "moan"]],
  [[128547], "20201001", ["sad", "uncomfortable", "icky"]],
  [[128534], "20201001", ["anger", "angry", "grr", "x", "eyes"]],
  [[128544], "20201001", ["anger", "angry", "grr"]],
  [[128545], "20201001", ["anger", "angry", "grr", "red"]],
  [[129324], "20201001", ["swear", "anger", "censor", "vulgar", "curse", "red"]],
  [[128548], "20201001", ["anger", "exhale", "cloud", "smoke", "bull"]],
  [[128520], "20201001", ["happy", "devil", "horn", "purple", "mischievous"]],
  [[128127], "20201001", ["angry", "devil", "horn", "purple", "annoyed"]],
  [[128169], "20201001", ["shit", "poop", "excrements", "brown", "smile"]],
  [[128128], "20201001", ["spook", "dead", "skull", "skeleton", "forgor", "funny"]],
  [[128125], "20201001", ["spook", "alien", "supernatural"]],
  [[128123], "20201001", ["spook", "ghost", "laugh", "boo", "tongue"]],
  [[129302], "20201001", ["spook", "robot", "machine", "teeth", "android"]],
  [[129313], "20201001", ["spook", "clown", "funny", "laugh", "blush", "fool"]],
  [[127875], "20201001", ["spook", "pumpkin", "jack", "lantern", "carve", "halloween"]],
  [[127801], "20201001", ["plant", "flower", "rose", "red"]],
  [[127804], "20201001", ["plant", "flower", "yellow"]],
  [[127799], "20201001", ["plant", "flower", "tulip", "pink"]],
  [[127800], "20210218", ["plant", "flower", "cherry", "blossom", "pink"]],
  [[128144], "20201001", ["plant", "flower", "bouquet"]],
  [[127797], "20201001", ["plant", "cactus", "spiky", "boi", "desert"]],
  [[127794], "20201001", ["plant", "tree", "christmas", "xmas", "spruce", "forest"]],
  [[129717], "20211115", ["plant", "tree", "wood", "log", "chop", "stump", "forest"]],
  [[127812], "20220406", ["mushroom", "shroom", "fungus", "amanita", "forest"]],
  [[129704], "20220406", ["rock", "stone", "boulder", "pebble"]],
  [[127821], "20201001", ["food", "fruit", "plant", "pineapple"]],
  [[129361], "20201001", ["food", "fruit", "plant", "vegetable", "avocado"]],
  [[127798, 65039], "20201001", ["food", "fruit", "plant", "vegetable", "pepper", "chilli", "red", "hot", "spicy", "jalapeno"]],
  [[127820], "20211115", ["food", "fruit", "plant", "banana"]],
  [[127827], "20210831", ["food", "fruit", "plant", "strawberry"]],
  [[127819], "20210521", ["food", "fruit", "plant", "citrus", "lemon", "sour"]],
  [[127818], "20211115", ["food", "fruit", "plant", "citrus", "orange"]],
  [[127817], "20220406", ["food", "fruit", "watermelon", "melon"]],
  [[127826], "20220406", ["food", "fruit", "cherry"]],
  [[127874], "20201001", ["food", "sweet", "cake", "candle"]],
  [[129473], "20201001", ["food", "sweet", "cup", "cake", "sprinkle"]],
  [[129472], "20201001", ["food", "cheese"]],
  [[127789], "20201001", ["food", "hot", "dog"]],
  [[127838], "20210831", ["food", "bread", "bake", "yum", "chleb", "pyszny"]],
  [[9749], "20201001", ["food", "drink", "coffee", "hot"]],
  [[127869, 65039], "20201001", ["food", "plate", "dish", "fork", "knife", "cutlery", "kitchen"]],
  [[129440], "20201001", ["covid", "corona", "virus", "microbe", "organism", "germ", "bacteria", "sick"]],
  [[9924], "20201001", ["snow", "snowman", "cold", "ice", "hat", "christmas"]],
  [[127882], "20201001", ["confetti", "ball", "popper", "party", "celebrate", "pinata"]],
  [[127880], "20201001", ["balloon", "red", "fly"]],
  [[128142], "20201001", ["diamond", "shiny", "jewel", "gem", "hard", "rock", "crystal", "minecraft"]],
  [[128139], "20201001", ["kiss", "love", "lips", "mark"]],
  [[129766], "20220203", ["lips", "biting", "nervous", "flirting", "love"]],
  [[128148], "20201001", ["heart", "broken", "love", "crack"]],
  [[128140], "20201001", ["heart", "letter", "paper", "mail", "post", "message", "love"]],
  [[128152], "20201001", ["heart", "struck", "arrow", "love", "pink"]],
  [[128159], "20201001", ["heart", "box", "purple", "love"]],
  [[128149], "20201001", ["heart", "double", "love", "pink"]],
  [[128158], "20201001", ["heart", "double", "spin", "love", "pink"]],
  [[128147], "20201001", ["heart", "vibration", "station", "throb", "beat", "love", "pink"]],
  [[128151], "20201001", ["heart", "growing", "love", "pink"]],
  [[10084, 65039, 8205, 129657], "20210218", ["injury", "bandage", "heart", "broken", "fix", "red", "love"]],
  [[10083, 65039], "20201001", ["heart", "dot", "love", "red"]],
  [[9829, 65039], "20201001", ["heart", "love", "red"]],
  [[10084, 65039], "20201001", ["heart", "rainbow", "colour", "color", "love", "red"]],
  [[129505], "20201001", ["heart", "rainbow", "colour", "color", "love", "orange"]],
  [[128155], "20201001", ["heart", "rainbow", "colour", "color", "love", "yellow"]],
  [[128154], "20201001", ["heart", "rainbow", "colour", "color", "love", "green"]],
  [[128153], "20201001", ["heart", "rainbow", "colour", "color", "love", "blue"]],
  [[128156], "20201001", ["heart", "rainbow", "colour", "color", "love", "purple"]],
  [[129294], "20201001", ["heart", "rainbow", "colour", "color", "love", "brown"]],
  [[129293], "20201001", ["heart", "rainbow", "colour", "color", "love", "white"]],
  [[128420], "20201001", ["heart", "rainbow", "colour", "color", "love", "black"]],
  [[128150], "20201001", ["heart", "love", "sparkle"]],
  [[128157], "20201001", ["heart", "love", "ribbon", "bow", "tie"]],
  [[127873], "20211115", ["gift", "present", "ribbon", "bow", "tie", "box"]],
  [[127895, 65039], "20201001", ["yellow", "ribbon"]],
  [[127942], "20211115", ["trophy", "cup", "gold", "celebrate", "gold", "win", "award"]],
  [[9917], "20220406", ["sport", "football", "ball", "soccer"]],
  [[128240], "20201001", ["news", "paper"]],
  [[127911], "20210521", ["head", "ear", "phone"]],
  [[128175], "20201001", ["100", "percent", "%", "one", "hundred"]],
  [[128064], "20201001", ["eyes", "look", "side"]],
  [[128065, 65039], "20201001", ["eye", "look"]],
  [[127751], "20210831", ["city", "sun", "set", "building"]],
  [[128371, 65039], "20201001", ["hole", "ground", "dark", "void"]],
  [[129668], "20210521", ["magic", "wand", "star", "sparkle"]],
  [[128302], "20201001", ["magic", "crystal", "ball", "purple"]],
  [[128293], "20201001", ["fire", "burn", "hot", "heat"]],
  [[128165], "20220203", ["explosion", "fire", "bang", "collision", "crash", "impact"]],
  [[128081], "20201001", ["crown", "gold", "royal"]],
  [[128049], "20201001", ["animal", "cat", "kitten", "pussy", "meowtle"]],
  [[129409], "20201001", ["animal", "big", "cat", "lion", "rawr"]],
  [[128047], "20220110", ["animal", "big", "cat", "tiger"]],
  [[128053], "20201001", ["animal", "monkey"]],
  [[128584], "20201001", ["animal", "monkey", "eye", "cover"]],
  [[128055], "20201001", ["animal", "pig"]],
  [[129412], "20210831", ["animal", "horse", "unicorn"]],
  [[129420], "20201001", ["animal", "deer", "christmas", "xmas", "rudolf"]],
  [[128016], "20210831", ["animal", "goat", "horn", "mountain"]],
  [[129433], "20201001", ["animal", "llama", "alpaca"]],
  [[128038], "20210831", ["animal", "bird", "blue", "twitter", "fly"]],
  [[129417], "20210831", ["animal", "bird", "owl", "fly", "wise", "night"]],
  [[128039], "20211115", ["animal", "bird", "penguin", "pingu", "ice", "cold"]],
  [[129415], "20201001", ["animal", "bat", "batman", "fly", "vampire", "night"]],
  [[128029], "20201001", ["animal", "honey", "insect", "arachnid", "bee", "pollen", "bzz", "black", "yellow", "queen", "fly", "stinger", "bitch"]],
  [[128375, 65039], "20201001", ["spider", "insect", "arachnid", "spooky"]],
  [[128034], "20201001", ["animal", "turtle", "god", "best", "meowtle"]],
  [[128025], "20201001", ["animal", "octopus", "squid"]],
  [[128060], "20201001", ["animal", "panda", "bear", "asian", "kungfu"]],
  [[128059], "20210831", ["animal", "brown", "bear"]],
  [[128040], "20201001", ["animal", "koala", "bear", "dumb"]],
  [[129445], "20201001", ["animal", "sloth", "slow"]],
  [[128048], "20201001", ["animal", "rabbit", "hare", "ear", "rodent"]],
  [[128045], "20201001", ["animal", "mouse", "rat", "ear", "rodent", "cheese"]],
  [[129428], "20201001", ["animal", "hedgehog", "sonic", "sanic"]],
  [[128054], "20211115", ["animal", "dog", "mikra"]],
  [[128041], "20211115", ["animal", "dog", "poodle"]],
  [[129437], "20211115", ["animal", "raccoon"]],
  [[128012], "20210218", ["animal", "snail", "slow"]],
  [[129410], "20210218", ["animal", "scorpion"]],
  [[128031], "20210831", ["animal", "fish", "swim", "sea"]],
  [[127757], "20201001", ["earth", "planet"]],
  [[127774], "20201001", ["sun", "star", "sky", "day", "light"]],
  [[127775], "20201001", ["star", "shiny", "night", "sky"]],
  [[11088], "20201001", ["star", "shiny", "night", "sky"]],
  [[127772], "20201001", ["moon", "night", "sky", "right"]],
  [[127771], "20201001", ["moon", "night", "sky", "left"]],
  [[128171], "20201001", ["star", "sparkle", "spin", "night", "sky"]],
  [[127752], "20201001", ["rain", "bow", "gay", "homosexual", "sky", "weather"]],
  [[127786, 65039], "20201001", ["tornado", "wind", "sky", "weather"]],
  [[9729, 65039], "20201001", ["cloud", "sky", "air", "weather", "rain", "fluff"]]
];

const API = "https://www.gstatic.com/android/keyboard/emojikitchen/"

const codePointsToEmoji = (codepoints: number[]) =>
  codepoints.reduce((p, c) => p + String.fromCodePoint(c), "");

export function apply(ctx: Context) {
  ctx.command("emojimix [emoji1] [emoji2]", "输出两个emoji的混合图片").action(async (message, e1, e2) => {
    if (e1 && !/\p{Emoji}/u.test(e1)) return `${e1}不是emoji`
    if (e2 && !/\p{Emoji}/u.test(e2)) return `${e2}不是emoji`

    let success = false

    let emoji1: (string | number[] | string[])[], emoji2: (string | number[] | string[])[], url: string
    let firstTry = true
    
    while (!success) {
      try {
        if (emoji1 == undefined) {
          if (e1) {
            const codePoint = e1.codePointAt(0)
            for (const element of emojis) {
              const e = element[0] as number[]
              if (e.includes(codePoint)) {
                emoji1 = element
                break
              }
            }
          } else {
            emoji1 = emojis[Math.floor(Math.random() * emojis.length)]
          }
        }
        if (emoji2 == undefined) {
          if (e2 || e1.length > 2) {
            const codePoint = e2 ? e2.codePointAt(0) : e1.codePointAt(2)
            if(!e2) e2 = codePointsToEmoji([codePoint])
            for (const element of emojis) {
              const e = element[0] as number[]
              if (e.includes(codePoint)) {
                emoji2 = element
                break
              }
            }
          }
          else {
            emoji2 = emojis[Math.floor(Math.random() * emojis.length)]
          }
        }
        if (!emoji1) {
          return `${e1}无效。`
        }
        if (!emoji2) {
          return `${e2}无效。`
        }

        const emoji1Code = emoji1[0] as number[]
        const url1 = emoji1Code.map(c => "u" + c.toString(16)).join("-")
        const emoji2Code = emoji2[0] as number[]
        const url2 = emoji2Code.map(c => "u" + c.toString(16)).join("-")

        url = `${API}${emoji1[1]}/${url1}/${url1}_${url2}.png`
        const response = await ctx.http.get(url)
        success = true
      } catch (error) {
        if (firstTry) {
          [emoji1, emoji2] = [emoji2, emoji1]
          firstTry = false
          continue
        }

        if (e1 && e2) {
          return '不存在对应的emojimix。'
        }
        emoji1 = undefined
        emoji2 = undefined
        continue
      }
    }

    return `${codePointsToEmoji(emoji1[0] as number[])}+${codePointsToEmoji(emoji2[0] as number[])}=${segment("image", { url: url })}`
  })
}
