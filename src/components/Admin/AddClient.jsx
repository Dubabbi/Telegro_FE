import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 78%; /* 좌측 내비게이션 바를 제외한 나머지 영역 */
  margin-left: 22%;
  margin-top: 4%;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 레이아웃 */
  gap: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
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

const AddressSearchButton = styled.button`
  background-color: #e0e0e0;
  border: none;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 5px;
`;

function AddClient() {
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

  const handleAddressSearch = () => {
    // 주소 검색 로직 추가
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <FormWrapper>
        <SectionTitle>공급업체 회원가입</SectionTitle>
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
          <div>
            <Label>담당자 이름 *</Label>
            <Input
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>담당자 전화번호 *</Label>
            <Input
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
            <Label>주소 *</Label>
            <div style={{ display: 'flex' }}>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <AddressSearchButton onClick={handleAddressSearch}>
                주소 검색
              </AddressSearchButton>
            </div>
          </div>
          <div>
            <Label>우편번호 *</Label>
            <Input
              name="zipCode"
              value={form.zipCode}
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
            <Label>업태 *</Label>
            <Input
              name="industry"
              value={form.industry}
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
          <Button type="submit">회원가입</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default AddClient;
