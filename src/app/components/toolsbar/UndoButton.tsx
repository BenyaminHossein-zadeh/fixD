import IconButton from "./IconButton";
import { BiUndo } from "react-icons/bi";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const UndoButton = ({ onClick, disabled }: Props) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <BiUndo size={20} color="#888888" />
    </IconButton>
  );
};

export default UndoButton;
