import React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../api/Calls';
import { IUserSearch } from '../api/Models';
import styled from 'styled-components';
import { Container, RowItem, Card, IntermediateContainer } from '../components/ResultsView';

interface IUsersViewProps {
  searchStr: string;
}
const UsersView: React.FC<IUsersViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IUserSearch>(searchStr, () => getUsers(searchStr));

  if (isLoading) return <IntermediateContainer>Loading...</IntermediateContainer>;
  if (error)
    return <IntermediateContainer>An error occurred while fetching users.{error.message}</IntermediateContainer>;
  if (!data || data.items.length === 0)
    return <IntermediateContainer>Data not available for this search.</IntermediateContainer>;

  return (
    <Container>
      {data.items.map((user, index) => (
        <RowItem key={index}>
          <Card>
            <Avatar src={user.avatar_url} alt="user avatar" />
            <h2>{user.login}</h2>
            <Score>Score: {user.score}</Score>
            <a href={user.html_url} target="_blank">
              {user.html_url}
            </a>
          </Card>
        </RowItem>
      ))}
    </Container>
  );
};

export default UsersView;

const Avatar = styled.img`
  height: 75px;
  width: 75px;
`;
const Score = styled.div`
  font-size: 11pt;
  margin-bottom: 10px;
`;
