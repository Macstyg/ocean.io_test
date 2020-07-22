import { Router, Response, Request } from 'express';

import { currentUser } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/BadRequestError';
import { Password } from '../services/password';
import { createSession } from './helpers/session';
import { signinValidator, signupValidator } from './helpers/validators';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private getOne(req: Request, res: Response) {
    res.send({ currentUser: req.currentUser || null });
  }

  private signout(req: Request, res: Response) {
    req.session = null;
    res.send({});
  }

  private async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    createSession(req, existingUser);

    res.status(200).send(existingUser);
  }

  private async signup(req: Request, res: Response) {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, password });

    await user.save();

    createSession(req, user);

    res.status(201).send(user);
  }

  init() {
    this.router
      .get('/currentuser', currentUser, this.getOne)
      .post('/signin', signinValidator, validateRequest, this.signin)
      .post('/signup', signupValidator, validateRequest, this.signup)
      .post('/signout', this.signout);
  }
}

const userRoutes = new UserRouter();

export default userRoutes.router;
