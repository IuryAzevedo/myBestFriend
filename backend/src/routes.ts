import { Router } from "express";

//import rotas registro e login do usuário
import { CreateUserController } from './controllers/user/CreateUserController';
import { LoginUserController } from './controllers/user/LoginUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

//rota de verificação se o usuário está logado "middleware"
import { isAuthAtheticated } from './services/middlewares/isAuthAuthenticated';

// rota de cadastro de pet
import { CadastroPetsController } from "./controllers/pet/CadastroPetsController";

//rotas rações
import { ListaRacaoController } from "./controllers/racao/ListaRacaoController";
import { AddRacaoController } from "./controllers/racao/AddRacaoController";
import { ListaPetsController } from "./controllers/pet/ListaPetsController";
import { DeleteRacaoController } from "./controllers/racao/DeleteRacaoController";
import UpdatePasswordController from "./controllers/user/UpdatePasswordController";

//UPLOAD CONFIG FILES
import uploadConfig from './config/multer'
import multer from "multer";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp")); 

//---- ROTAS USERS ----
router.post('/users',  upload.single('photo'), new CreateUserController().handle);
router.post('/session', new LoginUserController().handle);
router.get('/userinfo', isAuthAtheticated, new DetailUserController().handle);
router.put('/updatepass', isAuthAtheticated, new UpdatePasswordController().handle);


// ---- ROTAS PETS ----
router.post('/addpets', isAuthAtheticated, new CadastroPetsController().handle);
router.post('/listapets', isAuthAtheticated, new ListaPetsController().handle);


// ---- ROTAS RACOES ---- 
router.post('/addracao', isAuthAtheticated, new AddRacaoController().handle);
router.post('/racoes', isAuthAtheticated, new ListaRacaoController().handle);
router.delete('/deleteR/:itemId', isAuthAtheticated, new DeleteRacaoController().handle);


export { router };