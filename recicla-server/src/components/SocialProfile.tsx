import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

interface SocialProfileProps {
  user: User
}

function generateUserName(fullName: string): string {
  const namePieces = fullName.split(" ");
  const name = namePieces[0];
  const surname = namePieces[namePieces.length - 1];

  const userName = `@${name.toLowerCase()}_${surname.toLowerCase()}`;
  return userName;
}

export function SocialProfile({ user }: SocialProfileProps) {
  return (
    <Center py={6}>
      <Box
        // maxW={'320px'}
        w={'420px'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={12}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={user?.image || ""}
          name={user?.name || ""}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {user.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {generateUserName(user?.name as string)}
        </Text>
        {/* <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          Actress, musician, songwriter and artist. PM for work inquires or{' '}
          <Link href={'#'} color={'blue.400'}>
            #tag
          </Link>{' '}
          me in your posts
        </Text> */}
        <StatGroup mt={6}>
          <Stat>
            <StatLabel>Pontos</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type='increase' />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Respostas</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type='decrease' />
              9.05%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Cupons</StatLabel>
            <StatNumber>12</StatNumber>
          </Stat>
        </StatGroup>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}