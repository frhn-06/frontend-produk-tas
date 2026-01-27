import AppShell from "@/components/commons/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {HeroUIProvider} from "@heroui/react";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "@/context/toasterContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

 



export default function App({ Component, pageProps: {Session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={Session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToasterProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </ToasterProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
