import { UsersController } from "../controllers/users.controller";

import http from "http";
import url from "url";

export class UserRoutes {
    public usersController: UsersController = new UsersController();

    public async route(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): Promise<void> {
        const reqUrl = url.parse(req.url, true);

        if (reqUrl.pathname === "/users" && req.method === "POST") {
            await this.usersController.add(req, res);
        }

        if (reqUrl.pathname === "/users" && req.method === "GET") {
            await this.usersController.get(req, res);
        }

    }
}
