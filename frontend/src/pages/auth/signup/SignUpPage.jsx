import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";

import { FaUser } from "react-icons/fa";
import {
  MdDriveFileRenameOutline,
  MdOutlineMail,
  MdPassword,
} from "react-icons/md";
import AuthForm from "../../../components/common/AuthForm";
import { signup } from "../../../utils/service/apiAuth";

const SignUpPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <AuthForm onSubmit={signup}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <AuthForm.input
            icon={<MdOutlineMail />}
            type="email"
            placeholder="Email"
            name="email"
          />
          <AuthForm.input
            icon={<FaUser />}
            type="text"
            placeholder="Username"
            name="username"
          />
          <AuthForm.input
            icon={<MdDriveFileRenameOutline />}
            type="text"
            placeholder="Full Name"
            name="fullName"
          />

          <AuthForm.input
            icon={<MdPassword />}
            type="password"
            placeholder="Password"
            name="password"
          />

          <AuthForm.submit name="signup" />
        </AuthForm>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
