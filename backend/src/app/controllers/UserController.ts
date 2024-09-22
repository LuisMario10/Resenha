import UserModel from "../domain/user/UserModel";
import UserRepository from "../domain/user/UserRepository";

export default class UserController {

    public static async getAll(_: any, res: any) {
        try {
            const result = await UserRepository.findAll();
            return res.status(200).json({ result: result});
        } catch {
            return res.status(500).json({err: "Server internal error"});
        }
    }

    public static async getById(req: any, res: any) {
        try {
            const id: string = req.body.id;
            const result = await UserRepository.findById(id);
            return res.status(200).json(result);
        } catch(err) {
            return res.status(500).json({err: "Server internal error"});
        }
    }

    public static async getByEmail(req: any, res: any) {
        try {
            const result = await UserRepository.findByEmail(req.body.email);
            res.status(200).json({ result: result });
        } catch(err) {
            return res.status(500).json({err: "Server internal error"});
        }
    }

    public static async create(req: any, res: any) {
        try {
            const { username, email, password, passwordConfirm } = req.body;

            if(username == null || email == null) return res.status(402).json({ error: "username or email is can't is null" });

            if(password == null || passwordConfirm == null) return res.status(402).json({ error: "Password or/and Password Confirm can't is null!" });

            if(password !== passwordConfirm) return res.status(402).json({error: "Password and Password confirm are diferents"});

            if(password.lenght > 8) return res.status(402).json({ error: "Password lenght is need 8 characters" });

            const user = new UserModel(username, email, password);
            const result = await UserRepository.create(user);
            return res.status(201).json({ msg: "User was resgisted", result: result });
            
        } catch(err) {
            return res.status(500).json({err: "Server internal error"});
        }
    }

    public static async update(req: any, res: any) {
        try {
            const  { lastEmail, username, newEmail, password } = req.body;
            const newDataUser: UserModel = new UserModel(username, newEmail, password);
            const result = await UserRepository.update(lastEmail, newDataUser);
            return res.status(201).json({msg: "Updated Sucess!"});
        } catch {
            return res.status(500).json({err: "Server internal error"});
        }
    }

    public static async delete(req: any, res: any) {    
       try {
            const email = req.body.email;
            await UserRepository.delete(email);
            return res.status(201).json({ msg: "User was deleted" });
        } catch {
            return res.status(500).json({ err: "User not deleted!" });
        }
    }
}