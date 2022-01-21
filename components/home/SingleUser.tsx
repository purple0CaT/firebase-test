import { useState } from "react";
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
    <li className="d-flex my-1 align-items-center position-relative">
      <p className="m-0 mr-2">
        {user.name}, {user.age}years
      </p>
      <button
        style={{ color: "green" }}
        onClick={() => setShowUpdateModal(!ShowUpdateModal)}
      >
        update
      </button>
      <button style={{ color: "red" }} onClick={handleDeleteUser}>
        delete
      </button>
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
