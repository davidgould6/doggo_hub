import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// Customs styling for the button for this page. 
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default StyledButton;