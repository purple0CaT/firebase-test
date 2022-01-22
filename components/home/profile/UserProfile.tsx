import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../../../firebase/AuthProvider";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
//
const UserProfile = () => {
  const { currentUser, logOut }: any = useAuth();
  // JSX
  return (
    <>
      <section className="d-flex justify-content-around align-items-center ">
        <h6 className="text-white m-0">{currentUser.email}</h6>
        <Button variant="danger" onClick={logOut}>
          SignOut
        </Button>
      </section>
      <hr />
      <Row>
        <Col xs="12" md="4">
          <UpdatePassword />
        </Col>
        <Col xs="12" md="4">
          <UpdateEmail />
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
