import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { query } from '../app/api/_apolloClient/apolloClientServerSide';
import { GET_USER_WITH_EMAIL } from '../app/api/graphql/queries/users';
import { User } from '../constants/types/types';

export const getLoggedInUser = async (): Promise<User> => {
  const { getUser } = getKindeServerSession();

  const kindeUserObj = await getUser();

  if (!kindeUserObj) {
    return {} as User;
  }

  try {
    const {
      data: { me },
    } = await query({
      fetchPolicy: 'cache-first',
      query: GET_USER_WITH_EMAIL,
      variables: { email: kindeUserObj?.email },
    });

    return me;
  } catch (error) {
    return {} as User;
  }
};
