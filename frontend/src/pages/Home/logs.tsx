import tokenService from "@services/service-token";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../constants/apiurl";
import { io } from "socket.io-client";

export default function Logs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);


  useEffect(() => {
    let headers = {
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + tokenService.getToken()?.access,
    };
    axios
      .get(URL + "api/logs/?limit=15&page=1", { headers })
      .then((res) => {
        setLogs(res?.data.data ?? []);
      })
      .catch((e) => {
        console.log("🚀 ~ axios.get ~ e:", e);
        return {};
      });
    const socket = io(URL, {
      auth: {
        token: tokenService.getToken()?.access,
      },
    });
    socket.on("connect", () => {
      console.log("🚀 ~ socket.on ~ connected");
    });
    socket.on("emailLog", (res) => {
      console.log("🚀 ~ socket.on ~ res:", res);
    });
  }, []);

  function logout(e) {
    e.preventDefault();
    tokenService.clear_token();
    navigate("/login");
  }
  return (
    <main className="h-[100dvh] w-[100dvw] flex flex-col ">
      <nav className="w-full flex justify-between px-10 py-5">
        <Link to="/">Home</Link>
        <button onClick={logout}>Log Out</button>
      </nav>
      <div className="px-10 py-5 h-full flex flex-col gap-3">
        <table className="">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Date</th>
              <th>Email</th>
              <th>Sent By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((data, index) => (
              <tr key={index}>
                <td className="text-center p-2">{index + 1}</td>
                <td className="text-center p-2">{data.createdAt}</td>
                <td className="text-center p-2">{data.email}</td>
                <td className="text-center p-2">{data.user.email}</td>
                <td className="text-center p-2">{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
