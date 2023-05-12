'use client'

import { Routes } from "@/component/lib/route-helper";
import { CategoryData } from "@/server/types/fetchmodels";
import { Alert, AlertDescription, AlertIcon, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


type Inputs = {
  title: string,
  content: string,
};

const ResourceAddForm = (p: {sectionid: string, categoryid: string, onAdd: ()=>void }) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string>('')

  const queryClient = useQueryClient()
  const addPostMutation = useMutation<CategoryData, unknown, Inputs>({
    mutationFn: async (data) => {
      return axios.post(Routes.ResourceCreate(p.sectionid), data).then(res => res.data)
    },
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
      // await axios.post(Routes.ResourceCreate(p.sectionid), data)
      // queryClient.invalidateQueries(['category', p.categoryid])
      // p.closeForm()
    } catch (error) {
      // setServerError((error as AxiosError).message)
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

      <Button className="flex-shrink-0" type="submit" isLoading={loading}>Create New Post</Button>
    </form>

  );
}
 
export default ResourceAddForm;