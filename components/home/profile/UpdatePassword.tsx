import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../../firebase/AuthProvider";

const UpdatePassword = () => {
  const { updateUserPassword }: any = useAuth();
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });
  //
  const handleNewPassword = async (e: any) => {
    e.preventDefault();
    if (newPassword.newPassword === newPassword.repeatNewPassword) {
      updateUserPassword(newPassword.newPassword);
      setError("");
      setNewPassword({
        newPassword: "",
        repeatNewPassword: "",
      });
    } else {
      setError("Passwords do not match");
    }
  };
  //   JSX
  return (
    <Form onSubmit={handleNewPassword}>
      <h5 className="text-white text-center">Change password</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group
        id="newPass"
        className="d-flex flex-column align-items-center text-white"
      >
        <Form.Label>Your new password</Form.Label>
        <Form.Control
          type="password"
          required
          value={newPassword.newPassword}
          onChange={(e) =>
            setNewPassword({
              ...newPassword,
              newPassword: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group
        id="repeatNewPass"
        className="d-flex flex-column align-items-center text-white"
      >
        <Form.Label>Repeat new password</Form.Label>
        <Form.Control
          type="password"
          required
          value={newPassword.repeatNewPassword}
          onChange={(e) =>
            setNewPassword({
              ...newPassword,
              repeatNewPassword: e.target.value,
            })
          }
        />
      </Form.Group>
      <hr />
      <Button type="submit" variant="success">
        Update Password
      </Button>
    </Form>
  );
};

export default UpdatePassword;
