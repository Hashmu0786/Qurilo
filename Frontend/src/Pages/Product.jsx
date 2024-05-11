import React, { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";

import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product({
  products,
  fetchingData,
  handleEdit,
  fetchigCardData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const addToCart = async (id) => {
    try {
      console.log(id);
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (!response.ok) {
        console.log("data not found");
        toast.error("Data not found", {
          position: "bottom-center",
        });
        return;
      }

      if (response.status === 204) {
        console.log("No content");
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success("Product added to the Cart ", {
        position: "bottom-center",
      });
      fetchigCardData();
    } catch (error) {
      console.log(error);
      toast.error("Error in adding to the Cart", {
        position: "bottom-center",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("data not found");
        toast.error("Data not found", {
          position: "bottom-center",
        });

        return;
      }

      const resposeData = await response.json();
      console.log(resposeData);
      fetchingData();
      toast.success("Data is Deleted", {
        position: "bottom-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error while Deleting", {
        position: "bottom-center",
      });
    }
  };

  useEffect(() => {
    fetchingData();
  }, [currentPage]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Product List
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {currentProducts.map((item, index) => (
              <div key={index} className="group relative">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 my-3">
                      {item.price}
                    </p>
                    <div className="flex flex-row">
                      <button
                        className="text-sm font-medium text-gray-900"
                        onClick={() => handleEdit(item._id, item)}
                      >
                        <Link to="/edit">
                          <MdEditSquare className="text-xl text-teal-600 mt-1 mr-5" />
                        </Link>
                      </button>

                      <button
                        className="text-sm font-medium text-gray-900"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDeleteForever className="text-2xl text-red-700" />
                      </button>
                    </div>
                  </div>
                  <button
                    className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
                    onClick={() => addToCart(item._id)}
                  >
                    <FaCartArrowDown className="text-3xl text-fuchsia-800" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center page">
        <span>
          <IoIosArrowDropleftCircle
            className="text-3xl m-2"
            onClick={prevPage}
          />
        </span>
        <span>{currentPage}</span>
        <span>
          <IoIosArrowDroprightCircle
            className="text-3xl m-2"
            onClick={nextPage}
          />
        </span>
      </div>
    </>
  );
}
