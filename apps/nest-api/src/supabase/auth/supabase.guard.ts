import { DecodedUserJwt } from '@job-application-tracker/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

/**
 * A guard that implements the CanActivate interface to handle authentication.
 * It verifies the JWT token provided in the request header and assigns the decoded user information to the request object.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Determines whether the request is authorized or not.
   * @param context The execution context of the request.
   * @returns A boolean indicating whether the request is authorized or not.
   * @throws UnauthorizedException if the request is not authorized.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = jwt.verify(
        token,
        this.configService.get('SUPABASE_JWT_SECRET')
      ) as DecodedUserJwt;
      this.logger.log(`User ${user.email} verified by jwt`);
      // Assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extracts the JWT token from the request header.
   * @param request The HTTP request object.
   * @returns The JWT token extracted from the request header, or undefined if not found.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
