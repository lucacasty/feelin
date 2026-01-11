import React, { useEffect } from 'react';
import Welcome from '../components/Welcome';
import Chat from '../components/Chat'; 
import { useSelector } from 'react-redux';


const HomePage = () => {

  const generalSettings = useSelector((state) => state.general);

  return (
    <>
      {generalSettings.showWelcome &&
        <Welcome>
        </Welcome>
      }
      {!generalSettings.showWelcome &&
        <Chat></Chat>
      }
    </>
  );
}

export default HomePage;
