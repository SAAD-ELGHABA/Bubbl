import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { Toaster } from 'sonner'
// import { useSelector } from "react-redux";

function App() {
//   const user = useSelector(state => state.auth.user)

//   useEffect(() => {
//   fetch("http://localhost:500/api/me", { credentials: "include" })
//     .then(res => res.json())
//     .then(data => {
//       if (data.user) {
//         dispatch({ type: "SET_USER", payload: data.user });
//       }
//     });
// }, []);

// useEffect(() => {
//   console.log(user)
// }, [user])



  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <Toaster />
      <RouterProvider router={Router}/>
    </div>
  )
}

export default App;
