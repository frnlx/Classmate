import {  AlertStatus, ThemeTypings, useToast } from "@chakra-ui/react";

// Standardize the 'duration' and 'isClosable' properties of the toast.

export default function useAppToast() {
  const toast = useToast();
  return (title: string, status: AlertStatus, color?: ThemeTypings["colorSchemes"]) => {
    toast({
      description: title,
      status: status,
      duration: 2500,
      isClosable: true,
      colorScheme: color ? color : undefined,
    })
  }
}