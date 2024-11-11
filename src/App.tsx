import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** PAGES */
import Landing from "./pages/Landing";
import AuthWrapper from "./components/Wrappers/AuthWrapper";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";
import DashboardLayout from "./components/Wrappers/DashboardLayout";

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
          path: "",
          element: <Dashboard />
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