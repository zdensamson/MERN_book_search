// STARTER CODE STARTER CODE -------STARTER CODE STARTER CODE -------STARTER CODE STARTER CODE -------STARTER CODE STARTER CODE -------STARTER CODE STARTER CODE -------STARTER CODE STARTER CODE -------
// const jwt = require('jsonwebtoken');

// // set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   // function for our authenticated routes
//   // MAYBE DROP TO ONLY req NOT req,res,next
//   authMiddleware: function ( req, res ) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.headers.authorization || req.body.token;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return res.status(400).json({ message: 'You have no token!' });
//     }

//     // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//       return res.status(400).json({ message: 'invalid token!' });
//     }

//     // send to next endpoint
//     // next();
//     return req;
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };

// -------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE-------MODULE CODE

const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhh';
const expiration = '2h';

module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = {username, email, _id};

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration})
    },

    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
      
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
      
        // if no token, return request object as is
        if (!token) {
          return req;
        }
      
        try {
          // decode and attach user data to request object
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        // return updated request object
        return req;
      }
}