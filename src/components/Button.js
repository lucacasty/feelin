// Button.jsx
const Button = ({ textContent, handleClick, disabled }) => {
  return (
    <button type="button" onClick={handleClick} disabled={disabled}>
      {textContent}
    </button>
  );
};

export default Button;