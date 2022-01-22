import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import UserProfile from "../components/home/profile/UserProfile";
import UserForm from "../components/home/UsersList/UserForm";
import UserList from "../components/home/UsersList/UserList";
import { useAuth } from "../firebase/AuthProvider";
import { useGetUsers } from "../firebase/CrudHooks";

const Home: NextPage = ({ Users }: any) => {
  const [UserCollection, setUserCollection] = useState(Users);
  const { currentUser, logOut }: any = useAuth();
  const router = useRouter();
  //
  const reFetchUsers = async () => {
    const userData = await useGetUsers();
    setUserCollection(userData);
  };
  //
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);
  return (
    <Container>
      <Row>
        {currentUser && (
          <Col
            xs="12"
            className="p-3 w-100"
            style={{ backgroundColor: "grey" }}
          >
            <UserProfile />
          </Col>
        )}
        <Col xs="6" className="p-3">
          <UserList
            reFetchUsers={reFetchUsers}
            UserCollection={UserCollection}
          />
        </Col>
        <Col xs="6">
          <UserForm reFetchUsers={reFetchUsers} />
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
