import UserRepository from "../domain/user/UserRepository";
import AuthService from "../services/auth/Auth.Service";
import bcrypt from 'bcrypt';

export default class AuthController {
    
    public static async login(req: any, res: any) {
        const { email, password } = req.body;
        const user = await UserRepository.findByEmail(email);

        if(!email || email !== user?.email) return res.status(402).json({ error: "Email or password invalid!" });

        const passwordReal: boolean = bcrypt.compareSync(password, String(user?.password));

        if(!passwordReal) return res.status(402).json({ error: "Email or password invalid!" });

        try {
            const id: string = String(user?.id);
            const token: string = await AuthService.createToken(id);
            res.status(200).json({ msg: "Authenticantion Sucess!", token });
        } catch(error) {
            res.status(404).json({ error: error });
        }
    }
}
