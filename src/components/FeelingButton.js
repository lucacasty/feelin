import React from 'react'
import { Flex, Button, Icon } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { showHideWelcome, setMessage } from '../redux/generalSlice';

const FeelingButton = ({id,label,icon: IconComponent, background}) => {

  const dispatch = useDispatch();

  const phrases = {
    happy: "I'm feeling great today! Everything is awesome!",
    sad: "I'm feeling a bit down today. Could use some cheering up.",
    bored: "I'm so bored! I need something exciting to do.",
    anxious: "I'm feeling anxious and stressed out right now.",
  };

  const hadleFeelingClick = () => {
    console.log("Feeling button clicked: " + label);
    dispatch(showHideWelcome(false));
    dispatch(setMessage(phrases[id]));
  }

  return (
    <Button
      key={id}
      p={5}
      minW="auto"
      bg={background}
      height="auto"
      borderRadius={10}
      onClick={hadleFeelingClick}
    >
      <Flex direction="column" align="center" gap={2}>
        <Icon
          as={IconComponent}
          boxSize="45px"
        />
        <span style={{ fontSize: "1.2rem" }}> {label} </span>
      </Flex>
    </Button>
  )
}

export default FeelingButton
