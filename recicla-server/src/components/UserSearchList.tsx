import { User } from "@prisma/client"
import { useRouter } from "next/router"

interface UserSearchListProps {
  users: Array<Partial<User>>
  onClose: () => void;
}

export const UserSearchList: React.FC<UserSearchListProps> = ({ users, onClose }) => {
  const router = useRouter()
  return (
    <>
      {users.length === 0 ? (
        <p>no users found</p>
      ) : (
        <div>
          {users.map(user => (
            <div className="row items-center py-4 px-4 rounded-sm"  key={user.id}
             
            >
              
              <div className="justify-between w-full">
                <p color="whiteAlpha.700">{user.name}</p>
                <button 
                onClick={() => {
                  router.push({ pathname: "/dashboard/user", query: { id: user.id } });
                  onClose()
                }
                }>Select</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
