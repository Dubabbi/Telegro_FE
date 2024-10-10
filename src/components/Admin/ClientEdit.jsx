import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { Postcode } from '../Postcode/Postcode'; // 우편번호 검색 컴포넌트
import * as D from './NoticeDetail/NoticeDetailStyle';
import { VscWhitespace } from 'react-icons/vsc';
const Container = styled.div`
  width: 65%; 
  margin-left: 25%;
  margin-top: 4%;
  @media(max-width: 780px){
    width: 100%; 
    margin-left: 0px;
    margin-top: 10%;
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: #f2f2f2;
  height: auto;
  border: 1px solid #E0E0E0;
  padding: 1.7% 2%;
  margin-top: 1.1%;
  color: white;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 1%;
`;

const SectionTitleWrapper = styled.div`
  background-color: #f2f2f2; 
  padding: 1%;
  @media(max-width: 780px){
    padding: 3%;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  margin-left: 1%;
  @media(max-width: 780px){
    font-size: 1.9rem;
  }
`;

const FormWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 레이아웃 */
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1.7rem;
  font-weight: bold;
  @media(max-width: 780px){
    font-size: 1.45rem;
    white-space: nowrap;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 1%;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 1%;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  grid-column: span 2; /* 버튼을 2열 차지하도록 설정 */
  padding: 10px;
  background-color: #4D44B5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #3b3a9d;
  }
`;

const InlineFormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 그리드 레이아웃 */
  gap: 20px;
  grid-column: span 2; /* 2열을 차지하도록 설정 */
`;

const ContactFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.97fr 0.97fr 2fr; /* 1:1:2 비율로 배치 */
  gap: 2%;
  max-width: 100%;
  grid-column: span 2; /* 전체 열을 차지 */
`;

function ClientEdit() {
  const [form, setForm] = useState({
    companyName: '',
    phone: '',
    username: '',
    password: '',
    email: '',
    priceApplication: '',
    contactName: '',
    contactPhone: '',
    businessName: '',
    businessNumber: '',
    address: '',
    zipCode: '',
    detailAddress: '',
    industry: '',
    category: '',
  });

  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setForm((prevState) => ({
      ...prevState,
      address: fullAddress,  // 도로명 주소 설정
      zipCode: zonecode,     // 우편번호 설정
    }));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
  };

  return (
    <>
    <Container>
      <Title>회원 정보 수정</Title>
      <FormWrapper>
        <SectionTitleWrapper>
          <SectionTitle>공급업체 회원가입</SectionTitle>
        </SectionTitleWrapper>
        <div style={{ padding: '2%' }}>
          <Form onSubmit={handleSubmit}>
            <div>
              <Label>회원명 *</Label>
              <Input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>전화번호 *</Label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* 아이디, 비밀번호, 이메일, 단가적용을 한 줄로 정렬 */}
            <InlineFormWrapper>
              <div>
                <Label>아이디 *</Label>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>비밀번호 *</Label>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>이메일 *</Label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>단가적용 *</Label>
                <Select
                  name="priceApplication"
                  value={form.priceApplication}
                  onChange={handleChange}
                  required
                >
                  <option value="">단가 선택</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </Select>
              </div>
            </InlineFormWrapper>

            {/* 담당자 이름, 담당자 전화번호, 상호명 1:1:2 비율로 배치 */}
            <ContactFormWrapper>
              <div>
                <Label>담당자 이름 *</Label>
                <Input
                  style={{width: '97%'}}
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>담당자 전화번호 *</Label>
                <Input
                  style={{width: '97%'}}
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>상호명 *</Label>
                <Input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
            </ContactFormWrapper>
            <div>
              <Label>주소 *</Label>
              <div style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }}>
                <Input
                  name="address"
                  value={form.address}
                  placeholder="주소를 검색해 주세요."
                  readOnly
                />
                <SearchButton>
                <Postcode onComplete={handleAddressComplete} />
                </SearchButton>
              </div>
            </div>
            <div>
              <Label>사업자 번호 *</Label>
              <Input
                name="businessNumber"
                value={form.businessNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>우편번호 *</Label>
              <Input
                name="zipCode"
                value={form.zipCode}
                readOnly
              />
            </div>
            <div>
              <Label>업태 *</Label>
              <Input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>상세주소 *</Label>
              <Input
                name="detailAddress"
                value={form.detailAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>종목 *</Label>
              <Input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
          </Form>
        </div>
      </FormWrapper>
    </Container>
        <D.BtWrap style={{ width: '70%', marginLeft: '22.5%', marginBottom: '3%'}}>
        <D.BtLink as={Link} to="/admin/clientmanagement">
                취소
              </D.BtLink>
              <D.BtLink as={Link} to="">
                등록
              </D.BtLink>
            </D.BtWrap>
        </>
  );
}

export default ClientEdit;
