import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { PomoProvider } from "../contexts/PomoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PomoProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </PomoProvider>
    </>
  );
}
