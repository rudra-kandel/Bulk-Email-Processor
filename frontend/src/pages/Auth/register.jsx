// import httpClient from "@services/service-axios";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastFail, toastSuccess } from "@services/service-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const url = import.meta.env.API_URL?? "https://936c-103-156-26-53.ngrok-free.app/";
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post(url + "api/auth/register", data);
      toastSuccess("Signd up Sucessfully");
      navigate("/login");
      console.log("🚀 ~ handleSubmit ~ res:", res);
    } catch (e) {
      console.log("🚀 ~ handleSubmit ~ e:", e);
      toastFail(e.response.data.message ?? "Sorry couldnt sign up");
    }
  }
  return (
    <main className="border border-white h-[100dvh] w-[100dvw] grid place-content-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 border border-gray p-5 rounded-lg w-[30vw]"
      >
        <h1 className="font-bold text-4xl mb-4">Sign Up</h1>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Email</label>
          <input
            required
            type="email"
            className="rounded h-[35px] px-2"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Password</label>
          <input
            required
            type="password"
            className="rounded h-[35px] px-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="border border-white px-2 py-1 rounded">
          Submit
        </button>
      </form>
    </main>
  );
};

export default SignUp;
