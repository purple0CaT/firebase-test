import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import UserList from "../components/home/UserList";
import { useAddUser, useGetUsers } from "../firebase/CrudHooks";

const Home: NextPage = ({ Users }: any) => {
  const [UserCollection, setUserCollection] = useState(Users);
  const [AddForm, setAddForm] = useState({ name: "", age: 0 });
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
  return (
    <main className=" p-4 d-flex flex-column w-100 h-100 align-items-start justify-content-start">
      <Row className="w-100">
        <Col xs="6">
          <UserList
            reFetchUsers={reFetchUsers}
            UserCollection={UserCollection}
          />
        </Col>
        <Col xs="6">
          <form
            onSubmit={createUser}
            className="d-flex flex-column align-items-center"
          >
            <label htmlFor="nameInput">Your Name</label>
            <input
              type="text"
              value={AddForm.name}
              id="nameInput"
              onChange={(e) => setAddForm({ ...AddForm, name: e.target.value })}
            />
            <label htmlFor="ageInput">Your Age</label>
            <input
              type="number"
              value={AddForm.age}
              id="ageInput"
              onChange={(e) =>
                setAddForm({ ...AddForm, age: parseInt(e.target.value) })
              }
            />
            <hr />
            <button type="submit">Add</button>
          </form>
        </Col>
      </Row>
    </main>
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
