import React from "react";
import {
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Image as ChakraImage,
  Hide,
  Tooltip,
  Icon,
  useClipboard,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { CopyIcon, LockIcon } from "@chakra-ui/icons";
import IcLogo from "../../../assets/ic-logo.png";
import {
  useAnvilSelector,
  useAnvilDispatch,
  user_login,
  user_logout,
} from "@vvv-interactive/nftanvil-react";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { CopyToast } from "../toasts/Toasts";
import SendingIcp from "./SendingIcp";

// use authentication system and update react redux with it

const Profile = () => {
  const address = useAnvilSelector((state) => state.user.address);
  const user_icp = e8sToIcp(useAnvilSelector((state) => state.user.icp));
  const anvilDispatch = useAnvilDispatch();
  const { onCopy } = useClipboard(address);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const copyAddress = () => {
    onCopy();
    CopyToast();
  };

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <Flex alignItems={"center"}>
        {!address ? (
          <Button onClick={() => anvilDispatch(user_login())}>
            <Flex align="center">
              {`Authenticate`}
              &nbsp;
              <ChakraImage src={IcLogo} h={"18px"} w={"auto"} />
            </Flex>
          </Button>
        ) : null}
        {address ? (
          <>
            <Menu autoSelect={false}>
              <MenuButton me={2} as={Button}>
                <Flex align="center">
                  {`ICP: ${user_icp}`}
                  &nbsp;
                  <ChakraImage src={IcLogo} h={"18px"} w={"auto"} />
                </Flex>
              </MenuButton>
              <MenuList>
                <Hide above="md">
                  <Tooltip label="Copy address">
                    <MenuItem
                      onClick={() => {
                        copyAddress();
                      }}
                      icon={<CopyIcon />}
                      maxW="240px"
                    >
                      {address
                        ? address.substring(0, 10) +
                          "......" +
                          address.substring(56, 64)
                        : null}
                    </MenuItem>
                  </Tooltip>
                </Hide>
                <MenuItem
                  icon={<RiSendPlaneFill />}
                  command={user_icp}
                  closeOnSelect
                  onClick={onOpen}
                >
                  Transfer ICP
                  <SendingIcp
                    onClose={onClose}
                    isOpen={isOpen}
                    user_icp={user_icp}
                  />
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  icon={<LockIcon />}
                  onClick={() => anvilDispatch(user_logout())}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
            <Hide below="md">
              <Tooltip label="Copy address">
                <Button
                  leftIcon={<CopyIcon />}
                  onClick={() => {
                    copyAddress();
                  }}
                >
                  {address.substring(0, 6) + "..." + address.substring(58, 64)}
                </Button>
              </Tooltip>
            </Hide>
          </>
        ) : null}
        <a href="http://discord.gg/xKpycnJ2Ar" target="_blank" rel="noreferrer">
          <Icon mt={1} ms={2} w={6} h={6} as={FaDiscord} color={"#5865F2"} />
        </a>
      </Flex>
    </HStack>
  );
};

export default Profile;
