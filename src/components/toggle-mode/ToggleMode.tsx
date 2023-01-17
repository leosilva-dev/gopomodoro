import React from "react";
import { useColorMode, Button, Icon } from "@chakra-ui/react";
import { Sun, Moon } from "phosphor-react";

export const ToggleMode: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return colorMode === "light" ? (
    <Button onClick={toggleColorMode} variant="ghost">
      <Moon size={28} weight={"light"} />
    </Button>
  ) : (
    <Button onClick={toggleColorMode} variant="ghost">
      <Sun size={28} weight={"light"} />
    </Button>
  );
};
