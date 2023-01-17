import React from "react";
import { useColorMode, Button, Icon } from "@chakra-ui/react";
import { Sun, Moon } from "phosphor-react";

export const ToggleMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return colorMode === "light" ? (
    <Button onClick={toggleColorMode} leftIcon={<Icon as={Moon} />}>
      Switch to dark theme
    </Button>
  ) : (
    <Button onClick={toggleColorMode} leftIcon={<Icon as={Sun} />}>
      Switch to Light theme
    </Button>
  );
};
