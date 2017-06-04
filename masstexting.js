console.log("Reading text file...")

const fs = require('fs')

//Grab files
var textFile = fs.readFileSync('./Mass-Texting/phones.txt', 'utf8').split("\n")
var info = fs.readFileSync('./Mass-Texting/info.txt', 'utf8').split("\n")

//Array of phones
var phones = []

//Phone counter
var phoneNo = 0;

//Boolean to start texting or not
var startTexting = false;

//First stage: Verify phone numbers
var phonechecker = setInterval(function() {
  //If done with text file, go to next stage
  if (textFile[phoneNo] === undefined) {
    clearInterval(phonechecker)

    //----------------------------------------//
    console.log("Compiling process done. Texting process in progress...")

    //Texting phone number counter
    var textNo = 0;

    /*
    var debtsettlement = "are you drowning in debt? debt settlement is the best way out! call us for a free evaluation: (888) 387-0387"
    var studentloan = "new student loan forgiveness program see if you qualify!\ncall: (888) 387-0111\nor\ntext: (949) 264-3830\nor apply: www.eduloansupport.com"
    */

    // Twilio Credentials
    var accountSid = info[0];
    var authToken = info[1];

    //require the Twilio module and create a REST client

    try {
      //Replaces + and - from the current phone number and stores the variable
      var fromPhone = String(info[2]).replace(/-/g, "").replace(/\+/g, "")

      if (fromPhone !== undefined && (fromPhone.length === 10 || fromPhone.length === 11)) {
        for (var i = 0; i < fromPhone.length; i++) {
          if (isNaN(parseInt(fromPhone[i], 10))) {
            console.log(fromPhone + " isn't a good from number! Please try again.")
            process.exit()
          }
        }
        if (fromPhone.length === 11) {
          if (fromPhone[0] === "1") {
            phoneFrom = ("+" + fromPhone)
          } else {
            console.log(fromPhone + " isn't a good from number! Please try again.")
            process.exit()
          }
        } else {
          phoneFrom = ("+1" + fromPhone)
        }
      } else {
        if (info[3] !== undefined) {
          console.log(fromPhone + " isn't a good from number! Please try again.")
          process.exit()
        }
      }
    } catch(e) {

    }

    var client = require('twilio')(accountSid, authToken)
    var sms = setInterval(function() {
      client.messages.create({
          to: phones[textNo],
          from: phoneFrom,
          body: info[3]
      }, function(err, message) {
        if (!err) {
          if (phones.length - (textNo + 1) < 60) {
            console.log("Message successfully sent to +1 (" + message.to.substr(2, 3) + ") " + message.to.substr(5, 3) + "-" + message.to.substr(8, 4) + ". (" + (textNo + 1) + "/" + phones.length + ")");
          } else {
            console.log("Message successfully sent to +1 (" + message.to.substr(2, 3) + ") " + message.to.substr(5, 3) + "-" + message.to.substr(8, 4) + ". (" + (textNo + 1) + "/" + phones.length + ") (" + Math.round((phones.length - (textNo + 1)) / 60) + " minutes left)");
          }
        } else {
          if (err.code === 21211) {
            console.log(err.message + " Moving on to next phone number!")
          } else if (err.code === 21606) {
            console.log(err.message + " Please enter a valid from number in 'info.txt'.")
            process.exit()
          } else if (err.code === 21608) {
            console.log("Still on Twilio Free Trial, eh?")
            process.exit()
          } else if (err.code === 20003 || err.code === 20404) {
            console.log("Could not log in to Twilio, maybe you entered the wrong credentials into 'info.txt'?")
            process.exit()
          } else {
            if (phones[textNo] !== undefined) {
              console.log(err.message + ". Moving on to next phone number!")
            } else {
              if (err.code === 21604) {
                console.log("Successfully texted all " + phones.length + " phone numbers!")
              } else {
                console.log("---FATAL ERROR!---\nError Code " + err.code + ": " + err.message + "\n------------\nGo to https://www.twilio.com/docs/api/errors/" + err.code + " for more info.\n------------")
              }
              clearInterval(sms)
            }
          }
        }
        textNo++;
      });
    }, 1000)
    //----------------------------------------//
  }
  try {
    //Replaces + and - from the current phone number and stores the variable
    var currentPhone = String(textFile[phoneNo]).replace(/-/g, "").replace(/\+/g, "")

    if (currentPhone !== undefined && (currentPhone.length === 10 || currentPhone.length === 11)) {
      for (var i = 0; i < currentPhone.length; i++) {
        if (isNaN(parseInt(currentPhone[i], 10))) {
          console.log(currentPhone + " is a bad number! Continuing on... (" + (phoneNo + 1) + "/" + textFile.length + ")")
          phoneNo++;
          return;
        }
      }
      if (currentPhone.length === 11) {
        if (currentPhone[0] === "1") {
          phones.push("+" + currentPhone)
          console.log("Added " + currentPhone + " to the list! (" + (phoneNo + 1) + "/" + textFile.length + ")")
        } else {
          console.log(currentPhone + " is a bad number! Continuing on... (" + (phoneNo + 1) + "/" + textFile.length + ")")
        }
      } else {
        phones.push("+1" + currentPhone)
        console.log("Added " + currentPhone + " to the list! (" + (phoneNo + 1) + "/" + textFile.length + ")")
      }
    } else {
      if (textFile[phoneNo] !== undefined) {
        console.log(currentPhone + " is a bad number! Continuing on... (" + (phoneNo + 1) + "/" + textFile.length + ")")
      }
    }
  } catch(e) {

  }
  phoneNo++;
}, 1)
