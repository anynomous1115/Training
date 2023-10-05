import { logout } from "../services/users.service.js";

logout;
const logoutEvent = () => {
  const logoutSpanTag = document.querySelector("#logout");
  logoutSpanTag.addEventListener("click", () => {
    logout();
  });
};
export { logoutEvent };
