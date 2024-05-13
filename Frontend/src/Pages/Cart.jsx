import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ matchingProducts }) {
  const [quantities, setQuantities] = useState(1);
  console.log(matchingProducts);
  const increaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    if (quantities[itemId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  const totalAmount = matchingProducts.reduce((total, item) => {
    return total + (quantities[item._id] || 0) * Number(item.price);
  }, 0);

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error: Failed to remove item from cart");
        toast.error("Failed to remove item from cart", {
          position: "bottom-center",
        });
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success("Item removed from cart successfully", {
        position: "bottom-center",
      });
      fetchigCardData();
      console.log("Item removed from cart successfully");
    } catch (error) {
      console.log("Error: ", error);
      // toast.error("Error In Removing");
    }
  };

  return (
    <>
      <div className="">
        <h2 className="text-xl font-semibold">Cart Items</h2>
        <ul className="flex flex-col divide-y dark:divide-gray-700">
          {matchingProducts.map((item) => (
            <li
              key={item._id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between m-5"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                  src={`http://localhost:5000/${item.imageURL}`}
                  alt={item.name}
                />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-sm:pr-8">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {`₹ ${quantities[item._id] || 0} * ${Number(
                          item.price
                        )} = ${quantities[item._id] * Number(item.price) || 0}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-sm divide-x">
                    <button
                      type="button"
                      className="flex items-center px-2 py-1 pl-0 space-x-1"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <RiDeleteBin2Line className="text-2xl" />
                      Remove
                    </button>
                    <button
                      type="button"
                      className="flex items-center px-2 py-1 space-x-1"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      <span className="text-2xl mr-1">
                        <FiPlus />
                      </span>
                    </button>
                    <span className="text-xl">{quantities[item._id] || 0}</span>
                    <button
                      type="button"
                      className="flex items-center px-2 py-1 space-x-1"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      <span className="text-2xl mx-2">
                        <FaMinus />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right m-5">
          <p>
            Total amount:
            <span className="font-semibold">{`₹ ${totalAmount}`}</span>
          </p>
        </div>
        <div className="flex justify-center	 items-center space-x-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:border-violet-400"
          >
            Back
            <span className="sr-only sm:not-sr-only">to shop</span>
          </button>
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span className="sr-only sm:not-sr-only">Continue to </span>Checkout
          </button>
        </div>
      </div>
    </>
  );
}
