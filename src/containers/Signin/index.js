import { useForm } from "react-hook-form";
import Alerterrors from "../Signup/utils/Alerterrors";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Singin = () => {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = async (e) => {
        try {
            const result = await axios.post("http://94.74.86.174:8080/login", e);
            if(result.data.message === "Proses view detail berhasil"){
                history.push("/Admin");
                localStorage.setItem("token", result.data.data.token);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(submitForm)}>
            <div className="mt-4">
                <div>
                    <label className="block">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: true
                        })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.username && <Alerterrors />}
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    {errors.password && <Alerterrors />}
                </div>
                <div className="flex items-baseline">
                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
    );
}

export default Singin;