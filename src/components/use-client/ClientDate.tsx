"use client"

export function ClientDate({ data }: { data: Date }) {
    return (
        <>
            { data.toLocaleDateString("en-SG", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            }) }
        </>
    );
}




