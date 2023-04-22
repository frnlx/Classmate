'use client'

import { User } from "@/server/lib/models/users";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
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
    formState: { errors, isDirty }
  } = useForm<Inputs>({
    defaultValues: {
      required_name: session!.user.name,
      bio: session!.user.bio
    },

  });

  const getDefaultValues = async () => {
    try {
      const res = await axios.get(`/api/user/${session?.user.id}`)
      const data = res.data as User
      return {
        required_name: data.name,
        bio: data.bio
      }
    } catch (error) {
      console.log('Something Went Wrong')
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
        await axios.post(`/api/user/${session?.user.id}/update`, data)
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
      <input defaultValue={session!.user.name}
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
      <input defaultValue={session!.user.bio}
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
          onClick={()=>reset()}
        >Reset</button>
      </div>


    </form>
  );
}
 
export default UpdateProfileForm;