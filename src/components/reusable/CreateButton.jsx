import PropTypes from 'prop-types';

const CreateButton = ({ onClick }) => {
  <div>
    CreateButton
    <button type="button" onClick={onClick()}>
      Create
    </button>
  </div>;
};

CreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateButton;
