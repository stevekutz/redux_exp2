# Basic Redux experiments

1) Set up app `create-react-app` app
2) Add dependencies
    - yarn add `react-redux redux` 

## Part 1) Demonstrate shared State between components

1) Set up the `store` (obj that holds state tree, e.g. app data). <Provider/> wraps entire application and `store` is passed into it.
    - Add to index.js
        ````
        `import {createStore} from 'redux';`
        `import {Provider} from 'react-redux';`
        `import rootReducer from './reducers/reducer';`
        `const store = createStore(rootReducer);`
        ````
        - `Use this method to allow debugging of store`
        ````
        const store = createStore(
        rootReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__()  
        );
        ````

    - wrap `<App/> in <Provider />`

    - #### pass in `store` as prop
    ````
    ReactDOM.render(
        <Provider store = {store}>
            <App />
        </Provider>, 
    document.getElementById('root'));
    ````

2) Build Container(e.g. state-aware `smart component`)
    - create Title container in `src/container` folder
    - import `connect` so we can allow `views` to access `store` data
        - import { connect } from 'react-redux';
    - leave placeholders for `action creators` (e.g. function that return `actions`(e.g. events/command pattern with `type` & `payload`)) This shold be updated AFTER 
        - // import {`some action creator`} from '../actions/actions';
    - defime initial state, handlers, JSX, ...
    ````
    class Title extends React.Component {
        state = {
            newTitleText: ''
        }

        handleChange = ev => {
            this.setState({
                [ev.target.name] : ev.target.value
            });
        }

        updateTitle = ev => {
            ev.preventDefault();
            this.props.updateTitle(this.state.newTitleText);
            this.setState({newTitleText: ''});    // reset input to blank
        }    

        render() {
            return (
                <div>
                <h2> {this.props.title}</h2> 
                <input 
                    type = 'text'
                    name = 'newTitleText'
                    value = {this.state.newTitleText}
                    onChange = {this.handleChange}
                />
                <button onClick = {this.updateTitle}> Update Title</button>
                </div>
            );
        }
    }

    ````
3) Use  `conect` as `HOC(Higher Order Component)` to map state to the props of `smart component` using `mapStateToProps`. Different parts of state tree are mapped here. MSTP(MapStateToProps).  

    ````
    const mapStateToProps = state => {
            return {
                title: state.title
            };
    };
    ````

    - #### Notice how `function currying (connect is called twice)` is used with `connect`
    -
        1) the `mapStateToProps` function is passed in
        2) `action creators` obj passed to props
        
            export default connect(
                mapStateToProps,
                {updateTitle}   // could be written {updateTitle: updateTitle}
            )(Title);
        
4) Update App component to include `Title` `smart component`
    ````
    import React from 'react';
    import './App.css';

    import Title from './components/Title';
    ````
    ````
    function App() {
    return (
        <div className="App">
            <Title />
        </div>
    );
    }

    export default App;
    ````
5) Build `actions`(sends data to `store` as obj with `action` and `payload`)
    - Define `action type` to avoid typos. 
    ````
    export const UPDATE_TITLE = 'UPDATE_TITLE';
    ````
    - Define `action creators`(may take take in an argument(data, props, etc.) but ALWAYS returns an `action` )
    - #### Remember that `actions` is an object that:
    1) MUST have a `type` property
    2) should have a `payload` property    
    ````
    export const changeTitle = title => {
        return {
            type: CHANGE_TITLE,
            payload: title
        };
    };

    ````
6) Build `reducers`(pure functions that accept `current state` and an `action` and provide a new state).  Each reducer manages a specific part of the app's state. Using the redux `combineReducers()` utility will combine all of the app's reducers into a `single index reducer` and helps manage cleary written code.
    - define titleReducer
        ````
        export const UPDATE_TITLE = 'UPDATE_TITLE';

        export function updateTitle(newTitle) {
            return{
                type: UPDATE_TITLE,
                payload: newTitle,
            };
        }
        ````
      - #### Your `smart-component` Title will map the state in as a props using 
        ````
        const mapStateToProps = state => {
            return {
                title: state.title   BEFORE Combine Reducers
                // title: state.titleReducer.title   // AFTER Combine Reducers
            };
        };
        ```` 
      - #### Without using `combineReducers()`, the `src/index.js` will be made aware of the state by importing the reducer that manages that portion of state.
        ````
        import rootReducer from './reducers/titleReducer';
        ````

    - define rootReducer
        ````
        import {combineReducers} from 'redux';

        import titleReducer from './titleReducer';

        export default combineReducers({
            titleReducer
        });    
        ````
