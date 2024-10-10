import jwt from 'jsonwebtoken'

export default class AuthService { 
    public static async createToken(id: string) {
        const secret: any = process.env.SECRET_JWT;
        return jwt.sign(id, secret, { expiresIn: 500 });
    }

    public static tokenValidate(req: any, res: any, next: any) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        
        if(!token) return res.status(401).json({ error: "Acess denied!" });
        
        res.json({ token });
        try {
            const secret: any = process.env.SECRET_JWT;
            jwt.verify(token, secret, (error: any, decoded: any) => {
                if(error) return res.status(401).json({ msg: "Acess Denied!" });

                req.id = decoded?.id;
                next();
            });
            //res.status(200).json({ msg: "Acess granted!" });
            //next();
            
        } catch(error) {
            res.status(400).json({ error : "Token Invalid!" });
        }
    }
}