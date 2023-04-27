'use client'

import { useClassList, useSelectedClass, useUpdateSelectedClass } from "@/component/app/context/ClassContext";
import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

const SlugHandler = (p: { children: ReactNode, slug: string[] }) => {
  
  const slugClassroomID = p.slug ? p.slug[0] : null;

  // console.log(p.slug)
  const classList = useClassList(); 
  const updateSelectedClass = useUpdateSelectedClass(); 

  useEffect(() => {
    console.log(slugClassroomID)
    
    // if (slugClassroomID === '%40me') {
    //   // Slug classroom id is '@me' -> Return to home
    //   console.log("A")
    //   updateSelectedClass(0)
    // }

    // else if (slugClassroomID === 'join') {
    //   console.log("Hey Join pls")
    //   setTimeout(onOpen, 400)
    // }

    // else if (slugClassroomID !== '%40me') {
    //   console.log("C")
    //   const classroom = classList.filter(classroom => classroom.data!.id === slugClassroomID ? true : false)[0]
    //   if (classroom) {
    //     // Found a class in user's class list
    //     updateSelectedClass(classroom.order)
    //   } else {
    //     // Class not found in user's class.
    //     // -> try to find in db?

    //     // -> Else return to home
    //     updateSelectedClass(0)
    //   }
    // }

  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        Hello!
        <ModalCloseButton />
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Join
          </Button>
          <Button variant='ghost'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    {p.children}
  </>;
}
 
export default SlugHandler;