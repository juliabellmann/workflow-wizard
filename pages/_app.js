import GlobalStyle from "../styles";
import RootLayout from "@/components/RootLayout";
import tasks from "@/assets/tasks";

export default function App({ Component, pageProps }) {

  return (
    <>
      <GlobalStyle />
      <RootLayout>
        <Component 
          {...pageProps} 
          tasks={tasks}
          />
      </RootLayout>
    </>
  );
}
