import { chakra, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useColorModeValue, Divider, Text, Flex, ListItem, ListIcon, List } from "@chakra-ui/react"
import { Question } from "@prisma/client";
import { MdCheckCircle } from 'react-icons/md'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question
}

export const QuestionModal: React.FC<ModalProps> = ({isOpen, onClose, question}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'gray.900')} pb={4}>
        <ModalHeader>{question.label}
        <chakra.p
          fontWeight="medium"
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          Published: {question.createdAt}
        </chakra.p>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {question.introduction}
          </Text>
          <Divider orientation='horizontal' />
          <Flex>
          <List spacing={3}>
            {question.answers.map((label, index) => {
              return (
                <ListItem key={index}>
                  {label}
                  {question.correctAnswer === index + 1 && <ListIcon as={MdCheckCircle} color='green.500' />}
                </ListItem>
              )
            })}
            </List>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}