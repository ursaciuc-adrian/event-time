import http from 'http';
import url from 'url';

import Event from '../models/event.model';

import { BaseController } from './base.controller';

import * as auth from '../services/auth.service';
import * as emailSender from '../services/email-sender.service';
import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class EventsController extends BaseController {
	constructor() {
		super(Event);
	}

	public async sendMail(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
		if (await auth.isInRole(req.headers.authorization, 'Admin')) {
			emailSender.sendEmail('ursaciuc.adrian27@gmail.com', 'da', 'heeey');

			writer.writeJson(res, { status: 'ok' });
		}

		writer.writeJson(res, { error: 'You don\'t have the right to be here.' });
	}
}
