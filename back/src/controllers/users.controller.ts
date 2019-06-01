import http from 'http';
import url from 'url';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import User from '../models/user.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class UsersController extends BaseController {
	constructor() {
		super(User);
	}

	public async register(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const user = await reader.readJson(req);
			const hashedPassword = bcrypt.hashSync(user.password, 8);

			const newObj = new User({
				name: user.name,
				email: user.email,
				password: hashedPassword,
				role: 'User'
			});

			await newObj.save();

			writer.writeJson(res, { status: 'ok' });
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async login(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		try {
			const model = await reader.readJson(req);

			const user = await User.findOne({
				email: model.email
			});

			if (user !== undefined && user !== null) {
				const passwordIsValid = bcrypt.compareSync(model.password, user.password);

				if (!passwordIsValid) {
					writer.writeJson(res, { error: 'Invalid email and/or password.' }, 404);
				} else {
					const token = jwt.sign({ id: user._id }, '123', { expiresIn: 86400 });
					writer.writeJson(res, { auth: true, token });
				}
			} else {
				writer.writeJson(res, { error: 'Invalid email and/or password.' }, 404);
			}
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async me(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		let token = req.headers.authorization.toString();

		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}

		if (token !== undefined) {
			try {
				const decoded = await jwt.verify(token, '123');

				const user = await User.findById(decoded.id);

				writer.writeJson(res, {
					name: user.name,
					email: user.email,
					role: user.role
				});
			} catch {
				writer.writeJson(res, { auth: false, message: 'Failed to authenticate token.' }, 500);
			}
		} else {
			writer.writeJson(res, { auth: false, message: 'No token provided.' }, 401);
		}
	}
}
