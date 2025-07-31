import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddColor() {
  const params = useParams();
  const updateId = params.id;
  const navigate = useNavigate();
  const [colorDetails, setColorDetails] = useState('');

  useEffect(() => {
    if (updateId) {
      axios.post(`http://localhost:8001/api/admin/color/details/${ updateId}`)
      .then((result) => {
        if(result.data._status == true){
          setColorDetails(result.data._data)
        } else {
          toast.error(result.data._message);

          for(var value of result.data._data){
            toast.error(value);
          }

        }
      })
      .catch(() => {
          toast.error('Something went wrong');
      })
    }
  }, [updateId]);


  const formHandler = (event) => {
    event.preventDefault();

    const data = {
      name : event.target.name.value,
      code : event.target.code.value,
      order : event.target.order.value,
    }

    if(!updateId){
      // Create Color
      axios.post('http://localhost:8001/api/admin/color/create', data)
      .then((result) => {
        if(result.data._status == true){
          toast.success(result.data._message);
          navigate('/color/view');
        } else {
          toast.error(result.data._message);

          for(var value of result.data._data){
            toast.error(value);
          }

        }
      })
      .catch(() => {
          toast.error('Something went wrong');
      })
    } else {
      //Update Color
      axios.put('http://localhost:8001/api/admin/color/update/'+updateId, data)
      .then((result) => {
        if(result.data._status == true){
          toast.success(result.data._message);
          navigate('/color/view');
        } else {
          toast.error(result.data._message);

          for(var value of result.data._data){
            toast.error(value);
          }

        }
      })
      .catch(() => {
          toast.error('Something went wrong');
      })
    }

  }

  return (
    <div className="w-full">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
          {updateId ? "Update Color" : "Add Colors"}
        </h3>

        <form onSubmit={ formHandler } autoComplete="off"
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
        >
          {/* Color Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Color Name</label>
            <input
              type="text" name="name" defaultValue={colorDetails.name}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Color Name"
            />
          </div>

          {/* Color Picker */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Color Picker</label>
            <input
              type="color" name="code" defaultValue={colorDetails.code}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Color Code"
            />
          </div>

          {/* Color Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Order</label>
            <input
              type="number" name="order" defaultValue={colorDetails.order}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {updateId ? "Update Color" : "Add Color"}
          </button>
        </form>
      </div>
    </div>
  );
}
