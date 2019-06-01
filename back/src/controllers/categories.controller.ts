import http from 'http';
import url from 'url';

import Category from '../models/category.model';

import { BaseController } from './base.controller';

import * as reader from '../utils/reader.util';
import * as writer from '../utils/writer.util';

export class CategoriesController extends BaseController {
	constructor() {
		super(Category);
	}
}
