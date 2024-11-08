import React from 'react';
import UserForm from '../../_components/UserForm';
import { fetchUser } from '../../../api/graphql/queries/users';
import { getLoggedInUser } from '../../../../lib/getLoggedInUser';

const EditUserPage = async ({ params }: { params: { id: string } }) => {
  const loggedInUser = await getLoggedInUser();

  const user = await fetchUser(params.id);

  return <UserForm loggedInUser={loggedInUser} user={user} />;
};

export default EditUserPage;
