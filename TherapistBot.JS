const Discord = require("discord.js")
const fetch = require("node-fetch")
const Database = require("@replit/database")


const db = new Database()
const client = new Discord.Client()

const seedSadness = ["sad", "unhappy", "depressed", "melancholy", "regretful", "hopeless"]

const seedReassurance = ["I know it hurts to get knocked down, but you've trained every day to get back up again. Dont let them win\n", "My computer calculations tell me you are a wonderful person\n", "Those who make you feel negatively are either trying to help you or are not worth your time, and your time is priceless\n", "there will never be another time to live your life. Live it without regret and, when possible, learn what paths lead to unnecessary sadness and avoid them\n", "You can never possibly know the number of people who love you. Even if it were possible that absolutely no one else did, I always will.\n"]

const commandList = ["!delEncouragement - removes encouraging Phrase at index #", "!delBlueWord - removes sad word at index #", "!list (bluewords/encouragements) - prints the pool of phrases with thier index number", "!motivate - Delivers a random motivational phrase", "!newEncouragement - allows user to add a message to the pool of phrases", "!newBlueWord - allows user to add a word to the pool of sad words", "!responding (true/false) - toggles whether or not the bot responds to sad words"]

db.get("responding").then(value =>{
  if(value == null){
    db.set("responding", true)
  }
})

db.get("encouragements").then(encouragements => {
  if(!encouragements || encouragements.length < 1){
    db.set("encouragements", seedReassurance)
  }
})

db.get("sadWords").then(sadWords => {
  if(!sadWords || sadWords.length < 1){
    db.set("sadWords", seedSadness)
  }
})

db.get("commands").then(commands => {
    db.set("commands", commandList)
})



function getQuote(){
  return fetch("https://zenquotes.io/api/random")
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data[0]["q"] + " -" + data[0]["a"]
  })
}

function newEncouragement(encouragingMesage){
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMesage])
    db.set("encouragements", encouragements)
  })
}

function newSadWord(sadWord){
  db.get("sadWords").then(sadWords => {
    sadWords.push([sadWord])
    db.set("sadWords", sadWords);
  })
}

function removeEncouragement(index){
  db.get("encouragements").then(encouragements => {
    if(encouragements.length > index){
      encouragements.splice(index, 1)
      db.set("encouragements", encouragements)
    }
  })
}

function removeSadWord(index){
  db.get("sadWords").then(sadWords => {
    if(sadWords.length > index){
      sadWords.splice(index, 1)
      db.set("sadWords",sadWords)
    }
  })
}


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg =>{
if(msg.author.bot) return
if(msg.content === "!motivate" || msg.content === "!Motivate"){
  getQuote().then(quote => msg.channel.send(quote))
}

  db.get("responding").then(responding => {
    db.get("sadWords").then(sadWords => {
      if(responding && sadWords.some(word => msg.content.includes(word)) && !msg.author.bot){
        msg.channel.send("I just read a sad word")
        db.get("encouragements").then(encouragements => {
          const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
          msg.reply(encouragement)
        })
      }
    })
  })

if(msg.content.startsWith("!newEncouragement")){
  encouragingMessage = msg.content.split("!newEncouragement ")[1]
  newEncouragement(encouragingMessage)
  msg.channel.send("New Encouraging Message Added!")
}

if(msg.content.startsWith("!newBlueWord")){
  sadWord = msg.content.split("!newBlueWord ")[1]
  if(sadWord === "blue" || sadWord === "Blue"){
    msg.channel.send("Im sincerely sorry that you are feeling blue, but please try to understand that due to my limitations as a bot that is the one word I cannot process.")
  }else{
    newSadWord(sadWord)
    msg.channel.send("Im sorry you've been reminded of that which is sad. It is my sincere hope that you will soon outgrow it.")
  }
}

if(msg.content.startsWith("!delBlueWord")){
  index = parseInt(msg.content.split("!delBlueWord ")[1])
  db.get("sadWords").then(sadWords => {
    if(sadWords || sadwords.length > 0){
        removeSadWord(index)
        msg.channel.send("The selected word is no longer sad. Im proud of your growth")
    }else{
      msg.channel.send("There is nothing here to delete. As hard as it is to ask, is there a sad word you need to add?")
    }
  })
}

if(msg.content.startsWith("!delEncouragement")){
  index = parseInt(msg.content.split("!delEncouragement ")[1])
  db.get("encouragements").then(encouragements => {
    if(encouragements || encouragements.length > 0){
        removeEncouragement(index)
        msg.channel.send("Encouraging Messages Deleted, how about you add one in its place?")
    }else{
      msg.channel.send("Oh no, there are no encouragements at all! Please add some for the good of the community")
    }
  })
}

if(msg.content.startsWith("!list")){
  message = msg.content.split("!list ")[1]
  message = message.toLowerCase()
  if(message.includes("encouragements")){
    db.get("encouragements").then(encouragements =>{
      if(!encouragements || encouragements.length < 1){
        msg.channel.send("I cant show you a list that is empty! I think everyone could be a little happier if you added some positivity yourself!")
      }else{
        msg.channel.send("--------------------encouragements--------------------")
        for(let i = 0; i < encouragements.length; i++){
        msg.channel.send(i + ") " + encouragements[i])
        }
      }
    })
  }
  if(message.includes("blue words") || msg.content.includes("bluewords")){
    db.get("sadWords").then(sadWords =>{
      if(!sadWords || sadWords.length < 1){
        msg.channel.send("I cant show you a list that is empty, but im happy there are no words that currently bring you sadness")
      }else{
        msg.channel.send("--------------------Blue Words--------------------")
        for(let i = 0; i < sadWords.length; i++){
          msg.channel.send(i + ") " + sadWords[i])
        }
      }
    })
  }
}



if(msg.content.startsWith("!responding")){
    value = msg.content.split("!responding ")[1]

    if(value.toLowerCase() == "true"){
      db.set("responding", true)
      msg.channel.send("Responding is on")
    }else{
      db.set("responding", false)
      msg.channel.send("Responding is off")
    }
  }


if(msg.content.startsWith("!commands")){
  db.get("commands").then(commands => {
    for(let i = 0; i < commands.length; i++){
    msg.channel.send("- " + commands[i])
}
  })
}


})

client.login(process.env.TOKEN)
