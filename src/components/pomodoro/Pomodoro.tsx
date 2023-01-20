import { VStack, Button, Icon, Box, Text } from "@chakra-ui/react";
import { ArrowClockwise, Play } from "phosphor-react";
import { ToggleMode } from "../toggle-mode/ToggleMode";
import { usePomo } from "../../hooks/usePomo";

export default function Pomodoro() {
  const {
    isCounting,
    startPomo,
    startNextPomo,
    getClockLabel,
    setTypePomo,
    pomoType,
    restartPomo,
    isPomoFinished,
  } = usePomo();

  return (
    <>
      <Box display={"flex"} justifyContent="flex-end" margin={2}>
        <ToggleMode />
      </Box>
      <VStack
        h="100vh"
        display={"flex"}
        alignItems="center"
        justifyContent={"flex-start"}
        marginTop={60}
      >
        <Box marginTop={2}>
          <Button
            marginRight={2}
            color="primary"
            variant={pomoType === "pomo" ? "solid" : "ghost"}
            onClick={() => setTypePomo("pomo")}
          >
            Pomodoro
          </Button>
          <Button
            marginRight={2}
            color="primary"
            variant={pomoType === "short-break" ? "solid" : "ghost"}
            onClick={() => setTypePomo("short-break")}
          >
            Short break
          </Button>
          <Button
            marginRight={2}
            color="primary"
            variant={pomoType === "long-break" ? "solid" : "ghost"}
            onClick={() => setTypePomo("long-break")}
          >
            Long break
          </Button>
        </Box>
        <Box>
          <Text fontSize="150px">{getClockLabel()}</Text>
        </Box>
        <Box paddingBottom={5}>
          {isCounting && (
            <Button
              leftIcon={<Icon as={ArrowClockwise} />}
              color="primary"
              variant="solid"
              onClick={restartPomo}
            >
              Stop Pomo
            </Button>
          )}
          {!isCounting && !isPomoFinished && (
            <Button
              leftIcon={<Icon as={Play} />}
              color="primary"
              variant="solid"
              onClick={startPomo}
            >
              Start Pomo
            </Button>
          )}
          {!isCounting && isPomoFinished && (
            <Button
              leftIcon={<Icon as={Play} />}
              color="primary"
              variant="solid"
              onClick={startNextPomo}
            >
              Start next Pomo
            </Button>
          )}
        </Box>
      </VStack>
    </>
  );
}
