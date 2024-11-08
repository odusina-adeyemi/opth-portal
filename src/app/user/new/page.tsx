import UserForm from '../_components/UserForm';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';

const AddUserPage = async () => {
  const user = await getLoggedInUser();

  return <UserForm loggedInUser={user} />;
};

export default AddUserPage;
