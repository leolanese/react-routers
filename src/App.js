import React from 'react';
import "./App.css";

import { Link, BrowserRouter as Router, Route, Redirect, Switch, useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { Users, Location, Match } from './resources/objects';
import { Nestings } from './resources/Nestings';
import { Blocked } from './resources/Blocked';

const LandingPage = () => <h3>Landing Page</h3>;

const AboutPage = () => <h3>About Page</h3>;

// passing props to the route component directly.
const PropsPage = ({ title }) => <h3>{title}</h3>

// React router pass two props to all the component
const UsersPage = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <>
      <h3>Users Page</h3>
      {Users.map((users, index) => (
        <h5 key={index}>
          {/* passing a dynamic route params to the component */}
          <Link to={`/user/${index + 1}`}>{users.name}'s Page (state) </Link>
        </h5>
      ))}
      <p>
        <strong>Match Props: </strong>
        <code>{JSON.stringify(Match, null, 2)}</code>
      </p>
      <p>
        <strong>Location Props: </strong>
        <code>{JSON.stringify(Location, null, 2)}</code>
      </p>
      <p>Current URL: {pathname}</p>
      <button onClick={() => history.push('/about') } >Go to About!</button>
    </>
  );
};

const UserPage = ({ match, location }) => {
  //  destructuring the object when landing on new url route
  const { params: { userId }  } = match;
  console.table(match);

  return (
    <>
      <p>
        <strong>User ID: </strong>
        {userId}
      </p>
      <p>
        <strong>User Name: </strong>
        {Users[userId - 1].name}
      </p>
    </>
  );
};

const App = () => {

  return (
    <section className="App">
      <Router>
        <main>
          <nav>
            <ul>
              <li><Link to="/">My Profile</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/props-with-render">Props with render</Link></li>
              <li><Link to="/props-with-component">Props with component</Link></li>
              <li><Link to="/nestings">Nesting the Routers</Link></li>
              <li><Link to="/blocking">Blocking Access</Link></li>
              <li><Link to="/404">Redirecting to New page</Link></li>
            </ul>
          </nav>

          {/* Use a <Switch> any time we have multiple routes, but you want only one of them to render at a time */}
          <Switch>
            {/* React Router v5 using "exact" inclusive routing */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/user/:userId" component={UserPage} />

            {/* Passing function as a component props in Route component using recommended props-with-component */}
            <Route exact path="/props-with-component" render={(props) => <PropsPage {...props} title={`Props with component`} />} />

            {/* Passing function as a component props in Route component using recommended props-with-render */}
            <Route exact path="/props-with-render" render={(props) => <PropsPage {...props} title={`Props with render`} />} />

            <Route path="/nestings">
              <Nestings />
            </Route>

            <Route path="/blocking" exact children={<Blocked />} />

            <Redirect exact from="/redirecting" to="/404" />
            <Route exact path="/404" render={() => <h1>404: page not found</h1>} />

          </Switch>
        </main>
      </Router>
    </section>
  );
};


export default App;
