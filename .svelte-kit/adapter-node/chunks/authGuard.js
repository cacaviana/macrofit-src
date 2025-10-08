import { w as writable } from "./index.js";
import { e as environment } from "./environment.js";
function useAuthGuard() {
  const authMode = environment.authMode;
  const isAuthenticated = writable(authMode === "dev");
  const isChecking = writable(authMode !== "dev");
  return {
    isAuthenticated,
    isChecking
  };
}
export {
  useAuthGuard as u
};
