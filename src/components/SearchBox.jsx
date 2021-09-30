import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Input = styled.input`
  border: solid 6px ${({ theme }) => theme.colors.PURPLE};
  width: 1000px;
  height: 100px;
  font-size: 40px;

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

  const handleSubmitBtn = async function () {
    await onSubmit({ inputUrl });
  };

  return (
    <form>
      <Input
        type="text"
        className="search"
        autofocus="autoFocus"
        value={inputUrl}
        onChange={handleChange}
      />
      <button
        display="none"
        type="button"
        onClick={handleSubmitBtn}
      />
    </form>
  );
}

SearchBox.propTypes = {
  inputUrl: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default SearchBox;
