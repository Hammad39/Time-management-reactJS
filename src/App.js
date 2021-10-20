import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList'
import RegisterUser from './pages/RegisterUser'
import WorkLogs from './pages/WorkLogs'
import ManagersList from './pages/ManagersList'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useSelector} from 'react-redux'
import CreateWorkLogs from './components/CreateWorkLogs';
function App() {
  const currentUser = useSelector(state => state.currentUser)
  return (   
    <div className="App">
      {/* Bootstrap JS */}
      <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
      <Router>
        <Switch>
          {/* All the defined routes of the app */}
            <Route exact path="/Register" component={Register} />
              {currentUser.loggedIn?(<> 
                <Route exact path="/Dashboard" component={Dashboard} />
                <Route exact path="/Userslist" component={UsersList} />
                <Route exact path="/Managerslist" component={ManagersList} />
                <Route exact path="/Registeruser" component={RegisterUser} />
                <Route exact path="/Worklogs" component={WorkLogs}/>  
                <Route exact path="/CreateWorkLogs" component={CreateWorkLogs}/>           
             </>):<>
            <Route path="*" component={Login} />
            
            </>
            
            }
        </Switch>
      </Router>
      

    </div>
  );
}

export default App;
