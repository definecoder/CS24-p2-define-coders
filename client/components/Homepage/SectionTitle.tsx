import React, { ReactNode } from "react";
import Container from "./Container";

interface SectionTitleProps {
  align?: "left" | "center"; // Align can be left or center
  pretitle?: string;
  title?: string;
  children?: ReactNode;
}

const SectionTitle = ({ align = "center", pretitle, title, children }: SectionTitleProps) => {
  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        align === "left" ? "" : "items-center justify-center text-center"
      }`}
    >
      {pretitle && (
        <div className="text-sm font-bold tracking-wider text-gray-600 uppercase">
          {pretitle}
        </div>
      )}

      {title && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
          {title}
        </h2>
      )}

      {children && (
        <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
          {children}
        </p>
      )}
    </Container>
  );
}

export default SectionTitle;
