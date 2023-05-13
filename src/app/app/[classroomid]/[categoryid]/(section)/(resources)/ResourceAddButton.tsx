'use client'

import { Dialog } from "@headlessui/react"
import { Plus, X } from "@phosphor-icons/react"
import { useState } from "react"
import ResourceAddForm from "./ResourceAddForm"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const AddPostButton = ({ sectionid, categoryid, onAdd }: { sectionid: string, categoryid: string, onAdd: () => void }) => {
  // const [isOpen, setIsOpen] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button type='button' onClick={onOpen}
        className="p-2 flex flex-row items-center gap-2 hover:bg-slate-700/25 text-slate-500  hover:text-slate-300 w-full rounded-md"
      >
      {/* <button type='button' onClick={() => setIsOpen(true)}
        className="p-2 flex flex-row items-center gap-2 hover:bg-slate-700/25 text-slate-500  hover:text-slate-300 w-full rounded-md"
      > */}
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


          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto w-full max-w-2xl min-w-min h-4/6 rounded bg-zinc-900 p-8 flex flex-col gap-6">

            <div className="absolute right-0 top-0 p-4">
              <button type="button" className="text-xl rounded-xl hover:bg-gray-800 p-2" onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <Dialog.Title className='m-0 text-xl'>Create New Post</Dialog.Title>
              <Dialog.Description className='text-sm text-slate-300'>
                Fill out the form below to create a new post.
              </Dialog.Description>
            </div>
            
            <ResourceAddForm
              sectionid={sectionid}
              categoryid={categoryid}
              onAdd={() => {
                setIsOpen(false)
                onAdd()
              }}
            />
          </Dialog.Panel>
        </div>
      </Dialog> */}
    </>
  );
}
export default AddPostButton;