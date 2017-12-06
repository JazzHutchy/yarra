## Models

### Product
- brandName: string
- name: string

## Steps
1. yarn init
2. yarn add (express, nodemon --dev, body-parser, mongoose), creates 'package.json'
3. 

Add in package.json
```javascript
 "scripts": {
    "dev": "nodemon server.js",
    "seed": "node models/seeds.js",
    "drop": "node models/drop.js",
    "reset": "npm run drop && npm run seed"
  }
```

Add server.js
```javascript
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

// Middleware Plugins
server.use(bodyParser.json()) // Allows me to have JSON uploads (POST/PUT/PATCH)

// Routes
server.use([
  require('./routes/products')
])


// Start the server
server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  }
  else {
    console.log('Server started at http://localhost:7000/')
  }
})

```

Add User.js and schema
```javascript
const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true, // Ensure that all emails are lowercase (e.g. BOB@gmail.com = bob@gmail.com)
  session: false // Disable sessions as we'll use JWTs
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

Add auth.js in the routes folder
```javascript
```

Add another auth.js in a newly created 'middleware folder'
```javascript
```

