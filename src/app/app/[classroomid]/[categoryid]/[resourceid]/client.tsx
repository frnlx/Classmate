'use client'

import { Drawer, useDisclosure } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";

const ResourcePageClient = (p:{children: ReactNode}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      
    </Drawer>
  );
}
 
export default ResourcePageClient;