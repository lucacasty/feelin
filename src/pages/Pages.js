import HomePage from './HomePage';
import BottomNavigator from '../components/BottomNavigator';
import { useSelector, useDispatch } from 'react-redux';
/*import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';*/
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';

function Pages() {

  const generalSettings = useSelector((state) => state.general);

  return (
    <>
      <Heading as="h1" textAlign="center" fontSize="2em" p={4}>Feelin</Heading>
      {
        generalSettings.page == 0 &&
        <HomePage />
      }
      {
        generalSettings.page == 1 &&
        <HomePage />
      }
      {
        generalSettings.page == 2 &&
        <HomePage />
      }
      <BottomNavigator />
    </>
  );
}

export default Pages;
