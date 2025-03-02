import { Request, Response, Router } from 'express';
import { body, Result, ValidationError, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, IUser } from '../models/User';

const router: Router = Router();

//POST register user registration endpoint
router.post("/register",
  [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('password').isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
    //Checks for errors in validation
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(400).json({ errors: errors.array() });
      return; 
    }

    try {
      //Checks if username is already in use
      const existingUser: IUser | null = await User.findOne({ username: req.body.username });
      console.log(existingUser);
      if (existingUser) {
        res.status(403).json({ username: 'username already in use' }); 
        return; 
      }

      //hashes password for security
      const salt: string = bcrypt.genSaltSync(10);
      const hash: string = bcrypt.hashSync(req.body.password, salt);
      
      //creates the new user
      await User.create({
        username: req.body.username,
        password: hash,
      });

      res.status(200).json({ message: 'User registered successfully' }); 
    } catch (error: any) {
      console.error(`Error during registration: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

//Post login user login endpoint
router.post("/login",
  [
    body('username').trim().escape(),
    body('password').escape(),
  ],
  async (req: Request, res: Response) => {
    try {

      //Finds the user by the username
      const user: IUser | null = await User.findOne({ username: req.body.username });

      if (!user) {
        res.status(401).json({ message: 'Login failed' });
        return; 
      }

      // Compares the provided password with the stored hash
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const jwtPayload: JwtPayload = {
          id: user._id,
          username: user.username,
        };
      //generates jwt token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
      } else {
        res.status(401).json({ message: 'Login failed' }); 
      }
    } catch (error: any) {
      console.error(`Error during user login: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default router;