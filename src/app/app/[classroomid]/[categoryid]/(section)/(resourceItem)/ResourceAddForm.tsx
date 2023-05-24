'use client'

import { ClassAPI } from "@/api/route-helper";
import { useRoom } from "@/app/app/(Navbar)/RoomContext";
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, ModalFooter, Textarea, Select } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// TODO: Add "resource type" input -> include in data
type Inputs = {
  title: string,
  content: string,
  // resType: number
};

const ResourceAddForm = (p: { sectionid: string, categoryid: string, onAdd: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string>('')

  const queryClient = useQueryClient()

  const room = useRoom()

  console.log([room.current.id, p.categoryid, p.sectionid])

  const addPostMutation = useMutation({
    mutationFn: async (data: Inputs) =>
      ClassAPI
        .CreateResource(room.current.id, p.categoryid, p.sectionid, data).then(res => res.data),

    onSuccess(data, error) {
      queryClient.invalidateQueries(['category', p.categoryid]);
      p.onAdd()
    },
    onError(error, data) {
      setServerError((error as AxiosError).message)
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      addPostMutation.mutate(data)
    } catch (error) {
      setServerError((error as AxiosError).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
      {
        serverError ?
          (
            <Alert status="error" className="">
              <AlertIcon />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )
          : null
      }

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

      {/* <FormControl isInvalid={errors.content ? true : false} className="">
        <FormLabel htmlFor="resType">Resource Type <FormErrorMessage display='inline'>{errors.title?.message}</FormErrorMessage></FormLabel>
        <Select
          id='resType'
          {...register('resType', {
            required: 'Resource Type is required',
          })}
        >
          <option value="1">Normal Post</option>
          <option value="2">Discussion Post</option>
          <option value="3">Assignment</option>
        </Select>
      </FormControl> */}

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

      <ModalFooter>
        <Button className="flex-shrink-0" type="submit" variant='solid' colorScheme="blue" isLoading={loading}>Create New Post</Button>

      </ModalFooter>
    </form>

  );
}

export default ResourceAddForm;