import SingleUser from "./SingleUser";

const UserList = ({ UserCollection, reFetchUsers }: any) => {
  return (
    <>
      <h5>Users</h5>
      <ul>
        {UserCollection.length > 0 &&
          UserCollection.map((user: any, index: number) => (
            <SingleUser
              reFetchUsers={reFetchUsers}
              user={user}
              key={index + "asd"}
            />
          ))}
      </ul>
    </>
  );
};

export default UserList;
