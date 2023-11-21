import {useDarkMode} from "usehooks-ts";
import {useState} from "react";

function useColorMode() {
    const {isDarkMode, toggle:toggleDarkMode} = useDarkMode();
    const [useColorMode, setUseColorMode] = useState<'light'|'dark'>(isDarkMode?'dark':'light');
    const toggle = () => {
        setUseColorMode(useColorMode === 'light' ? 'dark' : 'light');
        toggleDarkMode();
    };
    const isDark = useColorMode === 'dark';
    return {useColorMode, toggle, isDark};
}

export default useColorMode;