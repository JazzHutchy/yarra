## Models

### Product
- brandName: string
- name: string

## Steps
- yarn init
- yarn add (express, nodemon --dev, body-parser, mongoose
- In package.json

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
```