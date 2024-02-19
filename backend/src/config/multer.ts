import crypto from "crypto";
import multer from "multer";
import { extname, resolve } from 'path';
import prismaClient from "../prisma";

export default {
    upload(folder: string){
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;
                    return callback(null, fileName);
                }
            }),
            fileFilter: (request, file, callback) => {
                const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
                if (allowedMimes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'));
                }
            },
            // Middleware que será executado após o upload
            async fileHandler(request, file, callback) {
                const imagePath = resolve(__dirname, '..', '..', folder, file.filename);
                try {
                    // Salvar o caminho da imagem no banco de dados
                    const savedImage = await prismaClient.image.create({
                        data: {
                            url: imagePath,
                            user: {
                                connect: { id: request.user.id } // Assumindo que o usuário está autenticado e seu ID está disponível em request.user.id
                            }
                        }
                    });
                    callback(null, { imagePath: savedImage.url }); // Retornando o caminho da imagem após o upload bem-sucedido
                } catch (error) {
                    callback(error);
                }
            }
        };
    }
};
