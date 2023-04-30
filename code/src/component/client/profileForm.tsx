'use client'

import { User } from "@/server/routes/user";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  required_name: string
  bio: string,
};

const UpdateProfileForm = () => {

  // Retrieve Session
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      return redirect('/app/auth')
    },
  })  

  // Form Handling
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors, isDirty, isLoading }
  } = useForm<Inputs>({
    defaultValues: async () => await getDefaultValues(),
  });

  const getDefaultValues = async () => {
    try {
      const data = (await axios(Routes.UserInfo(session!.user.id))).data as User
      return {
        required_name: data.name,
        bio: data.bio
      }
    } catch (error) {
      console.log('Something Went Wrong')
      console.log(error)
      return {
        required_name: '',
        bio: ''
      }
    }
  }

  const onSubmit: SubmitHandler<Inputs> =
    async (data) => {
      try {
        console.log(data)
        await axios.post(Routes.UserUpdate(session!.user.id), data)

        const val = await getDefaultValues();
        reset(val);

        clearErrors()
      } catch (error) {

        setError('required_name', {
          message: 'This user name has been taken',
        })

      } finally {

      }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >

      <label>Name {errors.required_name && <span>👇{errors.required_name.message}</span>}</label>
      <input
        disabled={isLoading}
        {...register("required_name",
          {
            required: "Your username can't be empty",
            minLength: {
              message: "Your username must be more than 4 letter",
              value: 4
            },
          })
        }
      />
      
      
      <label>Bio {errors.bio && <span>👇{errors.bio.message}</span>}</label>
      <input
        disabled={isLoading}
        {...register("bio")}
      />
      
      <div className="inline">
        <button
          type="submit"
          disabled={!isDirty}
        >Submit</button>
        
        <button
          type="reset"
          disabled={!isDirty}
          onClick={async (e) => {
            e.preventDefault()
            const val = await getDefaultValues();
            reset(val);
          }}
        >Reset</button>
      </div>


    </form>
  );
}
 
export default UpdateProfileForm;