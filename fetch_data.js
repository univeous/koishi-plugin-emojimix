fetch('https://emojikitchen.dev/')
  .then(response => response.text())
  .then(data => {
    let jsPathRegEx = /\/assets\/index-[A-Za-z0-9_]*\.js/g;
    let jsPathMatch = data.match(jsPathRegEx);
    let jsPath = jsPathMatch[0];

    fetch(`https://emojikitchen.dev/${jsPath}`)
      .then(response => response.text())
      .then(data => {
        let urlsRegEx = /https:\/\/www\.gstatic\.com\/android\/keyboard\/emojikitchen[^"]*/g;
        let urlsMatch = data.match(urlsRegEx);
        urls = [...new Set(urlsMatch)];
        var data = {}
        for(url of urls) {
            components = url.split("/")
            date = components[components.length - 3]
            emoji = components[components.length - 2]
            emoji2 = components[components.length - 1].split(".")[0].split("_")[1]
            if(!(emoji in data)) {
                data[emoji] = []
            }
            data[emoji].push({[emoji2]: date})
        }
        console.log(JSON.stringify([data]))
      });
  });
