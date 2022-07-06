import React, { useState } from "react";
import {
  SimpleGrid,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuDivider,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";

const address =
  "a004f41ea1a46f5b7e9e9639fbed84e037d9ce66b75d392d2c1640bb7a559cda"; // this is badbot address

const Marketplace = () => {
  return (
    <>
      <FilteringOptions />
      <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} gap={2}>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </>
  );
};

// put below in a seperate file
const FilteringOptions = () => {
  return <RarityFilter />;
};

const RarityFilter = () => {
  const [currentOption, setCurrentOption] = useState("Common");

  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue">
        {currentOption}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="Common" title="Rarity">
          <MenuItemOption
            value={"Common"}
            onClick={() => setCurrentOption("Common")}
          >
            Common
          </MenuItemOption>
          <MenuItemOption
            value={"Uncommon"}
            onClick={() => setCurrentOption("Uncommon")}
          >
            Uncommon
          </MenuItemOption>
          <MenuItemOption
            value={"Rare"}
            onClick={() => setCurrentOption("Rare")}
          >
            Rare
          </MenuItemOption>
          <MenuItemOption
            value={"Epic"}
            onClick={() => setCurrentOption("Epic")}
          >
            Epic
          </MenuItemOption>
          <MenuItemOption
            value={"Legendary"}
            onClick={() => setCurrentOption("Legendary")}
          >
            Legendary
          </MenuItemOption>
          <MenuItemOption
            value={"Artifact"}
            onClick={() => setCurrentOption("Artifact")}
          >
            Artifact
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
export default Marketplace;
