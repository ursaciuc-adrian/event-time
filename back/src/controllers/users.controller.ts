import http from 'http';
import url from 'url';

import User from '../models/user.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class UsersController extends BaseController {
	constructor() {
		super(User);
	}
}
