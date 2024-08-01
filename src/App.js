import { useState ,useEffect} from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Users from "./scenes/users";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Product from "./scenes/product";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

import EthnicalFood from "./scenes/ethnicalfood";
import AddProduct from "./scenes/addproduct";
import SeasonFood from "./scenes/seasonfood/seasonfoods";
import SeasonalDetail from "./scenes/seasonaledit/SeasonalDetail";
import EthnicalDetail from "./scenes/ethnicaledit/EthnicalDetail";
import CommentCard from "./scenes/commentCard/commentCard";
import ArticleAddProduct from "./scenes/product/articleAddProduct";
import EthnicalAddProduct from "./scenes/product/ethnicalAddproduct";
import IngredientsList from "./components/IngredientsList";
import SeasonalAddProduct from "./scenes/seasonaledit/SeasonalAddProduct";
import SeasonalEdit from "./scenes/seasonaledit/SeasonalEdit";
import Contact from "./scenes/Contact/Contact";
import Login from "./scenes/Auth/Login";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          isAuthenticated? 
          (
            <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/users" element={<Users/>} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/products" element={<Product/>}/>
              <Route path="/ethnicalfood" element={<EthnicalFood/>}/>
              <Route path="/addProduct" element={<AddProduct/>}/>
              <Route path="/seasonfood" element={<SeasonFood/>}/>
              <Route path="/ethnicalDetail" element={<EthnicalDetail/>}/>
              <Route path="/seasonalDetail" element={<SeasonalDetail/>}/>
              <Route path="/commentCard" element={<CommentCard/>}/>
              <Route path="/articleAddProduct" element={<ArticleAddProduct />}/>
              <Route path="/ethnialAddProduct" element={<EthnicalAddProduct/>}/>
              <Route path="/ingredientList" element={<IngredientsList/>}/>
              <Route path="/seasonalAddProduct" element={<SeasonalAddProduct/>}/>
              <Route path="/SeasonalEdit" element={<SeasonalEdit/>}/>
              <Route path="/Contact" element={<Contact/>}/>

            </Routes>
          </main>
        </div>
          )
          :
          (
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          )
        }
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
