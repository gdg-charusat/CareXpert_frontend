import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/theme-context";
import { AuthProvider } from "./context/auth-context";
import AppRoutes from "./routes";
import { useWebVitals, usePerformanceObserver } from "./lib/performance";

function App() {
  // Monitor Web Vitals for performance tracking
  useWebVitals();
  usePerformanceObserver();

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
