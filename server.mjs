import express, { json, urlencoded } from 'express';
const app = express();
import { json as _json } from 'body-parser';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
const port = process.env.PORT || 25364;
app.use(json());
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
app.use(_json());
import { connect, connection } from 'mongoose';
connect('mongodb://localhost/truck-driver-app', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
});
import User, { findOne } from './models/user';
app.post('/api/register', async (req, res) => {
   try {
      const {
         email,
         password
      } = req.body;
      const existingUser = await findOne({
         email
      });
      if (existingUser) {
         return res.status(400).json({
            message: 'Email already registered'
         });
      }
      const saltRounds = 10;
      const hashedPassword = await hash(password, saltRounds);
      const newUser = new User({
         email,
         password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
         message: 'Registration successful'
      });
   } catch (error) {
      res.status(500).json({
         message: 'Internal server error'
      });
   }
});
app.post('/api/login', async (req, res) => {
   try {
      const {
         email,
         password
      } = req.body;
      const user = await findOne({
         email
      });
      if (!user) {
         return res.status(401).json({
            message: 'Invalid credentials'
         });
      }
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(401).json({
            message: 'Invalid credentials'
         });
      }
      const token = sign({
         userId: user._id
      }, 'your-secret-key', {
         expiresIn: '1h',
      });
      res.status(200).json({
         token
      });
   } catch (error) {
      res.status(500).json({
         message: 'Internal server error'
      });
   }
});
app.use(urlencoded({
   extended: true
}));
app.use((req, _res, next) => {
   console.log(`${req.method} ${req.url}`);
   next();
});
app.get('/', (_req, res) => {
   res.send('Welcome to the Truck Driver App!');
});

app.get('/profile/:id', (req, res) => {
   const userId = req.params.id;
   const userProfile = {
      id: userId,
      name: 'John Doe'
   };
   res.json(userProfile);
});
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
app.get('/example', (_req, _res, next) => {
   try {
      // Code that may throw an error
      throw new Error('An example error');
   } catch (err) {
      next(err);
   }
});
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
   console.log('Connected to MongoDB');
});
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});