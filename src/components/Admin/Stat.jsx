import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StatsData = [
  { name: '1일', hit: 12, percentage: 5 },
  { name: '1일', hit: 30, percentage: 20 },
  { name: '1일', hit: 20, percentage: 40 },
  { name: '1일', hit: 20, percentage: 17 },
  { name: '1일', hit: 20, percentage: 10 },
  { name: '1일', hit: 0, percentage: 5 },
  { name: '1일', hit: 0, percentage: 0 },
  { name: '1일', hit: 0, percentage: 0 },
  { name: '1일', hit: 0, percentage: 0 },
  { name: '1일', hit: 0, percentage: 0 },
  { name: '1일', hit: 0, percentage: 0 },
  { name: '1일', hit: 0, percentage: 0 },
];


const Stat = () => {
  const [category, setCategory] = useState('일별');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const averageHit = StatsData.reduce((sum, row) => sum + row.hit, 0) / StatsData.length;
  const totalHit = StatsData.reduce((sum, row) => sum + row.hit, 0);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <DashboardWrapper>
      <TableContainer>
        <HeaderContainer>
          <Title>상점 접속 현황</Title>
          <CategorySelect value={category} onChange={handleCategoryChange}>
            <option value="일별">일별</option>
            <option value="월별">월별</option>
            <option value="요일별">요일별</option>
            <option value="시간별">시간별</option>
            <option value="업체별">업체별</option>
          </CategorySelect>
        </HeaderContainer>
        <SearchSection style={{whiteSpace: 'nowrap'}}>
          <div>
            <label>기간: </label>
            <DateInput 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            /> - 
            <DateInput 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          </SearchSection>
        <StatsTable>
          <TableHead>
            <TableRow>
              <TableHeader>{category}</TableHeader>
              <TableHeader>HIT</TableHeader>
              <TableHeader>접속 통계 그래프</TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {StatsData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <HitCell>{row.hit}</HitCell>
                <GraphCell>
                  <ProgressBar>
                    <ProgressFill width={row.percentage} />
                  </ProgressBar>
                </GraphCell>
                <PercentageCell>{row.percentage}%</PercentageCell>
              </TableRow>
            ))}
            {/* 평균, 총계, 누적 총계 섹션 */}
            <SummaryRow>
              <TableCell>평균</TableCell>
              <HitCell>{averageHit.toFixed(1)}</HitCell>
              <GraphCell>
                <ProgressBar>
                  <ProgressFill width={averageHit / 30 * 100} />
                </ProgressBar>
              </GraphCell>
              <PercentageCell>{((averageHit / 30) * 100).toFixed(0)}%</PercentageCell>
            </SummaryRow>
            <SummaryRow>
              <TableCell>총계</TableCell>
              <HitCell>{totalHit}</HitCell>
              <GraphCell>
                <ProgressBar>
                  <ProgressFill width={totalHit / 30 * 100} />
                </ProgressBar>
              </GraphCell>
              <PercentageCell>{((totalHit / 30) * 100).toFixed(0)}%</PercentageCell>
            </SummaryRow>
            <SummaryRow>
              <TableCell>누적 총계</TableCell>
              <HitCell>0</HitCell>
              <GraphCell>
                <ProgressBar>
                  <ProgressFill width={0} />
                </ProgressBar>
              </GraphCell>
              <PercentageCell>0%</PercentageCell>
            </SummaryRow>
          </tbody>
        </StatsTable>
      </TableContainer>
    </DashboardWrapper>
  );
};

export default Stat;



const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3% 10px;
  align-items: center;
  margin-left: 280px;
  @media(max-width: 780px){
    margin-left: 0px;
    margin-top: 4%;
  }
`;

const TableContainer = styled.div`
  width: 95%;
  margin: 2% 0;
  @media(max-width: 780px){
    width: 90%;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: bold;
  @media(max-width: 780px){
    font-size: 1.9rem;
  }
`;
const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media(max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const CategorySelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
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
  align-items: center;
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
  align-items: center;
`;
const DateInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: auto;

  @media(max-width: 780px) {
    max-width: 700px;
    width: 70%;
  }
`;

const SummaryRow = styled.tr`
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;
`;