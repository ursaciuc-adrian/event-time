import http from 'http';
import url from 'url';

import Follower from '../models/follower.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class FollowersController extends BaseController {
	constructor() {
		super(Follower);
	}

	public async addFollwerFromUrl(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		const queryData = url.parse(req.url, true).query;

		try {
			const organizationUrl = url.parse(queryData.url.toString());

			const id = organizationUrl.href.substr(organizationUrl.href.lastIndexOf('-') + 1, organizationUrl.href.length - 1);

			const newObj = new this.Schema({
				idOrigin: id,
				originName: organizationUrl.hostname,
				url: organizationUrl.href
			});
			const saveObj = await newObj.save();

			writer.writeSuccess(res, saveObj);
		} catch (err) {
			writer.writeError(res, err, 400);
		}
	}
}