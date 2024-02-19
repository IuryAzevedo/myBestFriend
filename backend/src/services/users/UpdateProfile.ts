import prismaClient from "../../prisma"

interface UserRequest {
    nome: string,
    email: string,
    photo?: string
}


class UpdateProfileService {
    async execute({nome, email, photo}: UserRequest){
        const updateProfile = await prismaClient.user.updateMany({
            where: {
                email: email,
            },
            data: {
                nome: nome,
                email: email,
                ...(photo && { photo })
            }
        })
        return updateProfile;
    }
}


export default UpdateProfileService