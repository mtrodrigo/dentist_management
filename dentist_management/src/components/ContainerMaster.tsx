import { ReactNode } from "react"

export const ContainerMaster = ({ children }: { children: ReactNode }) => {
    return(
        <div className="
        bg-blue-950
        h-screen
        w-screen
        flex
        flex-col
        justify-center
        items-center"
        >
            {children}
        </div>
    )
}