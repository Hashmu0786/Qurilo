import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Componets/NavBar";
import AddProduct from "./Pages/AddProduct";
import Cart from "./Pages/Cart";
import EditProduct from "./Pages/EditProduct";
import Product from "./Pages/Product";
import { Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Use array destructuring to define the state variable and its setter function
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState([]);

  const [cardData, setCardData] = useState([]);
  const [matchingProducts, setMatchingProducts] = useState([]);

  const handleCardItems = () => {
    const filteredProducts = products.filter((product) => {
      return cardData.some((cardItem) => cardItem.productId === product._id);
    });
    setMatchingProducts(filteredProducts);
  };

  const fetchingData = async () => {
    try {
      const response = await fetch("http://localhost:5000/product/get");

      if (!response.ok) {
        console.log("Network response is not ok");
        toast.warn("Network response is not ok", {
          position: "bottom-center",
        });
      }
      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching Data", {
        position: "bottom-center",
      });
    }
  };

  const fetchigCardData = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart/get");

      if (!response.ok) {
        console.log("Network response is not ok");
        toast.warn("Network response is not ok", {
          position: "bottom-center",
        });
      }
      const responseData = await response.json();
      setCardData(responseData); // Corrected the setter function name
      handleCardItems();
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching Data", {
        position: "bottom-center",
      });
    }
  };
  const handleEdit = (id, item) => {
    console.log(id, item);
    setEditId(id);
    setEditData(item);
  };

  useEffect(() => {
    fetchingData();
    fetchigCardData();
  }, []);

  useEffect(() => {
    handleCardItems();
    fetchigCardData();
  }, [products, cardData]);
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Product
                products={products}
                fetchingData={fetchingData}
                handleEdit={handleEdit}
                fetchigCardData={fetchigCardData}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                matchingProducts={matchingProducts}
                fetchigCardData={fetchigCardData}
              />
            }
          />
          <Route
            path="/add"
            element={<AddProduct fetchingData={fetchingData} />}
          />
          <Route
            path="/edit"
            element={
              <EditProduct
                editId={editId}
                editData={editData}
                fetchingData={fetchingData}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
