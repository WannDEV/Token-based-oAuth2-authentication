import jwt from "jsonwebtoken";
import { User } from "../db/models";

const UserController = {
  async getUser(req, res, next) {
    var decoded = jwt.decode(req.cookies.accessToken);
    const id = decoded.id;

    const user = await User.findOne({ where: { id } });

    if (user) {
      return res.status(200).send(user);
    } else {
      return res
        .status(404)
        .json({ message: "Could not find user in the database" });
    }
  },
};

export default UserController;
