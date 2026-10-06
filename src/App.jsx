import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);

  const inputNumber = (number) => {
    if (waitingForNumber) {
      setDisplay(number);
      setWaitingForNumber(false);
      return;
    }

    setDisplay(display === "0" ? number : display + number);
  };

  const inputDecimal = () => {
    if (waitingForNumber) {
      setDisplay("0.");
      setWaitingForNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearCalculator = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNumber(false);
  };

  const deleteNumber = () => {
    if (waitingForNumber) return;

    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const calculate = (first, second, operation) => {
    switch (operation) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "×":
        return first * second;

      case "÷":
        return second === 0 ? "Error" : first / second;

      default:
        return second;
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForNumber) {
      setOperator(nextOperator);
      return;
    }

    if (previous === null) {
      setPrevious(inputValue);
    } else if (operator) {
      const result = calculate(previous, inputValue, operator);

      setDisplay(String(result));
      setPrevious(result);
    }

    setWaitingForNumber(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator === null || previous === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(previous, inputValue, operator);

    setDisplay(String(result));
    setPrevious(null);
    setOperator(null);
    setWaitingForNumber(true);
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <div className="app">
      <div className="page-content">

        {/* Student Information */}
        <div className="student-info">
          <h3>JOHN EXODUS D. HERNANDEZ BSIT-3A</h3>
        </div>

        {/* Calculator */}
        <div className="calculator">

          <div className="calculator-header">
            <div>
              <h1>ShinyCalc</h1>
            </div>

            <div className="status-dot"></div>
          </div>

          {/* Display */}
          <div className="display">
            <span className="expression">
              {previous !== null && operator
                ? `${previous} ${operator}`
                : ""}
            </span>

            <span className="result">{display}</span>
          </div>

          {/* Buttons */}
          <div className="buttons">

            <button
              className="function"
              onClick={clearCalculator}
            >
              AC
            </button>

            <button
              className="function"
              onClick={deleteNumber}
            >
              DEL
            </button>

            <button
              className="function"
              onClick={handlePercent}
            >
              %
            </button>

            <button
              className="operator"
              onClick={() => chooseOperator("÷")}
            >
              ÷
            </button>

            <button onClick={() => inputNumber("7")}>7</button>
            <button onClick={() => inputNumber("8")}>8</button>
            <button onClick={() => inputNumber("9")}>9</button>

            <button
              className="operator"
              onClick={() => chooseOperator("×")}
            >
              ×
            </button>

            <button onClick={() => inputNumber("4")}>4</button>
            <button onClick={() => inputNumber("5")}>5</button>
            <button onClick={() => inputNumber("6")}>6</button>

            <button
              className="operator"
              onClick={() => chooseOperator("-")}
            >
              −
            </button>

            <button onClick={() => inputNumber("1")}>1</button>
            <button onClick={() => inputNumber("2")}>2</button>
            <button onClick={() => inputNumber("3")}>3</button>

            <button
              className="operator"
              onClick={() => chooseOperator("+")}
            >
              +
            </button>

            <button
              className="zero"
              onClick={() => inputNumber("0")}
            >
              0
            </button>

            <button onClick={inputDecimal}>.</button>

            <button
              className="equals"
              onClick={handleEquals}
            >
              =
            </button>

          </div>

          {/* Footer */}
          <div className="footer">
            <span>JEDH - Calculator</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
