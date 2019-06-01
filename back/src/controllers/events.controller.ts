import http from 'http';
import url from 'url';

import Event from '../models/event.model';

import { BaseController } from './base.controller';

import * as emailSender from '../services/email-sender.service';
import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class EventsController extends BaseController {
	constructor() {
		super(Event);
	}

	public sendMail(): void {
		emailSender.sendEmail('ursaciuc.adrian27@gmail.com', 'da', 'heeey');
	}
}
