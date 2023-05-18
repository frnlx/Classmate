'use client'

import { Plus } from "@phosphor-icons/react"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import ResourceAddForm from "./ResourceAddForm"

const AddPostButton = ({ sectionid, categoryid, onAdd }: { sectionid: string, categoryid: string, onAdd: () => void }) => {
  // const [isOpen, setIsOpen] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button type='button' onClick={onOpen}
        className="p-2 flex flex-row items-center gap-2 hover:bg-slate-700/25 text-slate-500  hover:text-slate-300 w-full rounded-md"
      >
        <span className="p-1 bg-slate-700 rounded-md"> 
          <Plus weight="bold" />
        </span>
        <span className="text-sm font-semibold"> 
          Add a thing
        </span>
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              Fill out the form below to create a new post.
            </div>
            <ResourceAddForm
              sectionid={sectionid}
              categoryid={categoryid}
              onAdd={() => {
                onClose()
                onAdd()
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default AddPostButton;