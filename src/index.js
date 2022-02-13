import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.color == 0) {
            return (
                <div className="grid-item" style={{ backgroundColor: "white", color:"black"}} ><b>{this.props.val}</b></div>
            );
        } else if (this.props.color == 1) {
            return (
                <div className="grid-item" style={{ backgroundColor: "#C9B458" }} ><b>{this.props.val}</b></div>
            );
        } else if(this.props.color==2){
            return (
                <div className="grid-item" style={{ backgroundColor: "#80b45c" }} ><b>{this.props.val}</b></div>
            );
        }else{
            return (
                <div className="grid-item" style={{ backgroundColor: "#808080" }} ><b>{this.props.val}</b></div>
            );
        }

    }
}
class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //white,yellow,green, grey
            colors: new Array(30).fill(0),
            vals: new Array(30).fill("‎"),
            currI:0,
        }
    }
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress = event => {
        //alert(event.key);
        let currI=this.state.currI;
        let valsTemp=this.state.vals.slice();
        valsTemp[currI]=String(event.key).toUpperCase();
       // alert(currI + " "+valsTemp);
        this.setState({
            currI:currI+1,
            vals:valsTemp
        });
    };

    renderSquare(i) {
        return (<Square color={this.state.colors[i]} val={this.state.vals[i]}/>);
    }
    render() {
        const stuff=[];
        for(let i=0;i<30;i++){
            stuff.push(this.renderSquare(i));
        }
       // alert(this.state.vals);
        return (
            <div className="grid-container">
               {stuff}
            </div>
        );
    }
}
// ========================================

ReactDOM.render(
    <Grid></Grid>,
    document.getElementById('root')
);
