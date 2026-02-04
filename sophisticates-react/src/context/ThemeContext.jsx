import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const body = document.body;
        if (isDarkMode) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        }

        // Favicon adjustment
        updateFavicon(isDarkMode);
    }, [isDarkMode]);

    const updateFavicon = (dark) => {
        const link = document.querySelector("link[rel*='icon']");
        if (!link) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "/sophisticates_favicon.png"; // Original favicon

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            if (dark) {
                // Invert the favicon for dark mode if it starts as black-on-white
                // Or vice versa. Let's assume we want to invert the colors.
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = 255 - data[i];     // R
                    data[i + 1] = 255 - data[i + 1]; // G
                    data[i + 2] = 255 - data[i + 2]; // B
                    // Alpha stays same
                }
                ctx.putImageData(imageData, 0, 0);
            }

            link.href = canvas.toDataURL();
        };
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
