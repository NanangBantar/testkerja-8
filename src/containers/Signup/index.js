import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Alerterrors from "./utils/Alerterrors";
import Alertstatus from "./utils/Alertstatus";
import { Link } from "react-router-dom";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [Alert, setAlert] = useState({
        status: false,
        msg: ""
    });

    const submitForm = async (e) => {
        try {
            const result = await axios.post("http://94.74.86.174:8080/register", e);
            setAlert({
                status: true,
                msg: result.data.message
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(submitForm)}>
            {Alert.status && <Alertstatus msg={Alert.msg} />}
            <div className="mt-4">
                <div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /\S+@\S+\.\S+/
                            }
                        })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.email && <Alerterrors />}
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.passwordText && <Alerterrors />}
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: true })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.passwordText && <Alerterrors />}
                </div>
                <div className="flex items-baseline space-x-2">
                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create</button>
                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                        <Link to="/">
                            Go To Login
                        </Link>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Signup;