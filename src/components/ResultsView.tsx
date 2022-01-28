import React from 'react';
import { SearchSpace } from '../api/Models';
import UsersView from './UsersView';
import ReposView from './ReposView';
import styled from 'styled-components';

interface IProps {
  searchStr: string;
  searchSpace: SearchSpace;
}
const ResultsView: React.FC<IProps> = ({ searchStr, searchSpace }) => {
  if (searchStr.length === 0) return <div>Results</div>;

  return searchSpace === SearchSpace.USERS ? <UsersView searchStr={searchStr} /> : <ReposView searchStr={searchStr} />;
};

export default ResultsView;

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const RowItem = styled.div`
  width: 30%;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;
export const Card = styled.div`
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
