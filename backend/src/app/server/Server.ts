import express, { Express } from 'express';
import cors from 'cors'

import USERROUTER from '../routers/UserRouter';
import AUTHROUTER from '../routers/AuthRouter'
import POSTROUTER from '../routers/PostRouter';

const APP: Express = express();

APP.use(express.json());
APP.use(AUTHROUTER);
APP.use(USERROUTER);
APP.use(POSTROUTER);

APP.use((req: any, res: any, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    APP.use(cors());
    next();
})

const PORT: string | number =  process.env.PORT || 2345 ;

APP.listen(PORT, () => console.log(`Server it's running -> http://localhost:${PORT}`));

export { APP }
