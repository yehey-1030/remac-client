import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  return (
    <HeaderContainer>
      <MainImage src={process.env.PUBLIC_URL + 'mainlogo.svg'} />
      <UserIcon src={process.env.PUBLIC_URL + 'usericon.svg'} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 6.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainImage = styled.img`
  width: 9rem;
`;

const UserIcon = styled.img`
  width: 2.7rem;
`;

export default Header;