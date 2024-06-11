import { registerUser } from "./register.auth.controller"
import { activateUser } from "./activateEmail.controller"
import { login } from "./login.controller"
import { forgotPassword } from "./forgot.auth.controller"
import { resetPasswordHandler } from "./reset.auth.controller"
import { changePassword } from "./change.auth.controller"
import { logout } from "./logout.controller"



export { registerUser, activateUser, login, forgotPassword, resetPasswordHandler, changePassword, logout}