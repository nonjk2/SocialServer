import {Button} from "./style";

const CustomButton = ({theme, children, icon , size, border , onClick}) => (
  <Button theme={theme} size={size} onClick={onClick} border={border}>
    {children}
  </Button>
);

export default CustomButton;
