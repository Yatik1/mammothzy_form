"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"

type ContextProps = {
    selectedTag:string ,
    setSelectedTag: Dispatch<SetStateAction<string>>,

}

export const TagContext = createContext<ContextProps | null>(null)

export default function ContextProvider({children}:{children: React.ReactNode}) {
    const [selectedTag, setSelectedTag] = useState<string>("Activity Details")
 

    return (
        <TagContext.Provider 
            value={{
                selectedTag,
                setSelectedTag,
            }}
        >
            {children}
        </TagContext.Provider>
    )
}