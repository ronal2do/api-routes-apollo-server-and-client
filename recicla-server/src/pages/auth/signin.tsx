import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Heading,
  HStack,
  Icon,
  useToast
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Input } from "../../components";
import { ROUTES } from "../../config";

const SingIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  const toast = useToast()

  const _signIn = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(email, password)
    if (!email || !password) return;
    // todo
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        fallbackUrl: '/'
      })

      setEmail('')
      setPassword('')

      toast({
        title: 'Added to the subscribe list.',
        description: "Logado",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Enter your email and password to sign in
            </Text>
            <FormControl>
              <Input
                label="Email"
                type='email'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                placeholder='Your email adress'
              />
              <Input
                label='Password'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                placeholder='Your password'
              />
              <FormControl display='flex' alignItems='center'>
                <Switch id='remember-login' colorScheme='teal' me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  ms='1'
                  fontWeight='normal'>
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                fontSize='10px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                isDisabled={!email || !password}
                onClick={(event) => _signIn(event)}
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}>
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link href={ROUTES.singup} color={titleColor} ms='5px' fontWeight='bold'>
                  Sign Up
                </Link>
              </Text>
            </Flex>
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              Register With
            </Text>
            <HStack spacing='15px' justify='center' mb='22px'>
              <Flex
                justify='center'
                align='center'
                w='75px'
                h='75px'
                borderRadius='15px'
                border='1px solid lightgray'
                cursor='pointer'
                transition='all .25s ease'
                _hover={{ filter: "brightness(120%)", bg: bgIcons }}>
                <Link href='#'>
                  <Icon
                    as={FaGoogle}
                    w='30px'
                    h='30px'
                    onClick={() => signIn("google")}
                    _hover={{ filter: "brightness(120%)" }}
                  />
                </Link>
              </Flex>
            </HStack>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            bgImage={"https://demos.creative-tim.com/purity-ui-dashboard/static/media/signInImage.eeb0c777f5867442d1a2.png"}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  console.log('-== session', session)
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
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

export default SingIn;
