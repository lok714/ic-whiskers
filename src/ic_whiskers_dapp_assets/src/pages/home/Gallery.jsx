import React from "react";
import { SimpleGrid, Center, Heading } from "@chakra-ui/react";
import IcWhiskerCard from "./IcWhiskerCard";
import logo from "../../../assets/whiskers_logo.jpg";
import catLogo from "../../../assets/cat_logo.png";

const Gallery = () => {
  return (
    <>
      <Center pb={5}>
        <Heading
          fontWeight={"bold"}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          Gallery
        </Heading>
      </Center>
      <Center mt={1}>
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 3 }}
          pb={5}
          gap={2}
          mx={2}
          maxW="1250px"
        >
          <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={false} />
          <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={false} />
          <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={false} />
          <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={false} />
          <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={false} />
          <IcWhiskerCard mainImg={logo} logoImg={catLogo} show={false} />
        </SimpleGrid>
      </Center>
    </>
  );
};

export default Gallery;
