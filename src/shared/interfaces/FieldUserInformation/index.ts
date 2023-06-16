import { UseUpdateUserModalArgs } from "../../../hooks/modalHooks/UpdateUser/useUpdateUserModal";

interface FieldUserInformation {
  name: string;
  value: string;
  icon: JSX.Element;
  updateButtonProps: UseUpdateUserModalArgs;
}

export default FieldUserInformation;
