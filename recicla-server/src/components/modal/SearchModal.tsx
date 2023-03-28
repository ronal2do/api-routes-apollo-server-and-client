import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Input, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react";
import { useSearchUser } from "../../hooks";
import { UserSearchList } from "../UserSearchList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<ModalProps> = ({isOpen, onClose}) => {
  const [name, setName] = useState('')
  const { searchUsers, data, loading, error } = useSearchUser()

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { name } })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'gray.900')} pb={4}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <Stack>
              <Input placeholder="Enter an name" onChange={(event) => setName(event.target.value)}/>
              <Button aria-label="search" type="submit" disabled={!name} isLoading={loading}>
                Search
              </Button>
            </Stack>
          </form>
          { data?.searchUsers && <UserSearchList users={data.searchUsers} onClose={onClose}/> }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}