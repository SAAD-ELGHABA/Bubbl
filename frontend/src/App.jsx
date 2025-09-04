import React from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

function App() {

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <RouterProvider router={Router}/>
    </div>
  )
}

export default App;
