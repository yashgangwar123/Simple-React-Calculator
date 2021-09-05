import './App.css';
import { useState } from 'react';

function App() {

  let [oldExpression, setOldExpression] = useState("")
  let [Expression, setExpression] = useState("0")
  let [prev, setPrev] = useState("ANS")  //default as ANS so that it starts value by deleting 0  

  let numerics = new Set("0123456789.()")
  let operators = new Set("+-*/")

  let buttons = ["(", ")", "%", "CE", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"]

  //when no. is entered this function will get called
  let putNumerics = (value) => {
    if (prev == "ANS") {
      setOldExpression("Ans = " + Expression);
      setExpression(value);
    } else {
      setExpression(Expression + value);
    }
    setPrev("NUM");
  };

  //when operator is entered this function will get called
  let putOperator = (value) => {
    if (prev != "OP") {
      setExpression(Expression + value);
    } else {
      setExpression(Expression.slice(0, -1) + value);
    }
    setPrev("OP");
  };

  //when backspace is entered this function will get called
  let putDelete = () => {
    if (Expression.length >= 1) {
      setExpression(Expression.slice(0, -1));
    }
    setPrev("DEL");
  };

  //when = is entered this function will get called
  let evaluateExpression = () => {
    try{
      let evalution = eval(Expression);
      setOldExpression(Expression + " =");
      setExpression(String(evalution));
      setPrev("ANS");
    }
    catch{
      setExpression("ERR")
      setPrev("ANS");
    }
  };


  let handleKeyUp = function (event) {
    console.log(event.key)
    if (numerics.has(event.key)) {         //to check if entered no. belongs to the set
      putNumerics(event.key)
    }
    else if (operators.has(event.key)) {    //to check if entered operator belongs to the set
      putOperator(event.key)
    }
    else if (event.key === "Backspace") {
      putDelete(event.key)
    }
    else if (event.key === "Enter") {
      evaluateExpression();
    }
  }

  
  return (
    <div className="App" style={{
      width: "100%",
      height: "100vh",
      background: "#999999",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",  //its for major axis i.e x in case of column
      alignItems: "center"       //its for minor axis i.e y in this case
    }} tabIndex={0} onKeyUp={handleKeyUp}>

      <div style={{
        padding: "10px",
        borderRadius: "10px",
        background: "#444444"
      }}>

        <h1 style={{
          color: "#ffffff",
          textAlign: "center"
        }}> My Awesome Calculator</h1>


        {/* FOR CALCULATION AREA */}
        <div style={{
          width: "400px",
          background: "#f7f3e1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "15px",
          margin: "20px",
          borderRadius: "15px"
        }}>
          <h6 style={{ margin: "6px" }}>{oldExpression}</h6>
          <h1 style={{ margin: "6px" }}>{Expression}</h1>
        </div>



        {/* FOR BUTTONS */}
        <div style={{
          width: "400px",
          background: "#f7f3e1",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "15px",
          margin: "20px",
          borderRadius: "15px",
          flexWrap: "wrap"
        }}>
          {buttons.map((buttonValue, index) => {
            return (
              <button
                style={{
                  backgroundColor: "#e6d37c",
                  width: "80px",
                  margin: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "5px"
                }}
                onClick={() => {
                  console.log(buttonValue)
                  if (numerics.has(buttonValue)) {
                    putNumerics(buttonValue)
                  }
                  else if (operators.has(buttonValue)) {
                    putOperator(buttonValue)
                  }
                  else if (buttonValue === "CE") {
                    putDelete(buttonValue)
                  }
                  else if (buttonValue === "=") {
                    evaluateExpression();
                  }
                }}>{buttonValue}</button>
            );
          })}
        </div>

      </div>
    </div>



  );
}

export default App;
