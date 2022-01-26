import React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/Calls';
import { IUserSearch } from '../api/Models';

interface IUsersViewProps {
  searchStr: string;
}
const UsersView: React.FC<IUsersViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IUserSearch>(searchStr, () => getUsers(searchStr));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching users.{error.message}</div>;
  if (!data) return <div>Data not available for this search.</div>;

  return (
    <div>
      Results!
      {data.items.map((user) => (
        <div>{user.login}</div>
      ))}
    </div>
  );
};

export default UsersView;
