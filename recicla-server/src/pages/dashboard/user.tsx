import {
  Container, SimpleGrid, Stack, Text, useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Milestones, DashboardLayout, SocialProfile } from "../../components";
import { useGetUser } from "../../hooks";

const User = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id || typeof id !== "string") return (
    <Text>User not found</Text>
  )
  
  const { data, loading, error } = useGetUser(id);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data?.user ? (
        <Container maxW={'80%'} py={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <SocialProfile user={data.user}/>
            <Stack spacing={4}>
              <Text
                textTransform={'uppercase'}
                color={'blue.400'}
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
                rounded={'md'}>
                Activity
              </Text>
              <Milestones/>
            </Stack>
          </SimpleGrid>
        </Container>
      ) : (
        <Text>User not found</Text>
      )}
    </>
  );
}

User.getLayout = function getLayout(page: ReactNode) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default User
