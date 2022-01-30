import React from 'react';
import { useQuery } from 'react-query';
import { getRepos } from '../api/Calls';
import { IRepoSearch } from '../api/Models';
import styled from 'styled-components';
import { Card, Container, IntermediateContainer, RowItem } from './ResultsView';
import moment from 'moment';

interface IReposViewProps {
  searchStr: string;
}
const ReposView: React.FC<IReposViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IRepoSearch>(searchStr, () => getRepos(searchStr));

  if (isLoading) return <IntermediateContainer>Loading...</IntermediateContainer>;
  if (error)
    return <IntermediateContainer>An error occurred while fetching repos.{error.message}</IntermediateContainer>;
  if (!data || data.items.length === 0)
    return <IntermediateContainer>Data not available for this search.</IntermediateContainer>;

  return (
    <Container>
      {data.items.map((repo, i) => (
        <RowItem key={i}>
          <Card>
            <h2>{repo.name}</h2>
            <Description>{repo.description}</Description>
            <div>Number of Forks: {repo.forks_count}</div>
            <div>Created: {moment(repo.created_at).format('MMM Do YY')}</div>
            <div>Owner: {repo.owner ? repo.owner.login : 'N/A'}</div>
            <Link href={repo.html_url} target="_blank">
              {repo.html_url}
            </Link>
          </Card>
        </RowItem>
      ))}
    </Container>
  );
};

export default ReposView;

const Description = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;
const Link = styled.a`
  margin-top: 10px;
  text-align: center;
`;
