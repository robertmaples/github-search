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
    <Container>
      {data.items.map((user, index) => (
        <RowItem>
          <Card key={index}>
            <Avatar src={user.avatar_url} alt="user avatar" />
            <h2>{user.login}</h2>
            <Score>Score: {user.score}</Score>
            <a href={user.html_url}>{user.html_url}</a>
          </Card>
        </RowItem>
      ))}
    </Container>
  );
};

export default UsersView;

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const RowItem = styled.div`
  width: 30%;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;
const Avatar = styled.img`
  height: 75px;
  width: 75px;
`;
const Score = styled.div`
  font-size: 11pt;
  margin-bottom: 10px;
`;
