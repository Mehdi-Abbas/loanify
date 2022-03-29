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
import BorrowerDetails from './screens/BorrowerDetails';
import InvestmentHistory from './screens/InvestmentHistory';
import LenderProfile from './screens/LenderProfile';
import SearchInvestor from './screens/SearchInvestor';
import BorrowerProfile from './screens/BorrowerProfile';
import RequestTracking from './screens/RequestTracking';
import ApprovedLoans from './screens/ApprovedLoans';
import DashboardInspection from './screens/DashboardInspection';
import ViewLenderRequest from './screens/ViewLenderRequest';
import ViewBorrowerRequest from './screens/ViewBorrowerRequest';
import ApprovedLenderRequest from './screens/ApprovedLenderRequest';
import ApprovedBorrowerRequest from './screens/ApprovedBorrowerRequest';
import RejectedLenderRequest from './screens/RejecteLenderRequest';
import RejectedBorrowerRequest from './screens/RejectedBorrowerRequest';
import LenderProfileEditor from './screens/LenderProfileEditor';
import BorrowerProfileEditor from './screens/BorrowerProfileEditor';
import LenderSetting from './screens/LenderSetting'

function App() {
  const { height } = UseWindowDimensions();
  return (

    <div style={{ display: 'flex', minHeight: height, flexDirection: "column", alignItems: 'center' }}>
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
                <Route path={`${url}/investmenthistory`} component={InvestmentHistory} />
                <Route
                  path={`${url}/profile`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={LenderProfile} exact />
                      <Route path={`${url}/profileeditor`} component={LenderProfileEditor} />
                    </>
                  )}
                />
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
                      <Route path={`${url}/borrowerdetails`} component={BorrowerDetails} />
                      <Route path={`${url}/lendersetting`} component={LenderSetting} />

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
                <Route path={`${url}/searchinvestor`} component={SearchInvestor} />
                <Route
                  path={`${url}/profile`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={BorrowerProfile} exact />
                      <Route path={`${url}/profileeditor`} component={BorrowerProfileEditor} />
                    </>
                  )}
                />
                <Route path={`${url}/requesttracking`} component={RequestTracking} />
                <Route path={`${url}/approvedloans`} component={ApprovedLoans} />
              </>
            )}
          />
          <Route
            path="/dashboardinspection"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={DashboardInspection} exact />
                <Route path={`${url}/viewlenderrequest`} component={ViewLenderRequest} />
                <Route path={`${url}/viewborrowerrequest`} component={ViewBorrowerRequest} />
                <Route path={`${url}/approvedlenderrequest`} component={ApprovedLenderRequest} />
                <Route path={`${url}/approvedborrowerrequest`} component={ApprovedBorrowerRequest} />
                <Route path={`${url}/rejectedlenderrequest`} component={RejectedLenderRequest} />
                <Route path={`${url}/rejectedborrowerrequest`} component={RejectedBorrowerRequest} />
              </>
            )}
          />
          
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