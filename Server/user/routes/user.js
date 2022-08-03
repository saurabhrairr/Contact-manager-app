const express = require("express")
const userInfo = require("../modals/user-modal")
const userContacts = require("../modals/contacts-modal")
const { checkExistingUser, ContactsValidator ,CheckforDuplicates} = require("../utility")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const salt = 9;
//const secretKey=crypto.randomBytes(64).toString("hex");
const router = express.Router();
router.post("/login", (req, res) => {
  //res.status(200).send("Login works")
  userInfo.find({ username: req.body.username }).then((userData) => {
    if (userData.length) {
      bcrypt.compare(req.body.password, userData[0].password).then((val) => {
        if (val) {
          const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY)
          console.log(authToken);
          res.status(200).send({ "status": "success", "token": authToken })
        } else {
          res.status(400).send({ "status": "access denied", "message": "wrong password" })
        }
      })
    } else {
      res.status(400).send({ "status": "Invalid user", "message": "User not found" })
    }
  })
})
router.post("/signup", async (req, res) => {
  // res.status(200).send("signup works")
  if (await checkExistingUser(req.body.username)) {
    res.status(400).send({ "status": "Invalid user", "message": 'Username exists please try with different one' })
  } else {
    if (req.body.password === req.body.cpassword) {
      bcrypt.genSalt(salt).then((saltHash) => {
        bcrypt.hash(req.body.password, saltHash).then((passwordHash) => {
          userInfo.create({ username: req.body.username, password: passwordHash })
            .then(() => {
              userContacts.create({ username: req.body.username, contacts: [] })
            })
            .then(() => {
              res.status(200).send({ "status": "success", "message": "Registerd successfully" })
            }).catch((err) => {
              res.status(400).send({ "status": "Failed", "message": "Database Error" })
            })
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })

    } else {
      return res.status(400).send({ "status": "Failed", "message": "Password mismatch" })
    }
  }
})
router.post("/logout", (req, res) => {
  res.status(200).send({ "status": "success", "message": "Loggedout successfully" })
})


router.get("/contacts", (req, res) => {
  // console.log("indes",req.headers.authorization,jwt.verify(req.headers.authorization,SECRET_KEY))
  try {
    // console.log(req.headers)
    const userName = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    userInfo.find({ username: userName }).then((users) => {
      if (users.length) {
        userContacts.find({ username: users[0].username }).then((ContactsFound) => {
          res.status(200).send({ "status": "success", "message": "sending contacts", "data": ContactsFound[0].contacts, "username": ContactsFound[0].username });
        });
      }
      else {
        res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
      }
    });
  }
  catch (err) {
    if (err.message === "invalid signature") {
      console.log("invalid signature");
      res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
    }
    else if (err.message === "jwt must be provided") {
      console.log("authorization jwt not found");
      es.status(400).send({ "status": "failed", "message": "authorization jwt not found ,Invalid user, loginIn again" });
    }
    // console.log(err);
  }
})

router.post("/addcontacts", (req, res) => {
  // console.log("indes ",req.headers.authorization,jwt.verify(req.headers.authorization,SECRET_KEY))
  try {
    // console.log(req.headers.authorization)
    const userName = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    userInfo.find({ username: userName }).then((users) => {
      if (users.length) {
        userContacts.find({ username: users[0].username }).then((ContactsFound) => {
          // console.log(req.body.data)
          let newdata = req.body.data.filter((ele) => {
            // console.log("inside filter",ContactsValidator(ele),ele)
            return (ContactsValidator(ele) && !CheckforDuplicates(ContactsFound[0].contacts,ele));
          })
          // console.log("this is new filter data", newdata.length, newdata)
          userContacts.updateOne({ username: users[0].username }, { $set: { contacts: [...ContactsFound[0].contacts, ...newdata] } }).then((val) => {
            console.log(val)

          })
          res.status(200).send({ "status": "success", "message": "sending contacts", "data": ContactsFound[0].contacts });
        });
      }
      else {
        res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
      }
    });
  }
  catch (err) {
    if (err.message === "invalid signature") {
      console.log("invalid signature");
      res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
    }
    else if (err.message === "jwt must be provided") {
      console.log("authorization jwt not found");
      es.status(400).send({ "status": "failed", "message": "authorization jwt not found ,Invalid user, loginIn again" });
    }
    // console.log(err);
  }
})




router.delete("/contact/deleteone", (req, res) => {
  // console.log("indes ",req.headers.authorization,jwt.verify(req.headers.authorization,SECRET_KEY))
  try {
    // console.log(req.headers.authorization)
    const userName = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    userInfo.find({ username: userName }).then((users) => {
      if (users.length) {
        userContacts.find({ username: users[0].username }).then((ContactsFound) => {
          // console.log(req.body.contact.index)
          // let newdata = ContactsFound[0].contacts[req.body.contact.index]
          let newdata = [...(ContactsFound[0].contacts.slice(0, req.body.contact.index)), ...(ContactsFound[0].contacts.slice(req.body.contact.index + 1, ContactsFound[0].contacts.length))]
          // console.log("this is new filter data", newdata)
          // console.log("this is new filter data", newdata.length, newdata)
          // let newdata=[...(ContactsFound[0].contacts.slice(0, 29))]
          userContacts.updateOne({ username: users[0].username }, { $set: { contacts: [...newdata] } }).then((val) => {
            // console.log(val)

          })
          res.status(200).send({ "status": "success", "message": "Deleted one Contact Sucessfully", "data": newdata });
        });
      }
      else {
        res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
      }
    });
  }
  catch (err) {
    if (err.message === "invalid signature") {
      console.log("invalid signature");
      res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
    }
    else if (err.message === "jwt must be provided") {
      console.log("authorization jwt not found");
      res.status(400).send({ "status": "failed", "message": "authorization jwt not found ,Invalid user, loginIn again" });
    }
    // console.log(err);
  }
})

router.delete("/contact/deletemany", (req, res) => {
  // console.log("indes ",req.headers.authorization,jwt.verify(req.headers.authorization,SECRET_KEY))
  try {
    // console.log(req.headers.authorization)
    const userName = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    userInfo.find({ username: userName }).then((users) => {
      if (users.length) {
        userContacts.find({ username: users[0].username }).then((ContactsFound) => {
          // console.log(req.body.contact.index)
          // let newdata = ContactsFound[0].contacts[req.body.contact.index]
          let newdata = [];
          for (let i = 0; i < ContactsFound[0].contacts.length; i++) {
            let isPresent = true;
            for (let j = 0; j < req.body.contact.index.length; j++) {
              if (req.body.contact.index[j] === i) {
                isPresent = false
                break;
              }
            }
            if (isPresent) {
              newdata.push(ContactsFound[0].contacts[i]);
            }
          }
          // console.log(newdata);
          // let newdata = [...(ContactsFound[0].contacts.slice(0, req.body.contact.index)), ...(ContactsFound[0].contacts.slice(req.body.contact.index + 1, ContactsFound[0].contacts.length))]
          // console.log("this is new filter data", newdata)
          // console.log("this is new filter data", newdata.length, newdata)
          userContacts.updateOne({ username: users[0].username }, { $set: { contacts: [...newdata] } }).then((val) => {
            // console.log(val)

          })
          res.status(200).send({ "status": "success", "message": "Deleted one Contact Sucessfully", "data": newdata });
        });
      }
      else {
        res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
      }
    });
  }
  catch (err) {
    if (err.message === "invalid signature") {
      console.log("invalid signature");
      res.status(400).send({ "status": "failed", "message": "Invalid user, loginIn again" })
    }
    else if (err.message === "jwt must be provided") {
      console.log("authorization jwt not found");
      es.status(400).send({ "status": "failed", "message": "authorization jwt not found ,Invalid user, loginIn again" });
    }
    // console.log(err);
  }
})



module.exports = router;



