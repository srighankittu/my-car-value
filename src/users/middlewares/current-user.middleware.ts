import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: User | null;
  }
}

@Injectable()
export class currentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.session || {};
    if (id) {
      try {
        const user = await this.usersService.findOne(parseInt(id));
        if (user) {
          req.currentUser = user;
        }
      } catch {
        req.currentUser = null;
      }
    }

    next();
  }
}
