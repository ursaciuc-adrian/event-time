// export class CrudService {
// 	public static async add(Schema, object): Promise<any> {
// 		try {
// 			const newObj = new Schema(object);
// 			const saveObj = await newObj.save();

// 			return saveObj;
// 		} catch (err) {
// 			throw err;
// 		}
// 	}

// 	public static async get(Schema): Promise<any> {
// 		try {
// 			const obj = await Schema.find({});

// 			writer.writeSuccess(res, obj);
// 		} catch (err) {
// 			writer.writeError(res, err, 400);
// 		}
// 	}

// 	public static async delete(Schema, object): Promise<any> {
// 		const queryData = url.parse(req.url, true).query;

// 		try {
// 			const deleteObj = await Schema.remove({ _id: queryData.id });

// 			writer.writeSuccess(res, deleteObj);
// 		} catch (err) {
// 			writer.writeError(res, err, 400);
// 		}
// 	}

// 	public static async update(Schema, object): Promise<any> {
// 		const queryData = url.parse(req.url, true).query;

// 		try {
// 			const newObj = new Schema(await reader.readJson(req));
// 			const updateObj = await this.Schema.update({ _id: queryData.id }, newObj);

// 			writer.writeSuccess(res, updateObj);
// 		} catch (err) {
// 			writer.writeError(res, err, 400);
// 		}
// 	}
// }