

import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { NotificationIcon } from './Icons';
import { useCreateNewsletter } from '../hooks/graphql/useCreateNewsletter';

export const SubscribeToNewsletter: React.FunctionComponent<{}> = () => {
  const [inputEmail, setInputEmail] = useState('')
  const {createNewsletterEntry, data, loading, error } = useCreateNewsletter()
  const toast = useToast()

  const onSubmit = async () => {
    if (!inputEmail) return;
    try {
      createNewsletterEntry({
        variables: {
          email: inputEmail
        }
      })

      if (data?.createNewsletterEntry.error || error) {
        toast({
          title: 'Added to the subscribe list.',
          description: "We've created your account for you.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return {
          error: "algo deu errado"
        }
      }

      toast({
        title: 'Added to the subscribe list.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      setInputEmail('')
    } catch (error) {
      console.log("on submit error", error)
    }
  }

  return (
    <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
      py={12}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}>
        <Icon as={NotificationIcon} w={24} h={24} />
        <Stack align={'center'} spacing={2}>
          <Heading
            textTransform={'uppercase'}
            fontSize={'3xl'}
            color={useColorModeValue('gray.800', 'gray.200')}>
            Subscribe
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'}>
            Subscribe to our newsletter & stay up to date!
          </Text>
        </Stack>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <Input
            type={'text'}
            placeholder={'john@doe.net'}
            color={useColorModeValue('gray.800', 'gray.200')}
            bg={useColorModeValue('gray.100', 'gray.600')}
            rounded={'full'}
            border={0}
            value={inputEmail}
            onChange={(event) => setInputEmail(event.target.value)}
            _focus={{
              bg: useColorModeValue('gray.200', 'gray.800'),
              outline: 'none',
            }}
          />
          <Button
            bg={'blue.400'}
            rounded={'full'}
            color={'white'}
            flex={'1 0 auto'}
            isLoading={loading}
            onClick={onSubmit}
            _hover={{ bg: 'blue.500' }}
            _focus={{ bg: 'blue.500' }}>
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
};
