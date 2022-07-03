import { createStandaloneToast, Progress } from "@chakra-ui/react";

const toast = createStandaloneToast();

export const CopyToast = () => {
  console.log(toast)
    return toast.toast({
      title: `Address Copied`,
      status: "info",
      isClosable: true,
      position: "bottom-right",
      duration: 1000,
    });
};