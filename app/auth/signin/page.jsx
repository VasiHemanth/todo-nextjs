"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { signIn } from "next-auth/react";

import { useForm, Controller } from "react-hook-form";
import ButtonLoader from "@/app/AppComponents/ButtonLoader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export default function Login() {
  const [login, setLogin] = useState({
    passwordVisible: false,
    isFocused: false,
    loading: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setLogin({
      ...login,
      passwordVisible: !login.passwordVisible,
    });
  };

  const router = useRouter();

  const { data } = useSession();

  const onSubmit = async (loginData) => {
    // Login logic

    console.log("login data", loginData);

    setLogin({ ...login, loading: true });
    await signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      redirect: false,
      // callbackUrl: "/vehicles",
    }).then((callback) => {
      if (callback?.error) {
        console.log("error", callback.error);
        toast({
          variant: "destructive",
          title: "Uh oh! SignIn failed",
          description: `${callback.error}`,
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      if (callback?.ok && !callback?.error) {
        toast({
          description: "Logged in successfully!",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    });
    // const loginStatus = await loginUser(loginData.username, loginData.password);
    // console.log("loginStatus", loginStatus);
    router.push("/todo-data");

    setLogin({ ...login, loading: false });
  };

  return (
    <>
      <div className="w-4/5 lg:w-1/2">
        <div className="flex items-center justify-center h-full">
          <div className="h-3/4 w-full sm:w-4/5 md:w-1/2 lg:w-3/5 xl:w-1/2">
            <div className="flex-col justify-center items-center">
              <div className="mx-auto">
                {/* <div className="relative w-20 h-14">
                  <Image src="/VkTraders.png" alt="logo" fill={true} />
                </div> */}
                {/* <p
                    className="md:text-lg lg:text-xl border rounded text-primary
                 font-semibold bg-card inline-block p-2"
                  >
                    VK <span className="tracking-wide">Traders</span>
                  </p> */}
                <p className="text-lg xl:text-xl font-bold pt-3 pb-5">
                  Login to your Account
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="py-3">
                  <div className="mb-4">
                    <Label className="block text-gray-700 md:text-sm lg:text-base font-medium mb-2">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="username"
                      defaultValue=""
                      {...register("username", { required: true })}
                      placeholder="Username"
                      className={`w-full px-3 py-2  ${
                        errors.username ? "border-pink-500" : ""
                      }`}
                    />
                    {errors.username && (
                      <span className="text-sm text-pink-500">
                        Username is required
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <Label className="block text-gray-700 md:text-sm lg:text-base font-medium mb-2">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={login.passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        defaultValue=""
                        {...register("password", { required: true })}
                        className={`w-full px-3 py-2  text-gray-700 
                          leading-tight focus:ring-1 ${
                            errors.password ? "border-pink-500" : ""
                          }`}
                        onFocus={() => setLogin({ ...login, isFocused: true })}
                        onBlur={() => setLogin({ ...login, isFocused: false })}
                      />
                      {login.isFocused && (
                        <button
                          type="button"
                          className={`absolute top-1/2 right-4 transform -translate-y-1/2
                          `}
                          onClick={togglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {login.passwordVisible ? (
                            <Image
                              src="/eye.svg"
                              width={20}
                              height={20}
                              alt="Eye Icon"
                            />
                          ) : (
                            <Image
                              src="/eye-slash.svg"
                              width={20}
                              height={20}
                              alt="Eye slash Icon"
                            />
                          )}
                        </button>
                      )}
                      {errors.password && (
                        <span className="text-sm text-pink-500">
                          Password is required
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-medium py-2 px-4"
                  >
                    {login.loading ? (
                      <div className="flex items-center justify-center">
                        <ButtonLoader />
                        Authenticating...
                      </div>
                    ) : (
                      <>Sign in</>
                    )}
                  </Button>
                  <p className="my-3 text-sm text-muted-foreground hover:underline hover:cursor-pointer">
                    Forgot Password
                  </p>
                  {/* <CustomAlert
                    triggerClassName={`text-center w-full`}
                    component={
                      <p className="my-3 text-sm text-muted-foreground hover:underline hover:cursor-pointer">
                        Forgot Password
                      </p>
                    }
                    title={"Forgot your passoword?"}
                    description={`If you wish to reset password, Contact Developer.`}
                    action={false}
                  /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
