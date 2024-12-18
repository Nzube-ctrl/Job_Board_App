import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        // Check if the entity is a company
        if (!request.isCompany) {
            throw new ForbiddenException('Only companies can perform this action.');
        }
        return true;
    }
}