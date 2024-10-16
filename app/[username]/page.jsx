import { notFound } from "next/navigation";
import { getUserByUsername } from '../../actions/users';

import UserProfile from './UserProfile';

export async function generateMetaDataForUserName({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name}'s Profile | Schedulrr`,
    description: `Book an event with ${user.name}. View available events and schedules.`,
  };
}

const Userpage = async ({ params }) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  // Render the Client Component and pass the user data
  return <UserProfile user={user} params={params} />;
};

export default Userpage;
