
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import Redis from 'ioredis';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, private reflector: Reflector,

    @Inject('REDIS_CLIENT') private readonly cacheManager: Redis
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token not found .");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      const cachedData = await this.cacheManager.get(payload.userId);
      if (!cachedData) {
        throw new Error("User not registered .");
      }

      const parsedData = JSON.parse(cachedData);
      if (parsedData.token != token) {
        throw new Error("Invalid user .");
      }

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

