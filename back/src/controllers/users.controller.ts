import http from 'http';
import url from 'url';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import Category from '../models/category.model';
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

			writer.writeSuccess(res, {});
		} catch (err) {
			writer.writeError(res, err, 400);
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
					writer.writeError(res, { message: 'Invalid email and/or password.' }, 404);
				} else {
					const token = jwt.sign({ id: user._id }, '123', { expiresIn: 86400 });
					writer.writeSuccess(res, { auth: true, token });
				}
			} else {
				writer.writeError(res, { message: 'Invalid email and/or password.' }, 404);
			}
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async me(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		if (req.headers.authorization) {
			let token = req.headers.authorization.toString();

			if (token.startsWith('Bearer ')) {
				token = token.slice(7, token.length);
			}

			if (token !== undefined) {
				try {
					const decoded = await jwt.verify(token, '123');

					const user = await User.findById(decoded.id);

					writer.writeSuccess(res, {
						name: user.name,
						email: user.email,
						role: user.role
					});
				} catch {
					writer.writeError(res, { auth: false, message: 'Failed to authenticate token.' }, 500);
				}
			} else {
				writer.writeError(res, { auth: false, message: 'No token provided.' }, 401);
			}
		} else {
			writer.writeError(res, { auth: false, message: 'No authorization in header provided.' }, 402);
		}
	}

	public async addSubscription(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const user = await User.findOne({ _id: queryData.id });
			const count = await Category.count({ _id: queryData.category });

			let subscriptions = user.subscriptions;

			if (count !== 0) {
				if (subscriptions.includes(queryData.category) === false) {
					subscriptions.push(queryData.category);
					await User.update({ _id: queryData.id }, { $set: { subscriptions: subscriptions } });
					const newUser = await User.findOne({ _id: queryData.id });
					writer.writeSuccess(res, newUser);
				} else {
					writer.writeSuccess(res, user);
				}
			} else {
				writer.writeError(res, "This category doesn't exist", 400);
			}
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

	public async removeSubscription(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const countUser = await User.count({ _id: queryData.id });
			if (countUser !== 0) {
				const user = await User.findOne({ _id: queryData.id });
				const countCategory = await Category.count({ _id: queryData.category });
				let subscriptions = user.subscriptions;

				if (countCategory !== 0) {
					if (subscriptions.includes(queryData.category) === true) {
						let index = subscriptions.indexOf(queryData.category);
						if (index > -1) {
							subscriptions.splice(index, 1);
						}
						await User.update({ _id: queryData.id }, { $set: { subscriptions: subscriptions } });
						const newUser = await User.findOne({ _id: queryData.id });
						writer.writeSuccess(res, newUser);
					} else {
						writer.writeSuccess(res, user);
					}
				} else {
					writer.writeError(res, "This category doesn't exist", 400);
				}
			}
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}

}
