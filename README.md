# TherapistBotJS

## Functionality
**Uses:**
The Therapist bot has the ability to deliver motivational phrases from an API(), to recognize negativity through a publically updatable database of "Blue Words" that will trigger a response which takes a random message from a similar database of encouragements. The positive response function can also be toggled on and off so serious situations are not imposed upon by potentially useless or otherwise imprudent platitudes. All "Blue words" and encouragements are indexed and able to be deleted. The bot has a very basic personality that aims to be encouraging and sincere

**Commands:**
- !delEncouragement - removes encouraging phrase at the user specified index number
- !delBlueWord - removes recognized sad word at the user specified index number
- !list(bluewords/encouragements) - prints all phrases for either category with their index number 
- !motivate - sends a random motivational phrase to the user that commands it
- !newEncouragement - allows user to add a phrase to be used used when negativity is recognized
- !newBlueWord - allows user to add a word to the pool of recognized sad words
- !responding (true/false) - toggles whether or not the bot responds to sad words

## Looking Forward
There are a few issues with the bot I'd like to handle as well as some added functionality that would be, I think, a welcom addition. Namely, the commands use "Blue words" rather than something more common such as "sad" due to an issue with the bot responding to the command "!list sadwords" with an encouragement due to it recognizing the word "sad". currently I have a messages saying that "blue" cannot be added to the list of recognized words due to limitations but would like to devise a more elegant solution. Id also like to add a chat function so people can communicate and have basic conversations with the bot. Finally, Id like to add a content filter so that offensive words or phrases cannot be added to the list of encouragements as that pool will be shared by all servers that use the bot (a problem of its own, but not one I even remotely know how to fix).

## Notice
The bot is not intended to be a legitimate therapist or actually solve any issues with mental health. Use of the bot will demonstrate just how far off from that use case it is. The bot is just a relatively simple and manageable bot to begin learning with. Its main goal is to add a touch of positivity to a server or even just be an interesting, maybe comical, presence to have on a server.
