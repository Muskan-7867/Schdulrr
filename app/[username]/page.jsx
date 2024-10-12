// app/[username]/page.jsx
import { notFound } from "next/navigation";
import { getUserByUsername } from '../../actions/users';
import   UserProfile  from './UserProfile'; 

const Userpage = async ({ params }) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  // Render the Client Component and pass the user data
  return <UserProfile user={user} params={params} />;
};

export default Userpage;
