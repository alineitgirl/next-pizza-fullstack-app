import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/index";
import { Categories } from "@/components/index";
import { SortPopup } from "@/components/index";

interface Props {
    className? : string;
}

export const TopBar : React.FC<Props> = ({ className }) => {
    return (
        <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
            <Container className="relative flex items-center">
                <Categories className="mr-auto" />
                <SortPopup className="ml-auto" />
            </Container>
        </div>
    )
}