import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import prisma from '../../../../lib/prisma';
import { authDirective } from './directives/authDirective';
// typeDefs
import { typeDef as Clinic } from './typeDefs/clinic.schema';
import { typeDef as File } from './typeDefs/file.schema';
import { typeDef as InsuranceCompany } from './typeDefs/insuranceCompany.schema';
import { typeDef as Organization } from './typeDefs/organization.schema';
import { typeDef as Patient } from './typeDefs/patient.schema';
import { typeDef as PatientContact } from './typeDefs/patientContact.schema';
import { typeDef as PreOperation } from './typeDefs/preOperation.schema';
import { typeDef as Provider } from './typeDefs/provider.schema';
import { typeDef as ProviderClinic } from './typeDefs/providerClinic.schema';
import { typeDef as ProviderStatus } from './typeDefs/providerStatus.schema';
import { typeDef as PostOperation } from './typeDefs/postOperation.schema';
import { typeDef as User } from './typeDefs/user.schema';
// resolvers
import { clinicResolver } from './resolvers/clinic.resolvers';
import { fileResolver } from './resolvers/file.resolvers';
import { insuranceCompanyResolver } from './resolvers/insuranceCompany.resolvers';
import { patientContactResolver } from './resolvers/patientContact.resolvers';
import { organizationResolver } from './resolvers/organization.resolvers';
import { patientResolver } from './resolvers/patient.resolvers';
import { preOperationResolver } from './resolvers/preOperation.resolvers';
import { providerResolver } from './resolvers/provider.resolvers';
import { providerClinicResolver } from './resolvers/providerClinic.resolvers';
import { providerStatusResolver } from './resolvers/providerStatus.resolvers';
import { postOperationResolver } from './resolvers/postOperation.resolvers';
import { userResolver } from './resolvers/user.resolvers';

const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective();

let schema = makeExecutableSchema({
  typeDefs: [
    authDirectiveTypeDefs,
    Clinic,
    File,
    InsuranceCompany,
    Organization,
    Patient,
    PatientContact,
    PreOperation,
    ProviderClinic,
    ProviderStatus,
    PostOperation,
    Provider,
    User,
  ],
  resolvers: [
    clinicResolver,
    fileResolver,
    insuranceCompanyResolver,
    organizationResolver,
    patientContactResolver,
    patientResolver,
    preOperationResolver,
    providerClinicResolver,
    providerStatusResolver,
    postOperationResolver,
    providerResolver,
    userResolver,
  ],
});

schema = authDirectiveTransformer(schema);

const apolloServer = new ApolloServer({
  schema,
  status400ForVariableCoercionErrors: true,
});

const context = async (req: NextRequest, res: any) => {
  const email = req.headers.get('x-user-email') ?? '';

  const user = await prisma.user.findUnique({
    where: { email },
    include: { organization: true },
  });

  return {
    prisma,
    req,
    res,
    user,
  };
};

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context,
});

export { handler as GET, handler as OPTIONS, handler as POST };
