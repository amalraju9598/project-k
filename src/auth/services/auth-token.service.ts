import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthTokenervice {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }
    async generateTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn:
                        this.configService.get<string>('JWT_ACCESS_EXPIRY'),
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>(
                        'JWT_REFRESH_SECRET',
                    ),
                    expiresIn:
                        this.configService.get<string>('JWT_REFRESH_EXPIRY'),
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}