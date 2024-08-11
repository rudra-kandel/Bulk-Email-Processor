import { read, utils } from "xlsx";
import { useEffect, useState } from "react";
import axios from "axios";
import tokenService from "@services/service-token";
import { Link, useNavigate } from "react-router-dom";
import URL from "../../constants/apiurl";

const Home = () => {
  const navigate = useNavigate();

  const token = tokenService.getToken().access;
  let headers = {
    Authorization: "Bearer " + tokenService.getToken()?.access,
  };

  const sheetToJson = async (file) => {
    if (!file) {
      return null;
    }
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const firstSheet = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheet];
    const json = utils.sheet_to_json(worksheet, { header: 1 });
    // json.splice(0, 1);
    return json;
  };

  const onFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0];
      const extension = f.name.split(".").pop();
      if (extension === "csv") {
        sheetToJson(f)
          .then((data) => {
            if (data) {
              data = data.flatMap((item) => {
                // const [phone, name, gender] = item;
                return item;
              });
              console.log("🚀 ~ data=data.map ~ item:", data);
              setCsvContacts(data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setCsvContacts([]);
      }
    } else {
      setCsvContacts([]);
    }
  };

  function logout(e) {
    e.preventDefault();
    tokenService.clear_token();
    navigate("/login");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let payload = {
      templateId: tempelate?.data[index].id,
      userEmails: csvContacts,
    };
    try {
      const res = await axios.post(URL + "api/send-bulk-email", payload, {
        headers,
      });
      setIndex(null);
    } catch (e) {
      console.log("🚀 ~ handleSubmit ~ e:", e);
    }
  }
  const [tempelate, setTemplate] = useState();
  const [index, setIndex] = useState(null);
  const [csvContacts, setCsvContacts] = useState([]);
  useEffect(() => {
    if (!token) return navigate("/login");
    axios
      .get(URL + "api/email-template/", { headers })
      .then((res) => {
        setTemplate(res.data);
      })
      .catch((e) => {
        // setTemplate({
        //   data: [
        //     {
        //       id: "01913adb-5407-766f-a5a1-2a6c934917a6",
        //       name: "Welcome Email",
        //       subject: "Welcome to Our Service!",
        //       body: "<h1>Welcome! {{userEmail}} </h1><p>Thank you for joining us.</p></h1><p>Thank you for joining us.</p>",
        //       createdAt: "2024-08-10T05:55:38.120Z",
        //       updatedAt: "2024-08-10T05:55:38.120Z",
        //     },
        //     {
        //       id: "01913adb-5408-766f-a5a1-33799a59ab1b",
        //       name: "Password Reset",
        //       subject: "Reset Your Password",
        //       body: '<h1>{{userEmail}} </h1> <p> Click <a href="{resetLink}">here</a> to reset your password.</p>',
        //       createdAt: "2024-08-10T05:55:38.120Z",
        //       updatedAt: "2024-08-10T05:55:38.120Z",
        //     },
        //     {
        //       id: "01913cd5-af65-7003-9314-5bd5f81daf8b",
        //       name: "Account Verification",
        //       subject: "Verify Your Account",
        //       body: '<h1>Verify Your Email</h1><p>Dear {{userEmail}}, please click <a href="{{verificationLink}}">here</a> to verify your account.</p>',
        //       createdAt: "2024-08-10T15:08:42.726Z",
        //       updatedAt: "2024-08-10T15:08:42.726Z",
        //     },
        //     {
        //       id: "01913cd5-af66-7003-9314-65497fce4d4a",
        //       name: "Order Confirmation",
        //       subject: "Your Order has been Confirmed!",
        //       body: "<h1>Order Confirmation</h1><p>Thank you for your purchase, {{userEmail}}! Your order number is {{orderNumber}}.</p>",
        //       createdAt: "2024-08-10T15:08:42.726Z",
        //       updatedAt: "2024-08-10T15:08:42.726Z",
        //     },
        //     {
        //       id: "01913cd5-af66-7003-9314-6b396a051f14",
        //       name: "Shipping Notification",
        //       subject: "Your Order is on its Way!",
        //       body: '<h1>Shipping Notification</h1><p>Hi {{userEmail}}, your order {{orderNumber}} has been shipped. Track it <a href="{{trackingLink}}">here</a>.</p>',
        //       createdAt: "2024-08-10T15:08:42.726Z",
        //       updatedAt: "2024-08-10T15:08:42.726Z",
        //     },
        //     {
        //       id: "01913cd5-af66-7003-9314-7730e2b704e0",
        //       name: "Subscription Renewal Reminder",
        //       subject: "Your Subscription is About to Expire",
        //       body: '<h1>Subscription Renewal Reminder</h1><p>Dear {{userEmail}}, your subscription will expire on {{expiryDate}}. Renew it <a href="{{renewalLink}}">here</a>.</p>',
        //       createdAt: "2024-08-10T15:08:42.726Z",
        //       updatedAt: "2024-08-10T15:08:42.726Z",
        //     },
        //     {
        //       id: "01913cd5-af66-7003-9314-783eddfa6a36",
        //       name: "Event Invitation",
        //       subject: "You’re Invited to Our Event!",
        //       body: '<h1>Event Invitation</h1><p>Hello {{userEmail}}, we’re excited to invite you to our upcoming event. Click <a href="{{eventLink}}">here</a> for more details.</p>',
        //       createdAt: "2024-08-10T15:08:42.726Z",
        //       updatedAt: "2024-08-10T15:08:42.726Z",
        //     },
        //     {
        //       id: "01913cd5-af66-7003-9314-85c5d2f05e7d",
        //       name: "Feedback Request",
        //       subject: "We Value Your Feedback",
        //       body: '<h1>Feedback Request</h1><p>Hi {{userEmail}}, we’d love to hear your thoughts on our service. Please provide your feedback <a href="{{feedbackLink}}">here</a>.</p>',
        //       createdAt: "2024-08-10T15:08:42.726Z",
        //       updatedAt: "2024-08-10T15:08:42.726Z",
        //     },
        //   ],
        // });
      });
  }, []);
  return (
    <main className="h-screen w-screen flex flex-col bg-gray-100">
      <div
        className={
          index != null
            ? "fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
            : "hidden"
        }
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.preventDefault();
              setIndex(null);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Send{" "}
            <span className="text-2xl text-green-600">
              {index != null && tempelate?.data[index].name}
            </span>{" "}
            email
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload CSV file
          </label>
          <label className="block p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer">
            <input
              type="file"
              accept=".csv"
              required
              onChange={onFileChange}
              className="sr-only"
            />
            <span className="text-gray-600">Choose file</span>
          </label>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>

      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <Link to="/logs" className="hover:underline">
          View Logs
        </Link>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Log Out
        </button>
      </nav>

      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tempelate?.data.map((data, index) => (
          <div
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            key={index}
            onClick={() => setIndex(index)}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {data.name}
            </h2>
            <div className="text-gray-600">{data.body}</div>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Home;
