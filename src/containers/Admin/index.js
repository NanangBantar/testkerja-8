import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alerterrors from "../Signup/utils/Alerterrors";
import { useHistory } from "react-router-dom";

const Admin = () => {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [AllCheckList, setAllCheckList] = useState();

    const getAllchecklist = async () => {
        try {
            const resp = await axios.get("http://94.74.86.174:8080/checklist",
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            setAllCheckList(resp.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const submitForm = async (e) => {
        try {
            const result = await axios.post("http://94.74.86.174:8080/checklist",
                e,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            getAllchecklist();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteChecklist = async (e) => {
        try {
            const result = await axios.delete(`http://94.74.86.174:8080/checklist/${e}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            getAllchecklist();
        } catch (error) {
            console.log(error);
        }
    }

    const viewCheckList = (e) => {
        history.push(`/view/${e}`);
    }


    useEffect(() => {
        getAllchecklist();
    }, []);

    console.log(AllCheckList);

    return (
        <div className="container mx-auto">
            <form noValidate onSubmit={handleSubmit(submitForm)}>
                <div className="mt-4">
                    <div>
                        <label className="block">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", {
                                required: true,
                            })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        {errors.name && <Alerterrors />}
                    </div>
                </div>
                <div className="flex items-baseline">
                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create Checklist</button>
                </div>
            </form>

            <ul className="mt-10 space-y-4 flex-col flex">
                {AllCheckList?.map((_, index) =>
                    <li key={index} className="flex space-x-4 w-1/2 justify-between border-2 border-blue-500 p-4 items-center flex-col">{_.name}
                        <div className="flex items-baseline space-x-4">
                            <button onClick={() => deleteChecklist(_.id)} className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Delete</button>
                            <button onClick={ () => viewCheckList(_.id) } className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">View</button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Admin;