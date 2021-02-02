import React, { Component } from 'react';
import appStyle from './App.css';
// import Radium, {StyleRoot}from 'radium';
import Person from '../components/Persons/Person/Person';
import styled from 'styled-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClasses from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../components/context/auth-context';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

class App extends Component {
  constructor(props){
      super(props);
      console.log('[App.js] constructor');
  }

  // ez az új syntax korábban this.state = .... al kellett akonstruktorban megadni a state állapotát
  state = {
    persons: [
      {id: '11', name: 'Max', age: 25},
      {id: '22', name: 'Manu', age: 21},
      {id: '33', name: 'Stephanie', age: 26}
    ],
    otherState: "This is an other state",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }
  
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);  
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillUnmount')
  // }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js], shouldComponentUpdate');
    return true;
}

  componentDidUpdate(){
    console.log('[App.js], componentDidUpdate');
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( (prevState, props) => {
      return {
          persons: persons, 
          changeCounter: prevState.changeCounter + 1
      }
     });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js, render]')
    const localStyle = {
      backgroundColor: "green",
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'balck'
      }
    };

    let persons = null;

    if(this.state.showPersons){
      persons = <Persons persons={this.state.persons} 
                        clicked={this.deletePersonHandler} 
                        changed={this.nameChangedHandler} 
                        isAuthenticated={this.state.authenticated}
                        />
      // localStyle.backgroundColor = 'red';
      // localStyle[':hover'] = {
      //   backgroundColor: 'lightred',
      //   color: 'balck'
      // }
    }

    return (
      // <StyleRoot>
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
         {this.state.showCockpit ? 
         <Cockpit title={this.props.appTitle} 
                  showPersons={this.state.showPersons} 
                  personsLength={this.state.persons.length} 
                  clicked={this.togglePersonHandler}
                  />
          : null}
          {persons}
          </AuthContext.Provider>
        </Aux>
      // </StyleRoot>
    );
  }
}

export default withClasses(App, appStyle.App);