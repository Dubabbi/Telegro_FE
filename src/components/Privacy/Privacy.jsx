import React, { useState } from 'react';
import * as S from './PrivacyStyle';

const Privacy = () => {
    const [activeTab, setActiveTab] = useState('privacy');

    return (
        <S.Container>
            <S.Tabs>
                <S.Tab
                    onClick={() => setActiveTab('privacy')}
                    isActive={activeTab === 'privacy'}
                >
                    개인정보처리방침
                </S.Tab>
                <S.Tab
                    onClick={() => setActiveTab('terms')}
                    isActive={activeTab === 'terms'}
                >
                    이용약관
                </S.Tab>
            </S.Tabs>
            <S.Content>
                {activeTab === 'privacy' && (
                    <S.Section>
                        <S.Text>개인정보처리방침 내용이 여기에 들어갑니다...</S.Text>
                    </S.Section>
                )}
                {activeTab === 'terms' && (
                    <S.Section>
                        <S.Text>이용약관 내용이 여기에 들어갑니다...</S.Text>
                    </S.Section>
                )}
            </S.Content>
        </S.Container>
    );
};

export default Privacy;
