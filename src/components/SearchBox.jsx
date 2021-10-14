import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = styled.input`
  border: solid 6px ${({ theme }) => theme.colors.PURPLE};
  width: calc(40vw + 1px);
  height: calc(10vh + 1px);
  font-size: 40px;
  margin-right: 50px;

  :focus {
    outline: none;
  };
`;

function SearchBox({
  onSubmit,
}) {
  const [inputUrl, setInputUrl] = useState("");

  const handleChange = function ({ target }) {
    setInputUrl(target.value);
  };

  const handleSubmitBtn = async function (event) {
    event.preventDefault();
    await onSubmit(inputUrl);
  };

  return (
    <form onSubmit={handleSubmitBtn}>
      <Input
        type="text"
        className="search"
        autoFocus="autoFocus"
        value={inputUrl}
        onChange={handleChange}
      />
      <button
        display="none"
        visibility="hidden"
        type="submit"
      />
    </form>
  );
}

SearchBox.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBox;
