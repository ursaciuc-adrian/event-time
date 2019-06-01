import * as jwt from 'jsonwebtoken';

import User from '../models/user.model';

export async function isLoggedIn(token: string): Promise<boolean> {
	if (token === undefined) {
		return false;
	}

	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	try {
		await jwt.verify(token, '123');

		return true;
	} catch {
		return false;
	}
}

export async function isInRole(token: string, role: string): Promise<boolean> {
	if (token === undefined) {
		return false;
	}

	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	try {
		const decoded = await jwt.verify(token, '123');
		const user = await User.findById(decoded.id);

		if (user.role.toLowerCase() === role.toLowerCase()) {
			return true;
		}

		return false;
	} catch {
		return false;
	}
}