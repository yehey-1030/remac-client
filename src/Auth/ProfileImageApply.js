import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Buttons';
import { Title, Paragraph } from '../components/Text';
import { Container } from '../components/Container';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { Fetchers } from '../fetchers';
import { createReadStream } from 'fs';

const ProfileImageApply = ({ props }) => {
  const [profileImage, setProfileImage] = useState();
  const [profileImageURL, setProfileImageURL] = useState();
  const ref = useRef();
  const { history } = useAuth();
  const location = useLocation();
  const FormData = require('form-data');

  const uploadProfileImage = () => {
    let data = new FormData();
    data.append('profile_image', createReadStream(profileImageURL));
    const res = Fetchers.signupRequester({ data });
    alert(res);
  };

  const handleUploadButtonClick = (e) => {
    ref.current.click();
  };

  const handleCompleteButtonClick = (e) => {
    uploadProfileImage(); // Post user's profile image to server
    history.push('/signup/complete');
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target.result);
    };

    setProfileImageURL(reader.readAsDataURL(e.target.files[0]));

    setButtonAttribute({
      content: '가입 완료',
      onClick: handleCompleteButtonClick,
    });
    setSkipButton('');
  };

  const [buttonAttribute, setButtonAttribute] = useState({
    content: '갤러리 이동',
    onClick: handleUploadButtonClick,
  });

  const [skipButton, setSkipButton] = useState(
    <SkipButton content="건너뛰기" />
  );

  return (
    <Container>
      <SectionHeader
        title="프로필사진 등록"
        mt={2.8}
        mb={7.5}
        handleGoBack={() => history.goBack()}
      />
      <ContentContainer>
        <ProfileImage src={profileImage} />
        <Title size="md">리퀘스터이름명</Title>
        <Paragraph size="sm" mt={8} mb={11.2}>
          회원님을 대표하는 사진을 등록해주세요!
        </Paragraph>
        <Button type="activate" {...buttonAttribute} />
        {skipButton}
      </ContentContainer>
      <input
        ref={ref}
        onChange={handleImageUpload}
        name="profileImage"
        type="file"
        accept="image/*"
        hidden
      />
    </Container>
  );
};

const ContentContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 100%;
  background: rgba(229, 229, 229, 0.29);
  border: 1px solid #d2d6da;
  margin-bottom: 3.5rem;
  object-fit: cover;
`;

const SkipButton = styled(Button)`
  margin-top: 12px;
`;

export default ProfileImageApply;
