import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UpdatePasswordRequest {
    email: string,
    password: string
}

class UpdatePasswordService {
    async execute({email, password}: UpdatePasswordRequest){
        const passwordHash = await hash(password, 8)
        const updateUser = await prismaClient.user.updateMany({
            where: {
                email: email,
            },
            data: {
                password: passwordHash,
            }
        })

        return updateUser;
    }
}


export default UpdatePasswordService;