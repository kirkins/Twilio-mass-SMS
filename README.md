*This is a reupload of a GitHub repo I had downloaded. The user who originally uploaded danielohanessian has either deleted account or been deleted, so I am re-posting.*

**IMPORTANT NOTE:** If you want to use this be sure to slow down the speed with which SMS are sent! If you use the default speed your account will quickly be banned. I may update it to go slower by default at a later time.

# Mass Texting
Using www.twilio.com, use this repository to very easily send massive amounts of texts with no hassle.

## What You'll Need
* You will need to download nodeJS.
* You will need your Command Prompt (PC) or Terminal (Mac), that is built in to your computer.
* You will need a Twilio account, all ready to go.

## Tutorial
1. **Install the repository with Command Prompt/Terminal.** Type in ```git clone https://github.com/InfinityRunner/Mass-Texting.git```. If you do not have git installed, just download the zip and save it in your home folder.
2. **Find your home folder and open ```info.txt```.**
3. **Go to Twilio, and grab your API credentials from the home page, or your test credentials.**
4. **Replace ```[enter your twilio SID here]``` with your Twilio SID credential.**
5. **Replace ```[enter your twilio token here]``` with your Twilio token.**
6. **Replace ```[enter the phone number to use from twilio here]``` with your Twilio number.** Make sure there are no spaces or parantheses/brackets in the number.
7. **Replace ```[enter the message to send here]``` with the message you want to send.**
8. **Open ```phones.txt```.**
9. **Remove any existing text, and type in every single number you want to text, separating them with a line break.** Again, make sure there are no spaces or parantheses/brackets in the numbers.
10. **Go back to Command Prompt/Terminal and type in ```npm install fs```.**
11. **Go to Command Prompt/Terminal and type in ```node ``` and then go back to the Mass-Texting folder and drag and drop the ```masstexting.js``` file into Command Prompt/Terminal.**
12. **Hit enter.**
You're done!
