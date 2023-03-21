
import { BrowserRouter as Router,Route,Routes as Sw,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/restaurant.js";
import Login from "./components/login";
import List from "./components/restaurantlist";
import Add from "./components/addreview";
import { useState } from 'react';

function App() {
  const [user,setUser]=useState(null);
  function logout(){
    setUser(null);
  }
  
  return (
    <Router>
    <div className="App">
     <div class="container-fluid navbar navbar-expand navbar-dark bg-dark">
       <a href="/restaurants" class="navbar-brand">RestaurantReviews</a>
       <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a href="#" onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
       
       </div>
       
       <Sw>
       <Route exact path="/" element={<Home/>} />
       <Route exact path="/restaurants" element={<Home/>}/>
       
       <Route exact path="/login" element={<Login/>}/>
       
       </Sw>
    
     </div>
    </Router>

  );
}

export default App;
