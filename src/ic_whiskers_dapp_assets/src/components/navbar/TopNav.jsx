import React from "react";
import {
  IconButton,
  Flex,
  useColorModeValue,
  Image as ChakraImage,
  Hide
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import logo from "../../../assets/whiskers_logo.jpg";
import Profile from "./Profile";

const TopNav = ({ onOpen }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      {/* <Hide above="md">
        <ChakraImage src={logo} h={"40px"} w={"auto"} borderRadius="lg"/>
      </Hide> */}
      <Profile />
    </Flex>
  );
};

export default TopNav;
