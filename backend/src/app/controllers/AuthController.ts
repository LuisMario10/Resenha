import UserRepository from "../domain/user/UserRepository";
import AuthService from "../services/auth/AuthService";
import bcrypt from 'bcrypt';

export default class AuthController {
    
    public static async login(req: any, res: any) {
        const { email, password } = req.body;
        const user = await UserRepository.findByEmail(email);

        if(!email || email !== user?.email) return res.status(404).json({ error: "Email or password invalid!" });

        const passwordReal: boolean = bcrypt.compareSync(password, String(user?.password));

        if(!passwordReal) return res.status(404).json({ error: "Email or password invalid!" });

        try {
            const id: string = String(user?.id);
            const token: string = await AuthService.createToken(id);
            res.cookie('token', token, { maxAge: 6000, httpOnly: true });
            return res.status(200).json({ msg: "Authenticantion Sucess!", token });
        } catch(error) {
            res.status(500).json({ error: error });
        }
    }
}
