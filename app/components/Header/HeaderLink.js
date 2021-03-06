import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #0011ff;
  color: #0011ff;

  &:active {
    border: 2px solid #ff0072;
    background: #ff0072;
    color: #fff;
  }

  ${props =>
    props.input &&
    css`
      background: #5edeff;
      color: white;
      border: 2px solid #5edeff;
    `};

  ${props =>
    props.database &&
    css`
      background: #71f442;
      color: white;
      border: 2px solid #71f442;
    `};
`;
