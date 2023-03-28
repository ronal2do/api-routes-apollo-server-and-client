import { Fragment, useState } from 'react';
import {
  Container,
  Box,
  chakra,
  Flex,
  Stack,
  VStack,
  HStack,
  Grid,
  Icon,
  Divider,
  Link,
  useColorModeValue,
  Button,
  Text
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { IconType } from 'react-icons';
import { FaRegEye, FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { QuestionModal } from './modal';
import { IQuestions } from '../hooks/graphql/useGetQuestions';
import { Question } from '@prisma/client';

export const QuestionsPreview = ({ questions }: { questions: IQuestions }) => {
  return (
    <Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <Flex justify="left" mb={3}>
        <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
          Questions
        </chakra.h3>
      </Flex>
      <VStack border="1px solid" borderColor="gray.400" rounded="md" overflow="hidden" spacing={0}>
        {questions?.edges?.map((edge, index) => {
          const { node: question } = edge;
          return (
          <Fragment key={index}>
            <Grid
              templateRows={{ base: 'auto auto', md: 'auto' }}
              w="100%"
              templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
              p={{ base: 2, sm: 4 }}
              gap={3}
              alignItems="center"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            >
              <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                <>
                  <chakra.h3 noOfLines={1} fontWeight="bold" fontSize="lg">
                    {question.label}
                  </chakra.h3>
                  <Text
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                     {`Published: ${question.createdAt}`}
                  </Text>
                </>
              </Box>
              <HStack
                spacing={{ base: 0, sm: 3 }}
                alignItems="center"
                fontWeight="medium"
                fontSize={{ base: 'xs', sm: 'sm' }}
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                <QuestionStat icon={FaRegCheckCircle} value={question?.metadata?.hits || 0} />
                <QuestionStat icon={FaRegTimesCircle} value={question?.metadata?.misses || 0} />
                <QuestionStat icon={FaRegEye} value={question?.metadata?.views || 0} />
              </HStack>
              <Stack
                spacing={2}
                direction="row"
                fontSize={{ base: 'sm', sm: 'md' }}
                justifySelf="flex-end"
                alignItems="center"
              >
               
              <QuestionSettingLink key={index} label="Manage" question={question}/>
               
              </Stack>
            </Grid>
            {questions.count - 1 !== index && <Divider m={0} />}
          </Fragment>
        )})}
      </VStack>
    </Container>
  );
};

const QuestionStat = ({ icon, value }: { icon: IconType; value: number }) => {
  return (
    <Flex p={1} alignItems="center">
      <Icon as={icon} w={5} h={5} mr={2} />
      <chakra.span> {value} </chakra.span>
    </Flex>
  );
};

const QuestionSettingLink = ({ label, question }: { label: string, question: Question }) => {
  const [isOpen, setIsOpen] = useState(false)
  const _onOpen = () => setIsOpen(true)
  const _onClose = () => setIsOpen(false)

  return (
    <>
      <Button
        as={Link}
        _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
        p={1}
        rounded="md"
        onClick={() => _onOpen()}
      >
        {label}
      </Button>
      <QuestionModal isOpen={isOpen} onClose={_onClose} question={question}/>
    </>
  );
};
