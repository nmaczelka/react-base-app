import React, { PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');  
    //     return state;
    //   }

    // PureComponent a lentebb látott kódot valósítja meg azaz a props változásait haosnlítja össze
    //   shouldComponentUpdate(nextProps, nextState){
    //       console.log('[Persons.js], shouldComponentUpdate');
    //     if(nextProps.persons !== this.props.persons || 
    //        nextProps.changed !== this.props.changed   ||
    //        nextProps.clcked !== this.props.clcked
    //        ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //   }
    
      getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js], getSnapshotBeforeUpdate');
        return {message: 'Snapshot!'};
      }

      componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js], componentDidUpdate');
        console.log(snapshot);
      }

      componentWillUnmount() {
          console.log('[Persons.js] componentWillUnmount');
      }

    render(){
    console.log('[Persons.js, rendering...]');
    return this.props.persons.map((person, index) => {
        return  <Person 
                name={person.name} 
                age={person.age} 
                key={person.id}
                click={() => this.props.clcked(index)}
                changed={(event) => this.props.changed(event, person.id)}
                />
      });
 } }
export default Persons;