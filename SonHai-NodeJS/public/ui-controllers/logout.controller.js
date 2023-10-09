import { logout } from "../services/users.service.js";

const logoutEvent = () => {
  const logoutSpanTag = document.querySelector("#logout");
  logoutSpanTag.addEventListener("click", () => {
    logout();
  });
};
export { logoutEvent };
