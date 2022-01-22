import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../../firebase/AuthProvider";

const Login = () => {
  const [UserCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { logIn, currentUser }: any = useAuth();
  const router = useRouter();
  //
  const handleUserLogin = async (e: any) => {
    e.preventDefault();
    await logIn(UserCredentials.email, UserCredentials.password);
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
        <br />
        <Button variant="info">
          <Link href="register">
            <span style={{ color: "white" }}>Sign Up</span>
          </Link>
        </Button>
      </Form>
    </div>
  );
};

export default Login;
