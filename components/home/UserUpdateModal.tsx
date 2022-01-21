import { useState } from "react";
import { useUpdateUser } from "../../firebase/CrudHooks";
import styles from "../../styles/User.module.scss";

const UserUpdateModal = ({ handleCloseModal, user, reFetchUsers }: any) => {
  const [UpdateUserInfo, setUpdateUserInfo] = useState(user);
  //
  const updateInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name: UpdateUserInfo.name, age: UpdateUserInfo.age };
    const check = await useUpdateUser(UpdateUserInfo.id, data);
    if (check) {
      reFetchUsers();
      handleCloseModal();
    } else {
      alert("Error");
    }
  };
  return (
    <section className={styles.updateModal}>
      <form onSubmit={updateInfo}>
        <label htmlFor="nameInput">Your Name</label>
        <input
          type="text"
          value={UpdateUserInfo.name}
          id="nameInput"
          onChange={(e) =>
            setUpdateUserInfo({ ...UpdateUserInfo, name: e.target.value })
          }
        />
        <label htmlFor="ageInput">Your Age</label>
        <input
          type="number"
          value={UpdateUserInfo.age}
          id="ageInput"
          onChange={(e) =>
            setUpdateUserInfo({
              ...UpdateUserInfo,
              age: parseInt(e.target.value),
            })
          }
        />
        <hr />
        <div className="d-flex justify-content-between">
          <button type="submit">Update</button>
          <button onClick={handleCloseModal}>close</button>
        </div>
      </form>
    </section>
  );
};

export default UserUpdateModal;
