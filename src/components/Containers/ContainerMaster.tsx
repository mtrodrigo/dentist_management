import { ReactNode } from "react"

export const ContainerMaster = ({ children }: { children: ReactNode }) => {
    return(
        <div className="
        bg-zinc-700
        h-screen
        w-screen
        flex
        flex-col
        justify-between
        items-center"
        >
            {children}
        </div>
    )
}