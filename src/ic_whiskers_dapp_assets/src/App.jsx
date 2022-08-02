import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Mint, Marketplace, LargeNft } from "./pages";
import { SideBar, TopNav } from "./components/index";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import bg from "../assets/ic_whiskersBG.png";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";

const App = () => {
  const loaded = useAnvilSelector((state) => state.user.map.history);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!loaded) return null; // change to a loading icon

  return (
    <Router>
      <Box minH="100vh">
        <SideBar
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SideBar onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <TopNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }}>
          {/* ALL main content goes here: react router links */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/nft/:tokenid" element={<LargeNft />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
