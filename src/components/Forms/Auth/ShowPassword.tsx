import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

type Props = {
  showPassword: boolean;
  handleToggleShowPassword: () => void;
};

function ShowPassword(props: Props) {
  const { showPassword, handleToggleShowPassword } = props;

  const handleMouseDownPassword = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleToggleShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

export default ShowPassword;
