/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState"

const DarkModeContext = createContext()

function DarkModeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode')

    useEffect(()=>{

        console.log(isDarkMode)
       if(isDarkMode){
        document.documentElement.classList.add('dark-mode')
        document.documentElement.classList.remove('light-mode')
       }else{
        document.documentElement.classList.remove('dark-mode')
        document.documentElement.classList.add('light-mode')
       }
    }, [isDarkMode])

    function handleDarkMode(){
        setIsDarkMode(prevState=> !prevState)
    }
    return (
        <DarkModeContext.Provider value={{isDarkMode, handleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode(){
    const context = useContext(DarkModeContext)
    if(!context){
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}

export {DarkModeProvider, useDarkMode}
