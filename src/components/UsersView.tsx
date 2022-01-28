import React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/Calls';
import { IUserSearch } from '../api/Models';
import styled from 'styled-components';

/**
 * For the users, show the profile picture, name,
 * location, any other data you have and link to
 * their profile.
 */
interface IUsersViewProps {
  searchStr: string;
}
const UsersView: React.FC<IUsersViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IUserSearch>(searchStr, () => getUsers(searchStr));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching users.{error.message}</div>;
  if (!data) return <div>Data not available for this search.</div>;

  return (
    <Card>
      {data.items.map((user, index) => (
        <div key={index}>
          <Avatar src={user.avatar_url} alt="user avatar" />
          <div>{user.login}</div>
          <div>Score: {user.score}</div>
          <a href={user.html_url}>{user.html_url}</a>
        </div>
      ))}
    </Card>
  );
};

export default UsersView;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
`;
