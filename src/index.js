import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

var wordBank = ["DRINK", "BUSTY", "WHALE", "TIMES", "SCOOP", "WEARY", "PILLS", "WEEDS"];
var ans = wordBank[Math.floor(Math.random() * 8)];
alert(ans);
class Square extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.color == 0) {
            return (
                <div className="grid-item" style={{ backgroundColor: "white", color: "black" }} ><b>{this.props.val}</b></div>
            );
        } else if (this.props.color == 1) {
            return (
                <div className="grid-item" style={{ backgroundColor: "#C9B458" }} ><b>{this.props.val}</b></div>
            );
        } else if (this.props.color == 2) {
            return (
                <div className="grid-item" style={{ backgroundColor: "#80b45c" }} ><b>{this.props.val}</b></div>
            );
        } else {
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
            currI: 0,
            word: 0,
        }
    }
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyPress);
    }

    handleKeyPress = event => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            let currI = this.state.currI;
            let valsTemp = this.state.vals.slice();
            let word = this.state.word;
            if (currI == 5)
                return;
            valsTemp[word * 5 + currI] = String(event.key).toUpperCase();
            // alert(currI + " "+valsTemp);
            this.setState({
                currI: currI + 1,
                vals: valsTemp
            });
        } else if (event.keyCode == 8) {
            let currI = this.state.currI;
            let valsTemp = this.state.vals.slice();
            let word = this.state.word;

            if (currI == 0)
                return;
            valsTemp[word * 5 + currI - 1] = "‎";
            // alert(currI + " "+valsTemp);
            this.setState({
                currI: currI - 1,
                vals: valsTemp
            });
        } else if (event.keyCode == 13) {
            let currI = this.state.currI;
            let word = this.state.word;
            let vals = this.state.vals;

            if (currI != 5)
                return;

            let imp = "";
            for (let i = 0;i<5;i++) {
                imp += String(vals[5 * word  + i]);
            }
            if (wordBank.includes(imp)) {
                let colorsTemp = this.state.colors.slice();
                let ansL=[];

                for(let i=0;i<5;i++){
                    if(imp.charAt(i)==ans.charAt(i)){
                        colorsTemp[5*word+i]=2;
                    }else{
                        ansL.push(ans.charAt(i));
                    }
                }
                for(let i=0;i<5;i++){
                  if(colorsTemp[5*word+i]!=2){
                    if(ansL.includes(imp.charAt(i))){
                        colorsTemp[5*word+i]=1;
                        ansL.splice(ansL.indexOf(imp.charAt(i)),1);
                    }else{
                        colorsTemp[5*word+i]=3;
                    }
                  }
                }
                alert(colorsTemp);
                this.setState({
                    word: word + 1,
                    currI: 0,
                    colors:colorsTemp,
                });
            }
        }
    };

    renderSquare(i) {
        return (<Square color={this.state.colors[i]} val={this.state.vals[i]} />);
    }
    render() {
        const stuff = [];
        for (let i = 0; i < 30; i++) {
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
