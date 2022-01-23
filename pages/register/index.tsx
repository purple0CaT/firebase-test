import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../firebase/AuthProvider";

const Register = () => {
  const [UserCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { signUp, currentUser }: any = useAuth();
  //
  const handleUserLogin = async (e: any) => {
    e.preventDefault();
    if (UserCredentials.password === UserCredentials.repeatPassword) {
      const authorization = await signUp(
        UserCredentials.email,
        UserCredentials.password,
      );
      if (authorization) {
        setError("");
        router.push("/");
      }
    } else {
      setError("Password don't match");
    }
  };
  //
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div>
      <Form
        onSubmit={handleUserLogin}
        className="d-flex flex-column align-items-center text-center p-3"
      >
        <h3 className="text-center text-muted">Register</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group id="emailLogin">
          <Form.Label>Your email</Form.Label>
          <Form.Control
            required
            type="text"
            value={UserCredentials.email}
            onChange={(e) =>
              setUserCredentials({ ...UserCredentials, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group id="passwordLogin">
          <Form.Label>Your Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={UserCredentials.password}
            onChange={(e) =>
              setUserCredentials({
                ...UserCredentials,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group id="passwordLogin">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={UserCredentials.repeatPassword}
            onChange={(e) =>
              setUserCredentials({
                ...UserCredentials,
                repeatPassword: e.target.value,
              })
            }
          />
        </Form.Group>
        <hr />
        <Button type="submit">Register</Button>
        <br />
        <Button variant="info">
          <Link href="login">
            <span style={{ color: "white" }}>Login</span>
          </Link>
        </Button>
      </Form>
    </div>
  );
};

export default Register;
