import React, {Component} from 'react';
import classes from './Person.css';
import styled from 'styled-components';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../components/context/auth-context';

const SyledDiv = styled.div`
            width: 60%;
            margin: 16px auto;
            border: 1px solid #eee;
            box-shadow: 0 2px 3px #ccc;
            padding: 16px;
            text-align: center;

            @media (min-width: 500px) {
                width: 450px;
            } 
            `;

class Person extends Component {
//     const style = {
//         '@media (min-width: 500px)': {
//             width: '450px'
//         }
//     };

    // const rnd = Math.random();
    // if(rnd > 0.7) {
    //     throw new Error("Something went wrong");
    // }
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount(){
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render () {
        console.log('[Person.js, rendering...]');
        return (
            // <div className="Person" style={style}>
            // <SyledDiv>
            //     <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            //     <p>{props.children}</p>
            //     <input type="text" onChange={props.changed} value={props.name} /> 
            // </SyledDiv>
         
    
            // <div className={classes.Person}>
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in!</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" 
                        onChange={this.props.changed} 
                        value={this.props.name} 
                        ref={ (inputEl) => {this.inputElement = inputEl}}
                        ref={this.inputElementRef}
                        /> 
            </Aux>
        // </div>
            )
    }
    
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);