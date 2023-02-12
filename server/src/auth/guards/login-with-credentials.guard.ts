import {
	BadRequestException,
	ExecutionContext,
	Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LogInWithCredentialsGuard extends AuthGuard('local') {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			await super.canActivate(context);
			const request = context.switchToHttp().getRequest();
			await super.logIn(request);
			return true;
		} catch (e) {
			throw new BadRequestException('Неверный email или пароль');
		}
	}
}
