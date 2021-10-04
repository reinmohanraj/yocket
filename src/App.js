import React from 'react';
import './App.css';
import VideoSegment from './components/VideoSegment/VideoSegment';
import CombineSegment from './components/CombineSegment/CombineSegment';

function App() {
  return (
    <div className="App">
      <VideoSegment />
      <CombineSegment />
    </div>
  );
}

export default App;
