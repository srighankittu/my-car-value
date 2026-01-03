import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  new (...args: any[]): {};
}

export function Serialise(dto: ClassConstructor) {
  return UseInterceptors(new SerialiseInterseptor(dto));
}

export class SerialiseInterseptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
