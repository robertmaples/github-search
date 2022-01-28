import React from 'react';
import { useQuery } from 'react-query';
import { getRepos } from '../api/Calls';
import { IRepoSearch } from '../api/Models';
import styled from 'styled-components';
import { Card, Container, RowItem } from './ResultsView';
import moment from 'moment';

/**
 * For each repository display the repository user
 * details returned from API and the repository name,
 * author, stars and other statistics below it.
 */
interface IReposViewProps {
  searchStr: string;
}
const ReposView: React.FC<IReposViewProps> = ({ searchStr }) => {
  const { isLoading, error, data } = useQuery<any, Error, IRepoSearch>(searchStr, () => getRepos(searchStr));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching repos.{error.message}</div>;
  if (!data) return <div>Data not available for this search.</div>;

  console.log('data', data);

  return (
    <Container>
      {data.items.map((repo, i) => (
        <RowItem key={i}>
          <Card>
            <h2>{repo.name}</h2>
            <Description>{repo.description}</Description>
            <div>Number of Forks: {repo.forks_count}</div>
            <div>Created: {moment(repo.created_at).format('MMM Do YY')}</div>
            <div>Owner: {repo.owner.login}</div>
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
