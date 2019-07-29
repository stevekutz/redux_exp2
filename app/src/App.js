import React from 'react';
import './App.css';

import Title from './views/Title';
import TitleView from './views/TitleView';
import TitleComponent from './components/TitleComponent';
import Counter from './views/Counter';

import Tasks from './views/Tasks';

function App() {
  return (
    <div className="App">
        <div className = "allSharedState">
          <h4>All shared Same State</h4>
          <Title />
          <Title />
          <TitleView />
          <TitleComponent />
        </div>


        <div className = 'allDistinctState'>
            <h4> Each with Unique State</h4>
            <div className = 'task_counter_Container' >
            
              <div className = 'tasksMainContainer'>
                <Tasks />
              </div>

              <div className = 'counterMainContainer'>
                <Counter />
              </div>
  
            </div>
            
        </div>


   
    </div>
  );
}

export default App;
