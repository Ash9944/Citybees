
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject('REDIS_CLIENT') private readonly cacheManager: Redis
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client: Socket = context.switchToWs().getClient();

        const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not provided');
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

            client.data.userId = payload;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

        return true;
    }
}
