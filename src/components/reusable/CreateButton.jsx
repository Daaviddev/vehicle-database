import PropTypes from 'prop-types';

const CreateButton = ({ onClick }) => {
  return (
    <button type="button" className="create-button" onClick={onClick}>
      Create New
    </button>
  );
};

CreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateButton;
