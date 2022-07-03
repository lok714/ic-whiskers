import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { IoMdHome } from "react-icons/io";
import { GiAnvil, GiShoppingBag } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: IoMdHome, link: "/" },
  { name: "Mint", icon: GiAnvil, link: "/mint" },
  { name: "Marketplace", icon: GiShoppingBag, link: "/marketplace" },
];

const SideBar = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          IC Whiskers
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link, onClose }) => {
  return (
    <NavLink to={link} onClick={onClose}>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          m="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          fontWeight={600}
          _hover={{
            bg: "#ec63d6",
            color: "white",
          }}
          bg={isActive ? "#ec63d6" : null}
          color={isActive ? "white" : null}
        >
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

export default SideBar;
