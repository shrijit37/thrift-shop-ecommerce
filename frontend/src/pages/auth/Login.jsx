import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector(state => state.auth);
    const { search } = useLocation()

    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);




    return (
        <section className="pl-[40rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Sign In </h1>
                <form action="/submit-form" className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium">📧E-mail Address</label>
                        <input  type="email" id="email" className="mt-1 p-2 border rounded w-full" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail"/>
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium">🔒Password</label>
                        <input  type="password" id="password" className="mt-1 p-2 border rounded w-full" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    </div>
                    <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                        {isLoading? "🔓 Signing in":"🔑 Sign-in"}
                    </button>
                    {isLoading ? <Loader/>:<></>}
                </form>
            </div>
            
        </section>

    )
}

export default Login