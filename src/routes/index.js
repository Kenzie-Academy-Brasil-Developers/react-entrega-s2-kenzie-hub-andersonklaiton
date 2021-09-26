import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import FormLogin from "../components/formLogin";
import FormRegistration from "../components/formRegistration";
import FormDashboard from "../components/formDashboard";
import FormLogout from "../components/formLogout";
const Routes = () => {
  const [autenticated, setAutenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@kenziehub:token"));
    if (token) {
      return setAutenticated(true);
    }
  }, [autenticated]);

  return (
    <>
      <FormLogout setAutenticated={setAutenticated} />
      <Switch>
        <Route exact path="/">
          <FormLogin
            autenticated={autenticated}
            setAutenticated={setAutenticated}
          />
        </Route>
        <Route path="/registration">
          <FormRegistration
            autenticated={autenticated}
            setAutenticated={setAutenticated}
          />
        </Route>
        <Route path="/dashboard">
          <FormDashboard
            autenticated={autenticated}
            setAutenticated={setAutenticated}
          />
        </Route>
      </Switch>
    </>
  );
};
export default Routes;
