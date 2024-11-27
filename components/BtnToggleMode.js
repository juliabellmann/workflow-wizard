import { useEffect, useState } from "react";
import ModeDark from "@/assets/icons/mode-dark.svg";
import ModeLight from "@/assets/icons/mode-light.svg";
import styled from "styled-components";

export default function BtnToggleMode() {
    const [theme, setTheme] = useState('light');
  
    useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Setzt das Theme basierend auf dem System-Einstellungen
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkScheme ? 'dark' : 'light');
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('theme', theme);
      document.documentElement.className = theme === 'dark' ? 'dark' : '';
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
  
    return (
      <StyledSvgContainer onClick={toggleTheme}>
        {theme === 'light' ? <ModeDark /> : <ModeLight />}
      </StyledSvgContainer>
    );
  };

  const StyledSvgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;