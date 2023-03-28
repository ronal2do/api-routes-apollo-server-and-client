import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ROUTES } from '../../config';
import { useRegisterUserWithEmail } from '../../hooks';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const toast = useToast()

  const { registerUserWithEmail, data, loading, error } = useRegisterUserWithEmail()

  const _signUp = async () => {
    if (!name || !email || !password) {
      toast({
        title: 'Added to the subscribe list.',
        description: "We've created your account for you.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }

    const variables = {
      name,
      email,
      password
    }

    try {
      registerUserWithEmail({
        variables
      })

      if (data?.registerUserWithEmail.error || error) {
        toast({
          title: 'Email ja registrado',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
 
      toast({
        title: 'Added to the subscribe list.',
        description: "Registrado",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Added to the subscribe list.',
        description: error.messsage,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setEmail('')
      setName('')
      setPassword('')
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text"/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input value={password} type={showPassword ? 'text' : 'password'} onChange={(event) => setPassword(event.target.value)}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                isLoading={loading}
                isDisabled={!name || !email || !password}
                onClick={() => _signUp()}
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link href={ROUTES.signin} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}