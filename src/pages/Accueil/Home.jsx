import { useState } from "react";
import "./Accueil.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useStore } from "../../store/useStore";
import { ClipLoader } from "react-spinners";

const Home = () => {
 const [category, setCategory] = useState("All");
 const { loading, setLoading } = useStore();
 return (
  <div className="container custom-container">
   <div className="" style={{ marginTop: "60px" }}></div>
   <Header />
   {loading ? (
    <div className="loader">
     <ClipLoader color="#f86c6b" loading={loading} size={150} />
    </div>
   ) : (
    <>
     <ExploreMenu category={category} setCategory={setCategory} />
     <FoodDisplay category={category} />
    </>
   )}
  </div>
 );
};

export default Home;