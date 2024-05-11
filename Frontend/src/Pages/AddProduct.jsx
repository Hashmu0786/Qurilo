import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct({ fetchingData }) {
  const [formData, setFormData] = useState({
    name: "",
    imageURL: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const { name, imageURL, price } = formData; // destructure the data
      console.log(name, imageURL, price);

      if (!name || !imageURL || !price) {
        console.log("It's required to fill all fields");
        toast.warn("It's required to fill all fields", {
          position: "bottom-center",
        });
        return;
      }

      const response = await fetch("http://localhost:5000/product/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, imageURL, price }),
      });

      if (!response.ok) {
        console.log("Failed to add the Product");
        toast.error("Failed to add the Product", {
          position: "bottom-center",
        });
        return;
      }
      const responseData = await response.json();
      console.log(responseData);
      fetchingData();
      setFormData({
        name: "",
        imageURL: "",
        price: "",
      });
      toast.success("Product Added Successfully", {
        position: "bottom-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add the Product", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name and Description
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <input
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleForm}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
