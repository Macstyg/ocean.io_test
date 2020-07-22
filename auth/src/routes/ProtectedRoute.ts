import { Router, Response, Request } from 'express';
import { requireAuth } from '../middlewares/require-auth';

class ProtecteRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private getOne(req: Request, res: Response) {
    res.send({});
  }

  init() {
    this.router.get('/', requireAuth, this.getOne);
  }
}

const protectedRoutes = new ProtecteRoute();

export default protectedRoutes.router;
