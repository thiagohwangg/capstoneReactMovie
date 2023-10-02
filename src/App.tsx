import { useRoutes } from "react-router-dom"
// import { AuthLayout } from "./components/layouts/AuthLayout"
import { router } from "./routes"

function App() {
  return (
      <div>
            {useRoutes(router)}
      </div>
  )
}

export default App
