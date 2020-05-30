import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/homepage.component';

const TopicList = (props) => {
  return(
  <div>
    <h1>Topic List Page </h1>
  </div>
)};

const TopicDetail = (props) => (
  <div>
    <h1>Topic Detail Page: {props.match.params.topicId} </h1>
  </div>
);



function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/topics" component={TopicList} />
        <Route path="/topics/:topicId" component={TopicDetail} />
      </Switch>
    </div>
  );
}

export default App;
