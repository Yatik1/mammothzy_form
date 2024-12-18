"use client"

import { TagContext } from "@/context/Context"
import { useContext } from "react"

function useTagContext() {
    const context = useContext(TagContext)
    if(!context) throw new Error("useTagContext() must be with in tag context")

    return context
}

export default useTagContext