import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {AuthProvider} from './context/auth'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import AuthRoute from './utils/AuthRoute';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MenuBar from './component/MenuBar.Component'
import SinglePost from './pages/SinglePost'
import EditProfile from './pages/EditProfile'
import AllProfiles from './pages/AllProfiles'
import Profile from './pages/Profile/Profile'

import Join from "./component/ChatComponents/Join/Join";
import Chat from "./component/ChatComponents/Chat/Chat"; 

function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <Route exact path="/posts/:postId" component={SinglePost} />
        <Route exact path="/profile/add" component={EditProfile} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/live" exact component={Join} />
        <Route path="/live/chat" exact component={Chat} /> 
        <Route path="/all" axact component={AllProfiles} /> 
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
