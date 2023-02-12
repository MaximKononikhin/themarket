import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Logout = createParamDecorator(
	(_, ctx: ExecutionContext): VoidFunction => {
		const request = ctx.switchToHttp().getRequest();
		const next = ctx.switchToHttp().getNext();

		const logout = () => {
			request.session.cookie.maxAge = 0;

			request.logOut((err) => {
				next(err);
			});
		};

		return logout;
	},
);
