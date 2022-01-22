import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useUpdateUser } from "../../../firebase/CrudHooks";
import styles from "../../../styles/User.module.scss";

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
      <h6>Update Profile</h6>
      <hr className="w-100" />
      <Form onSubmit={updateInfo}>
        <Form.Group id="nameInputUpdate">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            value={UpdateUserInfo.name}
            onChange={(e) =>
              setUpdateUserInfo({ ...UpdateUserInfo, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group id="ageInputUpdate">
          <Form.Label>Your Age</Form.Label>
          <Form.Control
            type="text"
            value={UpdateUserInfo.age}
            onChange={(e) =>
              setUpdateUserInfo({
                ...UpdateUserInfo,
                age: parseInt(e.target.value),
              })
            }
          />
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-between w-100">
          <Button type="submit">Update</Button>
          <Button variant="danger" onClick={handleCloseModal}>
            close
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default UserUpdateModal;
