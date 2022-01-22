import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ResetEmail from "../../components/home/profile/ResetEmail";
import { useAuth } from "../../firebase/AuthProvider";

const Login = () => {
  const [UserCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [ShowResetModal, setShowResetModal] = useState(false);
  const { logIn, currentUser }: any = useAuth();
  const router = useRouter();
  //
  const handleUserLogin = async (e: any) => {
    e.preventDefault();
    await logIn(UserCredentials.email, UserCredentials.password);
  };
  //
  const handleResetPassModal = () => {
    setShowResetModal(!ShowResetModal);
  };
  //
  useEffect(() => {
    if (currentUser?.email) {
      router.push("/");
    }
    console.log(currentUser);
  }, [currentUser]);
  //
  return (
    <div>
      <Form
        onSubmit={handleUserLogin}
        className="d-flex flex-column align-items-center text-center p-3"
      >
        <h3 className="text-center text-muted">Login</h3>
        <Form.Group id="emailLogin">
          <Form.Label>Your email</Form.Label>
          <Form.Control
            required
            type="email"
            value={UserCredentials.email}
            onChange={(e) =>
              setUserCredentials({ ...UserCredentials, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group id="passwordLogin">
          <Form.Label>Your Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={UserCredentials.password}
            onChange={(e) =>
              setUserCredentials({
                ...UserCredentials,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <hr />
        <Button type="submit">Login</Button>
      </Form>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <br />
        <div className="position-relative">
          {ShowResetModal && (
            <ResetEmail handleResetPassModal={handleResetPassModal} />
          )}
          <span>Forgot your password</span>
          <Button
            className="ml-2"
            size="sm"
            variant="info"
            onClick={handleResetPassModal}
          >
            Reset password
          </Button>
        </div>
        <Button variant="info" className="mt-1" size="sm">
          <Link href="register">
            <span style={{ color: "white" }}>Sign Up</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
