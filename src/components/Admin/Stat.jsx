import React from 'react';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const TableContainer = styled.div`
  width: 80%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f0f0f0;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 15px;
  font-size: 1.2rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

const TableCell = styled.td`
  padding: 15px;
  font-size: 1rem;
`;

const HitCell = styled.td`
  padding: 15px;
  font-size: 1rem;
  font-weight: bold;
`;

const GraphCell = styled.td`
  width: 50%;
  padding: 15px;
`;

const ProgressBar = styled.div`
  background-color: #e8f0fe;
  border-radius: 10px;
  overflow: hidden;
  height: 25px;
`;

const ProgressFill = styled.div`
  background-color: #4d8ef5;
  height: 100%;
  width: ${props => props.width}%;
`;

const PercentageCell = styled.td`
  padding: 15px;
  text-align: right;
  font-size: 1rem;
`;

const StatsData = [
  { day: '1일', hit: 12, percentage: 5 },
  { day: '1일', hit: 30, percentage: 20 },
  { day: '1일', hit: 20, percentage: 40 },
  { day: '1일', hit: 20, percentage: 17 },
  { day: '1일', hit: 20, percentage: 10 },
  { day: '1일', hit: 0, percentage: 5 },
  { day: '1일', hit: 0, percentage: 0 },
  { day: '1일', hit: 0, percentage: 0 },
  { day: '1일', hit: 0, percentage: 0 },
  { day: '1일', hit: 0, percentage: 0 },
  { day: '1일', hit: 0, percentage: 0 },
  { day: '1일', hit: 0, percentage: 0 },
];

const Stat = () => {
  return (
    <DashboardWrapper>
      <TableContainer>
        <Title>상점 접속 현황</Title>
        <StatsTable>
          <TableHead>
            <TableRow>
              <TableHeader>일별</TableHeader>
              <TableHeader>HIT</TableHeader>
              <TableHeader>접속 통계 그래프</TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {StatsData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.day}</TableCell>
                <HitCell>{row.hit}</HitCell>
                <GraphCell>
                  <ProgressBar>
                    <ProgressFill width={row.percentage} />
                  </ProgressBar>
                </GraphCell>
                <PercentageCell>{row.percentage}%</PercentageCell>
              </TableRow>
            ))}
          </tbody>
        </StatsTable>
      </TableContainer>
    </DashboardWrapper>
  );
};

export default Stat;
