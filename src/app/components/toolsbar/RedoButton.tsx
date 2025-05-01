import IconButton from "./IconButton";
import { BiRedo } from "react-icons/bi";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const RedoButton = ({ onClick, disabled }: Props) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <BiRedo size={20} color="#888888" />
    </IconButton>
  );
};

export default RedoButton;
