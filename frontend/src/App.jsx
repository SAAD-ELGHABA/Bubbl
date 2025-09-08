import React from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Toaster />
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
