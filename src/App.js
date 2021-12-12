import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UseWindowDimensions from './components/Screensize';
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Forgetpassword from './screens/ForgetPassword'


function App() {
  const { height } = UseWindowDimensions();
  return (

    <div style={{ display: 'flex', height: height, flexDirection: "column", alignItems: 'center' }}>
      <Router>
        <Switch>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;