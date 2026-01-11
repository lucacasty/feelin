import React from 'react'
import { Box, Heading } from '@chakra-ui/react';
import FeelingButton from '../components/FeelingButton';
import { FaRegFaceGrinBeam, FaRegFaceSadTear, FaRegFaceMeh, FaRegFaceGrimace   } from "react-icons/fa6";

const Welcome = () => {

  return (
    <>
      <Heading mt={5} fontSize="1.5em" as="h2" textAlign="center"> How are you feeling today?</Heading>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
        gridGap={8}
        p={10}
      >
        <FeelingButton
          id="happy"
          label="Happy"
          icon={FaRegFaceGrinBeam}
          background="yellow.400"
        ></FeelingButton>
        <FeelingButton
          id="sad"
          label="Sad"
          icon={FaRegFaceSadTear}
          background="blue.400"
        ></FeelingButton>
        <FeelingButton
          id="bored"
          label="Bored"
          icon={FaRegFaceMeh}
          background="green.400"
        ></FeelingButton>

        <FeelingButton
          id="anxious"
          label="Anxious"
          icon={FaRegFaceGrimace}
          background="red.400"
        ></FeelingButton>
      </Box>
    </>
  )
}

export default Welcome
