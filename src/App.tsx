import path from "path";
import { matchPath, Route, useParams , useHistory } from "react-router-dom";
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import { SignUp } from './components/SignUp';
import { IuserInfo } from './interfaces/Interfaces';

const userInfo: IuserInfo = {
  name: "Dikhyant Krishna Dalai",
  uid: "asdfah",
}

function App() {
  const history: any = useHistory();
  return (
    <div>
      <Route exact path="/" render={()=>(<SignIn history={history} />)} ></Route>
      <Route exact path="/:uid" render={()=>(<Profile />)}></Route>
    </div>
  );
}

export default App;
