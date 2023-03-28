import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { getSession, signOut, useSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { ROUTES } from '../config';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export function LandpageHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  const session = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {session.data?.user ?
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                  >
                    <Avatar
                      size={'sm'}
                      src={session.data.user.image || ''}
                      name={session.data.user.name || ''}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={session.data.user.image || ''}
                        name={session.data.user.name || ''}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{session.data.user.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem as='a' href="/dashboard">Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={ () => signOut() }>Logout</MenuItem>
                  </MenuList>
                </Menu> 
              : <Menu>
                  <MenuButton
                    rounded={'full'}
                    cursor={'pointer'}
                    as="a"
                    href={ROUTES.signin}
                  >
                      Entrar
                  </MenuButton>
                </Menu>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: ROUTES.signin,
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    }
  }
}
