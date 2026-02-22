import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/theme-context";
// import { AuthProvider } from "./context/auth-context"; // no need to wrap now
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <ThemeProvider>
        {/* <AuthProvider> */}
          <AppRoutes />
        {/* </AuthProvider> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
