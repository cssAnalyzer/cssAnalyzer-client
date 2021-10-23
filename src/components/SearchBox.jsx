import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = styled.input`
  border: solid 5px ${({ theme }) => theme.colors.PURPLE};
  width: calc(50vw + 1px);
  height: calc(7vh + 1px);
  font-size: 30px;

  :focus {
    outline: none;
  };

  @media (min-width: 280px) and (max-width: 480px) {
    {
      border: solid 3px ${({ theme }) => theme.colors.PURPLE};
      width: calc(70vw + 1px);
      height: calc(5vh + 1px);
      font-size: 20px;
    }
  }
`;

const InvisibleSubmit = styled.input`
  display: none;
`;

function SearchBox({
  onSubmit,
}) {
  const storedUrl = useSelector(state => state.data.inputurl);
  const [inputurl, setInputUrl] = useState(storedUrl);

  const handleChange = function ({ target }) {
    setInputUrl(target.value);
  };

  const handleSubmitBtn = async function (event) {
    event.preventDefault();
    await onSubmit(inputurl);
  };

  return (
    <form onSubmit={handleSubmitBtn}>
      <Input
        type="text"
        className="search"
        autoFocus="autoFocus"
        value={inputurl}
        onChange={handleChange}
      />
      <InvisibleSubmit
        type="submit"
      />
    </form>
  );
}

SearchBox.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBox;
