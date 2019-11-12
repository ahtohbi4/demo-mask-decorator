import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import InputCardNumber from './components/InputCardNumber';
import { mask as maskCardNumber } from './decorators/maskCardNumber';

import "./styles.css";

class App extends PureComponent {
  state = {
    value: '',
  };

  render() {
    const { value } = this.state;

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>

        <p>
          Значение: {value}<br />
          Форматированное значение: {maskCardNumber('420080******8001')}
        </p>

        <InputCardNumber
          value={value}

          onChange={(value) => this.setState({ value })}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
