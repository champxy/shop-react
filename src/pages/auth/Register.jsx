import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0)


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore)

  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score
    if (passwordScore < 4) {
      return toast.error('Password is too weak')
    }
    console.log(data)
    try {
      const response = await axios.post('https://shop-api-beige.vercel.app/api/register', data)
      toast.success(response.data.msg)
      // console.log(response)
    } catch (error) {
      const msg = error.response?.data?.msg
      toast.error(msg)
      // console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input {...register("email", { required: true })} className={`w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input {...register("password", { required: true })} type="password" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            {
              watch().password?.length > 0 && (
                <div className="flex mt-2 space-x-1">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5" key={index}>
                      <div
                        className={`h-2 rounded-lg shadow-md transition-colors duration-300 ease-in-out ${passwordScore <= 1
                            ? 'bg-red-500'
                            : passwordScore === 2
                              ? 'bg-orange-500'
                              : passwordScore === 3
                                ? 'bg-yellow-500'
                                : passwordScore === 4
                                  ? 'bg-lime-500'
                                  : 'bg-green-500'
                          }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )
            }



          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
            <input {...register("confirmPassword", { required: true })} type="password" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );

}

export default Register