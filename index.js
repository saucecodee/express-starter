const express = require('express')
const app = express()
const port = 3000
let users = require("./DB/users")

app.use(express.json());

//Create user
app.post('/users', (req, res) => {
     //Get the user data
     let user = req.body

     //insert it to the users array
     users.push(user)

     //return the newly added user
     res.send(res.send(`User with id: ${user.id} has been Added`)   )
})

//Get all users
app.get("/users", (req, res) => {
     res.send(users)
})

//Get a user
app.get("/users/:userId", (req, res) => {
     //Get user id
     const userId = req.params.userId
     let userIndex

     //Find the user index in the users array
     for (let i = 0; i < users.length; i++) {
          if (users[i].id == userId) {
               userIndex = i
               break
          }
     }

     if (userIndex == undefined)
          return res.send(`User with id: ${userId} does not exist`)

     //Update the data in that array based on the index
     const user = users[userIndex]

     res.send(user)
})

//Update a user
app.put("/users/:userId", (req, res) => {
     //Get user id
     const userId = req.params.userId
     const userData = req.body
     let userIndex

     //Find the user index in the users array
     for (let i = 0; i < users.length; i++) {
          if (users[i].id == userId) {
               userIndex = i
               break
          }
     }

     console.log(userIndex)

     if (userIndex == undefined)
          return res.send(`User with id: ${userId} does not exist`)

     //Update the data in that array based on the index
     users[userIndex] = userData

     res.send(`User with id: ${userId} has been updated`)
})

// Delete a user 
app.delete("/users/:userId", (req, res) => {
  //Get user id
  const userId = req.params.userId
  let userIndex

  //Find the user index in the users array
  for (let i = 0; i < users.length; i++) {
       if (users[i].id == userId) {
            userIndex = i
            break
       }
  }

  if (userIndex == undefined)
       return res.send(`User with id: ${userId} does not exist`)

  //Update the data in that array based on the index
  users.splice(userIndex, 1)  

  res.send(`User with id: ${userId} has been Deleted`)   
})


//Handle undefined routes
app.use("*", (req, res) => {
     res.send("Route not found")
})

app.listen(port, () => {
     console.log(`Our server is live at http://localhost:${port}`)
})