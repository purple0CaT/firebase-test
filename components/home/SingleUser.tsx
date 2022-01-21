import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDeleteUser, useUpdateUser } from "../../firebase/CrudHooks";
import UserUpdateModal from "./UserUpdateModal";

//
interface SingUserImprt {
  reFetchUsers: () => void;
  user: { name: string; age: number; id: string };
}
//
const SingleUser = ({ user, reFetchUsers }: SingUserImprt) => {
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [UpdateUserInfo, setUpdateUserInfo] = useState(user);
  //
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };
  //
  const handleDeleteUser = async () => {
    const check = await useDeleteUser(UpdateUserInfo.id);
    if (check) {
      reFetchUsers();
      setShowUpdateModal(false);
    } else {
      alert("Error");
    }
  };
  return (
    <li className="d-flex my-1 align-items-center position-relative justify-content-between">
      <p className="m-0 mr-2">
        {user.name}, {user.age}years
      </p>
      <Button
        variant="success"
        onClick={() => setShowUpdateModal(!ShowUpdateModal)}
      >
        update
      </Button>
      <Button variant="danger" onClick={handleDeleteUser}>
        delete
      </Button>
      {ShowUpdateModal && (
        <UserUpdateModal
          handleCloseModal={handleCloseModal}
          user={user}
          reFetchUsers={reFetchUsers}
        />
      )}
    </li>
  );
};

export default SingleUser;
