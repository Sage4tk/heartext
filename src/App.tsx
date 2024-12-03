import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
/** PAGES */
import Landing from "./pages/Landing";
import AuthWrapper from "./components/Wrappers/AuthWrapper";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/Wrappers/DashboardLayout";
import STT from "./pages/STT";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      
    },
    {
      path: "/signup", 
      async lazy() {  

        let page = await import("./pages/Signup")

        return { Component: page.default }

      }
    },
    {
      path: "/login",
      async lazy() {
        let page = await import("./pages/Login");

        return { Component: page.default }
      }
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: "speech-to-text",
          element: <STT />
        }
      ]
    }
    
])

const App:React.FC = () => {
    return (
      <AuthWrapper>

        <RouterProvider router={router} />

        <Toaster />

      </AuthWrapper>
    )
}

export default App;