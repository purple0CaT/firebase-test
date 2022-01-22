import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../../firebase/AuthProvider";

const UpdateEmail = () => {
  const { updateUserEmail }: any = useAuth();
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState({
    newEmail: "",
    repeatNewEmail: "",
  });
  //
  const handleNewPassword = async (e: any) => {
    e.preventDefault();
    if (newEmail.newEmail === newEmail.repeatNewEmail) {
      updateUserEmail(newEmail.newEmail);
      setError("");
      setNewEmail({
        newEmail: "",
        repeatNewEmail: "",
      });
    } else {
      setError("Emails do not match");
    }
  };
  //   JSX
  return (
    <Form onSubmit={handleNewPassword}>
      <h5 className="text-white text-center">Change Email</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group
        id="newEmail"
        className="d-flex flex-column align-items-center text-white"
      >
        <Form.Label>Your new Email</Form.Label>
        <Form.Control
          required
          type="email"
          value={newEmail.newEmail}
          onChange={(e) =>
            setNewEmail({
              ...newEmail,
              newEmail: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group
        id="repeatNewEmail"
        className="d-flex flex-column align-items-center text-white"
      >
        <Form.Label>Repeat new Email</Form.Label>
        <Form.Control
          required
          type="email"
          value={newEmail.repeatNewEmail}
          onChange={(e) =>
            setNewEmail({
              ...newEmail,
              repeatNewEmail: e.target.value,
            })
          }
        />
      </Form.Group>
      <hr />
      <Button type="submit" variant="success">
        Update Email
      </Button>
    </Form>
  );
};

export default UpdateEmail;
