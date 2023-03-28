import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react"
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
        <Text>no users found</Text>
      ) : (
        <Stack>
          {users.map(user => (
            <Stack direction="row" 
            align="center" spacing={4} py={4} px={4} borderRadius={4} key={user.id}
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              <Avatar
                src={user.image || ''}
                name={user.name || ''}
              />
              <Flex justify="space-between" width="100%">
                <Text color="whiteAlpha.700">{user.name}</Text>
                <Button bg="brand.100" _hover={{ bg: 'brand.100' }} 
                onClick={() => {
                  router.push({ pathname: "/dashboard/user", query: { id: user.id } });
                  onClose()
                }
                }>Select</Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  )
}
