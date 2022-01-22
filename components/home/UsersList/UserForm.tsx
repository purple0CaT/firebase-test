import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAddUser } from "../../../firebase/CrudHooks";

const UserForm = ({ reFetchUsers }: any) => {
  const [AddForm, setAddForm] = useState({ name: "", age: 0 });
  //
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useAddUser(AddForm);
    reFetchUsers();
    setAddForm({ name: "", age: 0 });
  };
  return (
    <Form
      onSubmit={createUser}
      className="d-flex flex-column align-items-center text-center p-3"
    >
      <Form.Group id="nameInput">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          value={AddForm.name}
          onChange={(e) => setAddForm({ ...AddForm, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group id="ageInput">
        <Form.Label>Your Age</Form.Label>
        <Form.Control
          type="text"
          value={AddForm.age}
          onChange={(e) =>
            setAddForm({ ...AddForm, age: parseInt(e.target.value) })
          }
        />
      </Form.Group>
      <hr />
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default UserForm;
