import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 0.25rem 0;
`;
const StyledInput = styled.input`
  padding: 0.25rem;
`;

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <StyledWrapper>
      <label htmlFor={elementId}>{label}</label>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </StyledWrapper>
  );
}

export default TextInputWithLabel;
