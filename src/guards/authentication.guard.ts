import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "src/models/user.model";
import { Company } from "src/models/company.model";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException('No token provided');
            }

            // Decode JWT
            const decodedToken = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET') });

            // Determine if the entity is a User or Company
            const user = await User.findOne({ where: { id: decodedToken.id } });
            const company = await Company.findOne({ where: { id: decodedToken.id } });

            if (!user && !company) {
                throw new UnauthorizedException('Invalid token');
            }

            // Attach the entity to the request
            request.user = user || company;
            request.isCompany = !!company;

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
// export class AuthenticationGuard implements CanActivate {
//     constructor(private jwtService: JwtService, private configService: ConfigService) { }
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         try {
//             console.log(`Inside the authentication guard!`);
//             const request = context.switchToHttp().getRequest();
//             const token = request.headers.authorization.split(' ')[1];
//             // console.log(token);
//             if (!token) {
//                 throw new UnauthorizedException();
//             }
//             request.user = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET') });
//         } catch (error) {
//             console.log(error);
//             throw new UnauthorizedException();
//         }
//         return true;
//     }
// }