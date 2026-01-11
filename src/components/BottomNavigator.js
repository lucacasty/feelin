import React from 'react'
import { Flex, Button, Icon } from '@chakra-ui/react'
import {
  MdCalendarMonth ,
  MdHomeFilled ,
  MdPerson,
} from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../redux/generalSlice'

const BottomNavigator = () => {
  const page = useSelector((state) => state.general.page)
  const dispatch = useDispatch()

  const icons = [
    MdCalendarMonth,
    MdHomeFilled,
    MdPerson,
  ]

  return (
    <Flex
      position="fixed"
      bottom="0"
      w="100%"
      justify="space-around"
      align="center"
      borderTop={"1px solid #444"}
      bg="black"
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      py={2}
    >
      {icons.map((IconComponent, index) => ( 
        <Button
          key={index}
          variant="ghost"
          onClick={() => dispatch(changePage(index))}
          p={0}
          minW="auto"
        >
          <Icon
            as={IconComponent}
            boxSize="36px"
            color={page === index ? "blue.500" : "gray.400"}
          />
        </Button>
      ))}
    </Flex>
  )
}

export default BottomNavigator
