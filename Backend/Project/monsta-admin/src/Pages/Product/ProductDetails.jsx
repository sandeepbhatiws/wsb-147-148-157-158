import React, { useEffect, useState } from 'react'
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ProductDetails() {

  const params = useParams();
  const updateId = params.id;
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  let [productDetails, setProductDetails] = useState('');
  let [imageURL, setImageURl] = useState('');
  let [colors, setColors] = useState([]);
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_VIEW_COLOR_URL, {
      // status: 1,
      limit: 100
    })
      .then((result) => {
        if (result.data._status == true) {
          setColors(result.data._data);
        } else {
          setColors([]);
          toast.error(result.data._message);
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
  }, []);

  useEffect(() => {
    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_VIEW_CATEGORY_URL, {
      // status: 1,
      limit: 100
    })
      .then((result) => {
        if (result.data._status == true) {
          setCategories(result.data._data);
        } else {
          setCategories([]);
          toast.error(result.data._message);
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
  }, []);

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

  useEffect(() => {
    const dropifyElement = $("#images");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="images" id="images"
            class="dropify" data-height="250" data-default-file="" multiple = "multiple"/>`
    );

    // **Reinitialize Dropify**
    $("#images").dropify();

  }, []);


  useEffect(() => {
    if (updateId) {
      axios.post(`http://localhost:8001/api/admin/products/details/${updateId}`)
        .then((result) => {
          if (result.data._status == true) {
            setProductDetails(result.data._data)
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
      // Create Product
      axios.post('http://localhost:8001/api/admin/products/create', event.target)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            navigate('/product/view');
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
      //Update Product
      axios.put('http://localhost:8001/api/admin/products/update/' + updateId, event.target)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            navigate('/product/view');
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

  const getSubCategories = (event) => {
    const categoryId = event.target.value;

    axios.post(import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_VIEW_SUB_CATEGORY_URL, {
      // status: 1,
      parent_category_id: categoryId,
      limit: 100
    })
      .then((result) => {
        if (result.data._status == true) {
          setSubCategories(result.data._data);
        } else {
          setSubCategories([]);
          toast.error(result.data._message);
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
  };

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
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
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

      <div className='w-full px-6 py-6'>

        <form onSubmit={formHandler} autoComplete='off'>
          <div className="grid grid-cols-3 gap-[10px] ">
            <div className="for-images ">

              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  name='image'
                  type="file"
                  id="image"
                  className="dropify"
                  data-height="160"
                />
              </div>

              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Images
                </label>
                <input
                  name='images[]'
                  multiple="multiple"
                  accept='image/*'
                  type="file"
                  id="images"
                  className="dropify"
                  data-height="160"
                />
              </div>



            </div>
            <div className="col-span-2">
              <div>
                <label
                  htmlFor="ProductName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={productDetails.name}
                  className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Enter Product Name"
                />
              </div>

              <div>
                <label
                  htmlFor="ProductCode"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Code
                </label>
                <input
                  type="text"
                  name="product_code"
                  defaultValue={productDetails.product_code}
                  className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Enter Product Code"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="colorName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select
                  name='colors_ids'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Color</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color._id}
                      selected={productDetails.colors_ids && productDetails.colors_ids.includes(color._id) ? "selected" : ""}
                    
                    >
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Category
                </label>
                <select
                  name='parent_categories_ids'
                  onChange={getSubCategories}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}

                    selected={productDetails.parent_categories_ids && productDetails.parent_categories_ids.includes(category._id) ? "selected" : ""}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="subCategoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select multiple="multiple"
                  name='sub_categories_ids[]'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Sub Category</option>
                  {subCategories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                  type="text"
                  name='actual_price'
                  defaultValue={productDetails.actual_price}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Actual Price'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  type="text"
                  name='sale_price'
                  defaultValue={productDetails.sale_price}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Sale Price'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Featured
                </label>
                <select
                  name='is_featured'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ 
                        productDetails.is_featured === 1 ? "selected" : ""
                   } >Yes</option>
                  <option value="2" selected={ 
                        productDetails.is_featured === 2 ? "selected" : ""
                   }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is New Arrivals
                </label>
                <select
                  name='is_new_arrivals'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="1" selected={ 
                        productDetails.is_new_arrivals === 1 ? "selected" : ""
                   } >Yes</option>
                  <option value="2" selected={ 
                        productDetails.is_new_arrivals === 2 ? "selected" : ""
                   }>No</option>
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Dimension
                </label>
                <input
                  type="text"
                  name='product_dimension'
                  defaultValue={productDetails.product_dimension}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Product Dimension'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Estimate Delivery Days
                </label>
                <input
                  type="text"
                  name='estimate_delivery_days'
                  defaultValue={productDetails.estimate_delivery_days}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Estimate Delivery Days'
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  type="text"
                  name='order'
                  defaultValue={productDetails.order}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Order'
                />
              </div>


            </div>

            <div className='py-[40px]'>
              <label
                htmlFor="categoryImage"
                className="block  text-md font-medium text-gray-900 text-[#76838f]"
              >
                Short Description
              </label>
              <textarea
                name='short_description'
                defaultValue={productDetails.short_description}
                className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" 
                placeholder="Enter Short Description"
              ></textarea>
            </div>

            <div className='py-[40px]'>
              <label
                htmlFor="categoryImage"
                className="block  text-md font-medium text-gray-900 text-[#76838f]"
              >
                Description
              </label>
              <ReactQuill theme="snow" defaultValue={ productDetails.long_description} onChange={setValue} className='h-[200px]'/>

            </div>

            <input type="hidden" name='long_description' value={value} />
          </div>

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateId ? "Update Product " : "Add Product"}
          </button>

        </form>

      </div>
    </section>
  )
}

