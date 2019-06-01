import http from "http";

import User from '../models/user.model';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class UsersController {
	public async add(req, res) {
		try {
			const newObj = new User(await reader.readJson(req));
			const saveObj = await newObj.save();

			writer.writeJson(res, saveObj);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

	public async get(req, res) {
		try {
			const users = await User.find({});

			writer.writeJson(res, users);
		} catch (err) {
			writer.writeJson(res, err, 400);
		}
	}

}
