"use client";

import { useEffect } from "react";

export default function DeveloperSignature() {
    useEffect(() => {
        const signature = String.raw`
        Site made and designed by PRATIK FUYAL  
        Email:- pratikfuyalbusiness@gmail.com          
`;
        const comment = document.createComment(signature);
        document.body.prepend(comment);

        return () => {
            comment.remove();
        };
    }, []);

    return null;
}
