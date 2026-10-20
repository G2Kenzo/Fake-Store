"use client"

import { useUser } from "@/hooks/users/useUser"

const User = () => {
  const {UserData, UserLoading, UserError} = useUser();

  if (UserLoading) {
    return <h1>Loading...</h1>
  }
  if (UserError) {
    return <h1>{UserError}</h1>
  }

  return (
    <div>
      {UserData.map((item) => (
        <div key={item.id} className="">
          <h1>{item.username}</h1>
          <span>{item.email}</span>
          <span>{item.password}</span>
          <div className="">
            <button className="">Edit</button>
            <button className="">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default User