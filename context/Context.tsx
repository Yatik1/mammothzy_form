"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"

type ContextProps = {
    selectedTag:string ,
    setSelectedTag: Dispatch<SetStateAction<string>>,
    isSubmitted : boolean,
    setIsSubmitted: Dispatch<SetStateAction<boolean>>
}

export const TagContext = createContext<ContextProps | null>(null)

export default function ContextProvider({children}:{children: React.ReactNode}) {
    const [selectedTag, setSelectedTag] = useState<string>("Activity Details")
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    return (
        <TagContext.Provider 
            value={{
                selectedTag,
                setSelectedTag,
                isSubmitted,
                setIsSubmitted
            }}
        >
            {children}
        </TagContext.Provider>
    )
}