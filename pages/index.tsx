import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UserList from "../components/home/UserList";
import { useAuth } from "../firebase/AuthProvider";
import { useAddUser, useGetUsers } from "../firebase/CrudHooks";

const Home: NextPage = ({ Users }: any) => {
  const [UserCollection, setUserCollection] = useState(Users);
  const [AddForm, setAddForm] = useState({ name: "", age: 0 });
  const { currentUser, logOut }: any = useAuth();
  const router = useRouter();
  //
  const reFetchUsers = async () => {
    const userData = await useGetUsers();
    setUserCollection(userData);
  };
  //
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useAddUser(AddForm);
    reFetchUsers();
    setAddForm({ name: "", age: 0 });
  };
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);
  return (
    <Container className="d-flex flex-column w-100 h-100 align-items-start justify-content-start">
      <Row className="w-100">
        {currentUser && (
          <Col
            xs="12"
            className="d-flex justify-content-around align-items-center p-3 w-100"
            style={{ backgroundColor: "grey" }}
          >
            <h6 className="text-white m-0">{currentUser.email}</h6>
            <Button variant="danger" onClick={logOut}>
              SignOut
            </Button>
          </Col>
        )}
        <Col xs="6" className="p-3">
          <UserList
            reFetchUsers={reFetchUsers}
            UserCollection={UserCollection}
          />
        </Col>
        <Col xs="6">
          <Form
            onSubmit={createUser}
            className="d-flex flex-column align-items-center text-center p-3"
          >
            <Form.Group id="nameInput">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                value={AddForm.name}
                onChange={(e) =>
                  setAddForm({ ...AddForm, name: e.target.value })
                }
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
        </Col>
      </Row>
    </Container>
  );
};

export const getStaticProps = async (ctx: any) => {
  const Users = await useGetUsers();
  return {
    props: {
      Users: Users,
    },
    revalidate: 1,
  };
};
//
export default Home;
