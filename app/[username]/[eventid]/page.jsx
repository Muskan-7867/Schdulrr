import { notFound } from "next/navigation"
import { getUserByUsername } from "../../../actions/users"

const Userpage = async({params}) => {
  const user = await getUserByUsername(params.username)
  if(!user){
    notFound();
  }
  
  return (
    <div>
      Userpage
    </div>
  )
}

export default Userpage
