import { Switch, useLocation } from 'react-router-dom';
import Signup from './containers/Signup';
import Singin from './containers/Signin';
import Admin from './containers/Admin';
import Viewchecklist from "./containers/Viewchecklist";
import Publicroute from "./containers/Routing/Publicroute";
import Privateroute from "./containers/Routing/Privateroute";

function App() {
  const location = useLocation();

  return (
    <div>
      <Switch>
        <Publicroute path="/" exact component={Singin} />
        <Publicroute path="/Signup" exact component={Signup} />
        <Privateroute path="/Admin" exact component={Admin} />
        <Privateroute path={`/view/${location.pathname.split("/")[location.pathname.split("/").length - 1]}`} exact component={Viewchecklist} />
      </Switch>
    </div>
  );
}

export default App;
