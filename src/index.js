import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  NavLink as Link,
  Route
} from 'react-router-dom';

const Home = React.lazy(() => import('./components/Home'));
const Page2 = React.lazy(() => import('./components/Page2'));
const Page3 = React.lazy(() => import('./components/Page3'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Link exact to="/">
          Home
        </Link>
        <Link to="/page2">
          Page2
        </Link>
        <Link to="/page3">
          Page3
        </Link>
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
      </Switch>
    </Suspense>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
