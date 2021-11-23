import { useForm } from "react-hook-form";
import Alerterrors from "../Signup/utils/Alerterrors";
import axios from "axios";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const Viewchecklist = () => {
    const location = useLocation();
    const [Item, setItem] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    console.log(location.pathname.split("/")[location.pathname.split("/").length - 1]);

    const submitForm = async (e) => {
        const formData = {
            checklistId: location.pathname.split("/")[location.pathname.split("/").length - 1],
            itemName: e.itemName
        };
        try {
            const result = await axios.post("http://94.74.86.174:8080/item", formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            getItem();
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = async () => {
        try {
            const resp = await axios.get(`http://94.74.86.174:8080/checklist/`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            setItem(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItems = async (e) => {
        try {
            const resp = await axios.delete(`http://94.74.86.174:8080/item/${e}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            console.log(e);
            getItem();
        } catch (error) {
            console.log(error);
        }
    }

    const getItemsByid = async (e) => {
        try {
            const resp = await axios.get(`http://94.74.86.174:8080/item/${e}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            console.log(resp);
            alert(`id : ${resp.data.data.id}, Name : ${resp.data.data.name}, Status : ${resp.data.data.itemCompletionStatus}`);
        } catch (error) {
            console.log(error);
        }
    }

    const updateItems = async (e) => {
        console.log(e);
        try {
            const resp = await axios.put(`http://94.74.86.174:8080/item/${e}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            console.log(resp);
            alert(`id : ${resp.data.data.id}, Name : ${resp.data.data.name}, Status : ${resp.data.data.itemCompletionStatus}`);
        } catch (error) {
            console.log(error);
        }
    }

    const renameItems = async (e) => {
        let person = prompt("Please enter your name", "Harry Potter");
        const formData = {
            checklistId: location.pathname.split("/")[location.pathname.split("/").length - 1],
            itemName: person
        };

        try {
            const resp = await axios.put(`http://94.74.86.174:8080/item/rename/${e}`, formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            getItem();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div className="container mx-auto">
            <form noValidate onSubmit={handleSubmit(submitForm)}>
                <div className="mt-4">
                    <div>
                        <label className="block mb-4 font-bold">CheckList Number {location.pathname.split("/")[location.pathname.split("/").length - 1]}</label>

                        <label className="block">Add check list Item</label>
                        <input
                            type="text"
                            placeholder="Item Name"
                            {...register("itemName", {
                                required: true
                            })}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        {errors.itemName && <Alerterrors />}
                    </div>
                    <div className="flex items-baseline">
                        <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Add</button>
                    </div>
                </div>
            </form>


            <ul className="mt-10 space-y-4 w-full">
                {Item?.data.filter(val => val.id == location.pathname.split("/")[location.pathname.split("/").length - 1]).map((_, index) =>
                    <li key={index} className="flex space-x-4 w-1/2 justify-between border-2 border-blue-500 p-4 items-center w-full">{_.name}
                        <div className="flex items-baseline space-x-4 flex-col px-4">
                            {_.items?.map(element =>
                                <div key={element.id} className="m-4 flex items-center justify-between space-x-3 w-full">
                                    <div className="font-bold">{element.name}</div>
                                    <button onClick={() => deleteItems(element.id)} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Delete</button>
                                    <button onClick={() => getItemsByid(element.id)} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">View</button>
                                    <button onClick={() => updateItems(element.id)} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Edit</button>
                                    <button onClick={() => renameItems(element.id)} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Rename</button>
                                </div>
                            )}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Viewchecklist;