import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddCategory() {
  const navigate = useNavigate();
  let [categoryDetails, setCategoryDetails] = useState('');
  let [imageURL, setImageURl] = useState('');

  // useEffect(() => {
  //   $(".dropify").dropify({
  //     messages: {
  //       default: "Drag and drop ",
  //       replace: "Drag and drop ",
  //       remove: "Remove",
  //       error: "Oops, something went wrong"
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const dropifyElement = $("#image");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
          class="dropify" data-height="250" data-default-file="${imageURL}"/>`
    );

    // **Reinitialize Dropify**
    $("#image").dropify();

  }, [imageURL]); // ✅ Runs when `defaultImage` updates

  const params = useParams();
  const updateId = params.id;

  useEffect(() => {
    if (updateId) {
      axios.post(`http://localhost:8001/api/admin/categories/details/${updateId}`)
        .then((result) => {
          if (result.data._status == true) {
            setCategoryDetails(result.data._data)
            setImageURl(result.data._image_path + result.data._data.image)
          } else {
            toast.error(result.data._message);

            for (var value of result.data._data) {
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

    if (!updateId) {
      // Create Category
      axios.post('http://localhost:8001/api/admin/categories/create', event.target)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            navigate('/category/view');
          } else {
            toast.error(result.data._message);

            for (var value of result.data._data) {
              toast.error(value);
            }

          }
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
    } else {
      //Update Category
      axios.put('http://localhost:8001/api/admin/categories/update/' + updateId, event.target)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            navigate('/category/view');
          } else {
            toast.error(result.data._message);

            for (var value of result.data._data) {
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
    <section className="w-full">
      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/category/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Category</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateId ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>


      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateId ? "Update Category" : "Add Category"}
          </h3>
          <form onSubmit={formHandler} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label

                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  data-default-file={imageURL + categoryDetails.image}
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  className="dropify"
                  data-height="250"
                />
              </div>
              <div className="w-2/3">
                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    defaultValue={categoryDetails.name}
                    type="text"
                    name="name"
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    defaultValue={categoryDetails.order}
                    id="order"
                    name="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                </div>

              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateId ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
