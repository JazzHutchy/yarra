const passport = require('passport')
const JWT = require('jsonwebtoken')
const User = require('../models/User')
const PassportJwt = require('passport-jwt')

const jwtSecret = '0ifdSd8/BLUIHy53C/eiZqNZqKywoatcqQc1R8YxT0U='
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }

    // Store user so we can access it in our handler
    req.user = user
    // Success
    next()
  })
}

passport.use(new PassportJwt.Strategy(
  {
    // Where willthe JWT be passed in the HTTP request?
    // e,g. Authorization: Bearer hJdGuhD...
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // What is the secret
    secretOrKey: jwtSecret,
    // What algorithm(s) was used to sign it?
    algorithms: [jwtAlgorithm]
  },
  // When we have a verified token
  (payload, done) => {
    // Find the user 
    User.findById(payload.sub)
      .then((user) => {
        // If user found with this id
        if (user) {
          done(null, user)
        }
        // If not user was found
        else {
          done(null, false)
        }
      })
      .catch((error) => {
        // If failure
        done(null, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    // Payload
    {
      email: user.email,
    },
    // Secret
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send token
  res.json({ token })
}

module.exports = {
  initailize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}