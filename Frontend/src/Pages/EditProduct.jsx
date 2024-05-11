import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProduct({ editId, editData, fetchingData }) {
  const [editformData, setEidtFormData] = useState({
    name: editData.name,
    imageURL: editData.imageURL,
    price: editData.price,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEidtFormData({ ...editformData, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, imageURL, price } = editformData;
      console.log(name, imageURL, price);

      if (!name || !imageURL || !price) {
        console.log("Its required to Fill the fields");
        toast.warn("Its required to Fill the fields", {
          position: "bottom-center",
        });

        return;
      }
      const response = await fetch(
        `http://localhost:5000/product/edit/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            imageURL,
            price,
          }),
        }
      );

      if (!response.ok) {
        console.log("failed to edit the data");
        toast.error("Faield to update the data", {
          position: "bottom-center",
        });
        return;
      }
      const responseData = await response.json();
      console.log(responseData);
      fetchingData();
      setEidtFormData({
        name: "",
        imageURL: "",
        price: "",
      });
      toast.success("Product Updated", {
        position: "bottom-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error while updating", {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Product
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
                  value={editformData.name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <input
                  name="image"
                  value={editformData.imageURL}
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
                  value={editformData.price}
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
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update product
              </button>
              <Link
                to="/"
                className="block mt-2 text-center text-sm font-medium text-gray-900"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
