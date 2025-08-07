import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail, MdPassword } from "react-icons/md";
import AuthForm from "../../../components/common/AuthForm";
import { login } from "../../../utils/service/apiAuth";

const LoginPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <AuthForm onSubmit={login}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>

          <AuthForm.input
            icon={<MdOutlineMail />}
            type="text"
            placeholder="username"
            name="username"
          />
          <AuthForm.input
            icon={<MdPassword />}
            type="password"
            placeholder="Password"
            name="password"
          />
          <AuthForm.submit name="login" />
        </AuthForm>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
