import React, { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export default Container;
