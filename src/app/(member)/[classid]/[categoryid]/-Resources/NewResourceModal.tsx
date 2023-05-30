import { useRoom } from "@/app/(member)/-Navbar/Navbar";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { FieldErrors, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { useState } from "react";

export default function NewResourceModal(p: {
  isOpen: boolean,
  onClose: () => void
}) {

  const [submitLoading, setSubmitLoading] = useState(false);

  const room = useRoom()
  const rhf = useForm<NewResourceInputType>();
  rhf.register
  const onSubmit: SubmitHandler<NewResourceInputType> = async (data) => {
    // submit to axios
  }
  
  return (
    <Modal isOpen={p.isOpen} onClose={p.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Post</ModalHeader>
        <ModalCloseButton disabled={!submitLoading} />
        <ModalBody>
          <div>Fill out the form below to create a new post.</div>
        </ModalBody>
        <form
          onSubmit={rhf.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <FormInputResourceTitle
            errors={rhf.formState.errors}
            register={rhf.register}
          />
          <FormInputResourceContent
            errors={rhf.formState.errors}
            register={rhf.register}
          />
        </form>
        <ModalFooter>
          <Button
            className="flex-shrink-0"
            type="submit"
            variant='solid'
            colorScheme="blue"
            isLoading={submitLoading}
          >Create New Post</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}


type NewResourceInputType = {
  title: string,
  content: string,
};



function FormInputResourceTitle({ errors, register }: {
  errors: FieldErrors<NewResourceInputType>
  register: UseFormRegister<NewResourceInputType>
}) {
  return (
      <FormControl isInvalid={errors.title ? true : false} className="flex-shrink-0">
        <FormLabel className="text-xs uppercase text-slate-400" htmlFor="title">Title <div className="text-red-400 normal-case font-medium text-xs inline"> {errors.title && ' - ' + errors.title?.message}</div></FormLabel>
        <Input
          id='title'
          size='sm'
          placeholder='Post Title'
          {...register('title', {
            required: 'Resource Title is required',
            minLength: { value: 1, message: 'Resource Title is too short' },
            maxLength: { value: 255, message: 'Resource Title is too long' }
          })}
        />
      </FormControl>
  )
}

function FormInputResourceContent({ errors, register }: {
  errors: FieldErrors<NewResourceInputType>
  register: UseFormRegister<NewResourceInputType>
}) {
  return (
    <FormControl isInvalid={errors.content ? true : false} className="flex-grow-1 h-full flex flex-col">
      <FormLabel htmlFor="content">Content <FormErrorMessage display='inline'>{errors.title?.message}</FormErrorMessage></FormLabel>
      <Textarea
        id='content'
        placeholder='Content'
        {...register('content', {

        })}
        size='sm'
        resize='none'
        className="flex-grow-1 !h-full"
      />
    </FormControl>
  )
}