import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../../../../lib/prisma'; // Ensure this points to your Prisma instance
import { NextApiRequest, NextApiResponse } from 'next';
// import { Session } from '@kinde-oss/kinde-auth-nextjs/server';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    organizationId: string;
    role: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getKindeServerSession(req);
    const userClaim = await session.getClaim('user');
    const user = userClaim ? (userClaim as unknown as User) : null;

    if (!session || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, email, firstName, lastName, organizationId, role } = user;

    try {
        // Upsert the user into the database
        const user = await prisma.user.upsert({
            where: { email },
            update: { firstName, lastName, organizationId, role },
            create: {
                id,
                email,
                firstName,
                lastName,
                organizationId,
                role,
            },
        });

        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error syncing user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
