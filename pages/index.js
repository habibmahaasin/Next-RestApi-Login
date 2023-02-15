import { useState } from "react"
import { setCookie,getCookie } from 'cookies-next';

export default function Home(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handlerLogin = async () => {
    await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.status_code === 200) {
        setCookie('token', data.token);
        window.location.href = "/dashboard";
      } else if (data.status_code === 400) {
        setAlert(data.message[0].error);
      } else {
        setAlert(data.message);
      }
    })
  }

  return (
    <div className="mt-48 grid gap-4">
      <h2><b>Learn Login Using Rest API</b></h2>
      { alert === "" ? "" :
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{alert}</span>
        </div>
      </div>
      }
      <div className="w-[26rem]">
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Masukkan Email" className="input input-bordered input-sm w-full" />
      </div>
      <div className="w-[26rem]">
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Masukkan Password" className="input input-bordered input-sm w-full" />
      </div>
      <button onClick={handlerLogin} className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-2 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">Login</button>
    </div>
  )
}

export async function getServerSideProps({req,res}){
  const cookie = getCookie('token',{ req, res });
  if (cookie != undefined || cookie != null) {
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false
          }
      }
  }

  return {
    props: {
      title : "page title",
    },
  }
}