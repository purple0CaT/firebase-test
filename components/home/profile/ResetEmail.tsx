import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../../firebase/AuthProvider";
import styles from "../../../styles/login.module.scss";
//
//
const ResetEmail = ({ handleResetPassModal }: any) => {
  const [SuccessPassReset, setSuccessPassReset] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const { resetPassword }: any = useAuth();
  //
  const handleResetPass = async (e: any) => {
    e.preventDefault();
    await resetPassword(recoveryEmail);
    setSuccessPassReset(true);
    setTimeout(() => {
      setSuccessPassReset(false);
      handleResetPassModal();
    }, 3000);
  };
  return (
    <div className={styles.resetEmail}>
      <Form className={styles.resetForm} onSubmit={handleResetPass}>
        {SuccessPassReset && <Alert variant="success">Password reseted!</Alert>}
        <Form.Group id="recoverPassword">
          <Form.Label>Your email address</Form.Label>
          <Form.Control
            type="email"
            required
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button type="submit" size="sm">
            Recover password
          </Button>
          <Button
            onClick={handleResetPassModal}
            size="sm"
            variant="outline-info"
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetEmail;
