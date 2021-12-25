import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UseWindowDimensions from './components/Screensize';
import Login from './screens/Login'
import Signup from './screens/Signup'
import Forgetpassword from './screens/ForgetPassword'
import DashboardLender from './screens/DashboardLender';
import SetupLender from './screens/SetupLender'
import DashboardBorrower from './screens/DashboardBorrower'
import Investment from './screens/Investment';
import AllInvestments from './screens/AllInvestments'
import LoanDetail from './screens/LoanDetail';

function App() {
  const { height } = UseWindowDimensions();
  return (

    <div style={{ display: 'flex', height: height, flexDirection: "column", alignItems: 'center' }}>
      <Router>
        <Switch>
          {/* <Route exact path="/dashboardlender">
            <LenderNavigator />
          </Route> */}
          <Route
            path="/dashboardlender"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={DashboardLender} exact />
                <Route path={`${url}/setup`} component={SetupLender} />
                {/* <Route path={`${url}/investment`} component={Investment} /> */}
                <Route
                  path={`${url}/investment`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={Investment} exact />
                      <Route
                        path={`${url}/allinvestments`}
                        render={({ match: { url } }) => (
                          <>
                            <Route path={`${url}/`} component={AllInvestments} exact />
                            <Route path={`${url}/investmentdetail`} component={LoanDetail} />
                            

                          </>
                        )}
                      />
                      

                    </>
                  )}
                />
              </>
            )}
          />
          <Route
            path="/dashboardborrower"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={DashboardBorrower} exact />
                {/*<Route path={`${url}/setup`} component={SetupLender} />
                <Route path={`${url}/investment`} component={UserPage} /> */}
              </>
            )}
          />
          {/* <Route exact path="/dashboardborrower">
            <BorrowerNavigator />
          </Route> */}
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