7) Adding the following to either class components or functional components allows access of shared state via `this.props.title`
    ````
    const mapStateToProps = state => {
        return {
            title: state.titleReducer.title
        };
    };

    export default connect(
        mapStateToProps
    )(TitleView);
    ````


    - #### Saving as `index.js` allows us to be just define path as is when we import into our main `src/index.js` since`./reducers/` is equalivalent to `./reducers/index.js`.
    - ### We REPLACE  original rootReducer import in `.src/index.js` with
        ````
        import rootReducer from './reducers';
        ````
        - #### Now the `smart-component` Title will map the a specific slice of state in as a props using 
        ````
        const mapStateToProps = state => {
            return {
                //title: state.title   BEFORE Combine Reducers
                title: state.titleReducer.title   // AFTER Combine Reducers
            };
        };    
        ````



## Part 2) Demonstrate State used with Task List components

1) Define imports for `Tasks` component & `action creators`
    ```
    import React, {Component} from 'react';
    import {connect} from 'react-redux';

    import {addTask, toggleTask} from '../actions/actionsTasks';

    ````
2) Define `action types` and actual `action creaators`
    ````
    export const ADD_TASK = 'ADD_TASK';
    export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

    // addTask, toggleTask
    export const addTask = someNewTask => {   // random name
        console.log(' someNewTake ', someNewTask);

        return {
            type: ADD_TASK,
            payload: someNewTask //   random name
        };
    };


    export const toggleTask = id => {
        return {
            type: TOGGLE_COMPLETE,
            payload: id
        }
    } 
    ````
3) Define `reducers` in `/reducers/taskReducer.js`
    ````
    // export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

    import {ADD_TASK, TOGGLE_COMPLETE}   from '../actions/actionsTasks';

    const initialState = {
        tasks: [
            {description: 'write code', completed: false, id: 1},
            {description: 'debug code', completed: true, id: 2},
        ]
    }

    function taskReducer(state = initialState, action) {
        switch(action.type) {
            case ADD_TASK:
                return {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        {description: action.payload, completed: false, id: Date.now() }
                    ]    
                }
            
            case TOGGLE_COMPLETE:
                return {
                    ...state,
                    tasks: state.tasks.map(item => {
                        if(item.id === action.payload) {
                            return {
                                ...item,
                                completed: !item.completed
                            }
                        } else {
                            return item;
                        }         
                    })
                }

            default: 
                return state;
        }
    }

    export default taskReducer;
    ````
4) Add to bottom of `Tasks` component and then complete remainder of component
    ````
    const mapStateToProps = state => {
        return {
            //tasks: state.taskReducer.tasks   // WATCH this wiring to state
            tasks: state.tasks.tasks

        }
    }

    export default connect(
        mapStateToProps,
        {addTask, toggleTask}

    )(Tasks);
    ````
5) Add `taskReducer` to `combineReducers()`
    ````
    import taskReducer from './taskReducer';

    export default combineReducers({
        titleReducer,
        tasks: taskReducer
    });
    ````

6) To use `Font Awesome` icons, include the following in `public/index.html`
    ````
        <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
        />
    ````    
## Part 3) Demonstrate State used with Counter component
1) Define imports for `Counter` component & `action creators`
    ```
    import React, {Component} from 'react';
    import {connect} from 'react-redux';

    import {addTask, toggleTask} from '../actions/actionsTasks';
    ````
2) Define `action types` and actual `action creators`
    ````
    export const ADD_TASK = 'ADD_TASK';
    export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

    // addTask, toggleTask
    export const addTask = someNewTask => {   // random name
        console.log(' someNewTake ', someNewTask);

        return {
            type: ADD_TASK,
            payload: someNewTask //   random name
        };
    };


    export const toggleTask = id => {
        return {
            type: TOGGLE_COMPLETE,
            payload: id
        }
    } 
    ````
3) Define `reducers`
    ````
    // export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

    import {ADD_TASK, TOGGLE_COMPLETE}   from '../actions/actionsTasks';

    const initialState = {
        tasks: [
            {description: 'write code', completed: false, id: 1},
            {description: 'debug code', completed: true, id: 2},
        ]
    }

    function taskReducer(state = initialState, action) {
        switch(action.type) {
            case ADD_TASK:
                return {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        {description: action.payload, completed: false, id: Date.now() }
                    ]    
                }
            
            case TOGGLE_COMPLETE:
                return {
                    ...state,
                    tasks: state.tasks.map(item => {
                        if(item.id === action.payload) {
                            return {
                                ...item,
                                completed: !item.completed
                            }
                        } else {
                            return item;
                        }         
                    })
                }

            default: 
                return state;
        }
    }

    export default taskReducer;
    ````   
4) Add `counterReducer` to `combineReducers()`
    ````
    import counterReducer from './counterReducer';

    export default combineReducers({
        titleReducer,
        tasks: taskReducer,
        counterReducer
    });
    ````











- BLAH BLAH add store & Provider to App
- add folders inside src
    - actions - build actions.js
    - reducers - build reducers.js
    - components - build out Title Component
        - import connect & action creators
        - define `mapStateToProps`
        - define  `export default connect`
        - build class state, handlers, render
     - build out App   

#### run `yarn start` from app  to launch

### Reducers
- UPDATE TITLE
