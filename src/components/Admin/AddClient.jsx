import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Postcode } from '../Postcode/Postcode'; // 우편번호 검색 컴포넌트
import * as D from './NoticeDetail/NoticeDetailStyle';
import * as A from './AddClientStyle';
import axios from 'axios';

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

  const handleAddressComplete = ({ fullAddress, zonecode }) => {
    setForm((prevState) => ({
      ...prevState,
      address: fullAddress,  // 도로명 주소 설정
      zipCode: zonecode,     // 우편번호 설정
    }));
  };
  const priceApplicationOptions = {
    A: '옵션 A',
    B: '옵션 B',
    C: '옵션 C'
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

  const handleSignupClick = async () => {
    const authData = {
      id: form.id,
      password: form.password,
      email: form.email
    };
  
    try {
      const authResponse = await axios.post('/api/auth/register', authData);
      if (authResponse.status === 200) {
        console.log('사용자 정보');
        const profileData = {
          companyName: form.companyName, //회원명
          phone: form.phone, //전화번호
          address: form.address, //주소
          zipCode: form.zipCode, //우편번호
          detailAddress: form.detailAddress, //상세주소
          businessName: form.businessName, //상호명
          businessNumber: form.businessNumber, //사업자 번호
          industry: form.industry, //업태
          category: form.category, //종목
          priceApplication: form.priceApplication, //단가적용
          contactName: form.contactName, //담당자 이름
          contactPhone: form.contactPhone, //담당자 번호
        };
  
        const profileResponse = await axios.post('/api/profile/update', profileData);
        if (profileResponse.status === 200) {
          console.log('프로필 정보');
        }
      } else if (authResponse.status === 409) {
        alert("등록된 회원입니다."); 
      } 
    } catch (error) {
      console.error("Error while signing up:", error);
    }
  };
  
  
  return (
    <>
    <A.Container>
      <A.Title>회원가입</A.Title>
      <A.FormWrapper>
        <A.SectionTitleWrapper>
          <A.SectionTitle>공급업체 회원가입</A.SectionTitle>
        </A.SectionTitleWrapper>
        <div style={{ padding: '2%' }}>
          <A.Form onSubmit={handleSubmit}>
            <div>
              <A.Label>회원명 *</A.Label>
              <A.Input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <A.Label>전화번호 *</A.Label>
              <A.Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <A.InlineFormWrapper>
              <div>
                <A.Label>아이디 *</A.Label>
                <A.Input
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <A.Label>비밀번호 *</A.Label>
                <A.Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <A.Label>이메일 *</A.Label>
                <A.Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <A.Label>단가적용 *</A.Label>
                <A.Select
                  name="priceApplication"
                  value={form.priceApplication}
                  onChange={handleChange}
                > 
                <option value="">단가 선택</option>
                {Object.entries(priceApplicationOptions).map(([key, value]) => (
                  <option key={key} value={key}>{value || '단가 선택'}</option>
                ))}
                
                </A.Select>
              </div>
            </A.InlineFormWrapper>

            <A.ContactFormWrapper>
              <div>
                <A.Label>담당자 이름 *</A.Label>
                <A.Input
                  style={{width: '97%'}}
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <A.Label>담당자 전화번호 *</A.Label>
                <A.Input
                  style={{width: '97%'}}
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <A.Label>상호명 *</A.Label>
                <A.Input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                />
              </div>
            </A.ContactFormWrapper>
            <div>
              <A.Label>주소 *</A.Label>
              <div style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center'}}>
                <A.Input
                  name="address"
                  value={form.address}
                  placeholder="주소를 검색해 주세요."
                  readOnly
                />
                <A.SearchButton>
                <Postcode onComplete={handleAddressComplete} />
                </A.SearchButton>
              </div>
            </div>
            <div>
              <A.Label>사업자 번호 *</A.Label>
              <A.Input
                name="businessNumber"
                value={form.businessNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <A.Label>우편번호 *</A.Label>
              <A.Input
                name="zipCode"
                value={form.zipCode}
                readOnly
              />
            </div>
            <div>
              <A.Label>업태 *</A.Label>
              <A.Input
                name="industry"
                value={form.industry}
                onChange={handleChange}
              />
            </div>
            <div>
              <A.Label>상세주소 *</A.Label>
              <A.Input
                name="detailAddress"
                value={form.detailAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <A.Label>종목 *</A.Label>
              <A.Input
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>
          </A.Form>
        </div>
      </A.FormWrapper>
    </A.Container>
        <D.BtWrap style={{ width: '70%', marginLeft: '22.5%', marginBottom: '3%'}}>
        <D.BtLink as={Link} to="/admin/clientmanagement">
                취소
              </D.BtLink>
              <D.BtLink onClick={handleSignupClick} as={Link} to="">
                등록
              </D.BtLink>
            </D.BtWrap>
        </>
  );
}

export default AddClient;
