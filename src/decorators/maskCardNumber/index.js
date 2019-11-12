import React, { PureComponent } from 'react';

export const mask = (value) => {
  const pattern = (value.length < 18) ?
    /([\d*]{4}|[\d*]+)/g :
    /([\d*]{8}(?=[\d*]{8,})|[\d*]+)/g;

  return value
    .replace(pattern, (match) => `${match} `)
    .trim();
};

export const unmask = (value) => value
  .replace(/[^\d*]/g, '')
  .slice(0, 19);

const maskCardNumber = () => {
  return (InputComponent) => {
    class MaskedInput extends PureComponent {
      static getDerivedStateFromProps(props, state) {
        const { value } = props;
        
        return {
          value: mask(value),
        };
      }

      static checkSeparator(position, interval) {
        return Math.floor(position / (interval + 1));
      }

      constructor(props) {
        super(props);

        this.element = null;

        this.createRef = this.createRef.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
      }

      state = {
        cursorPosition: 0,
        value: '',
      };

      componentDidUpdate({ value: prevValue }) {
        const { value } = this.props;

        if (value === prevValue) {
          return;
        }

        const { cursorPosition } = this.state;
        const nextCursorPosition =
          cursorPosition -
          MaskedInput.checkSeparator(cursorPosition, 4) +
          MaskedInput.checkSeparator(cursorPosition + (mask(value).length - mask(prevValue).length), 4) +
          (value.length - prevValue.length);

        this.element.setSelectionRange(nextCursorPosition, nextCursorPosition);
      }

      createRef(element) {
        return (this.element = element);
      }

      handleChange(event) {
        const { onChange } = this.props;
        const { target: { value } } = event;
        const unmaskedValue = unmask(value);

        onChange(unmaskedValue);
      }

      handleKeyDown(event) {
        this.updateCursorPosition(event);
      }

      updateCursorPosition({ target: { selectionEnd } }) {
        this.setState({
          cursorPosition: selectionEnd,
        });
      }

      render() {
        const { cursorPosition, value } = this.state;
        console.log(cursorPosition)
        return (
          <InputComponent
            inputRef={this.createRef}
            value={value}

            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        );
      }
    };

    return MaskedInput;
  };
};

export default maskCardNumber;
