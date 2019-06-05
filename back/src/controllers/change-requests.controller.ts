import http from 'http';
import url from 'url';

import ChangeRequest from '../models/change-request.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class ChangeRequestsController extends BaseController {
	constructor() {
		super(ChangeRequest);
	}
}
