
import { PrismaClient, Prisma, RoleName } from "@prisma/client";


const prisma = new PrismaClient();


const roleData : Prisma.RoleCreateInput[] = [

    {
        name: RoleName.LAND_MANAGER ,
        description: 'Land Manager Role'
        
    },
    {
        name: RoleName.SYSTEM_ADMIN,
        description: 'System Admin Role'
    },
    {
        name: RoleName.STS_MANAGER,
        description: 'STS Manager Role'
    },
    {
        name: RoleName.UNASSIGNED,
        description: 'Unassigned Role'
    }
]

async function main() {
    console.log('Seeding roles...')
    for (const role of roleData) {
        const newRole = await prisma.role.create({
            data: role
        })
        console.log(newRole)
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })




