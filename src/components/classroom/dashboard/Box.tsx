import clsx from "clsx";
import React from "react";

export function Box({
  title,
  children,
  className,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg bg-dark1 p-4 flex flex-col space-y-2",
        className
      )}
    >
      <strong className="text-lg font-bold">{title}</strong>
      <div>{children}</div>
    </div>
  );
}
