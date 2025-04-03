import React from 'react';

interface PageSubtitleProps {
  lines: string[];
};

export default function PageSubtitle({ lines }: PageSubtitleProps) {
  return (
    <p className="text-white text-left sm:text-center md:text-base mt-6">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index + 1 < lines.length && (
            <>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
            </>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};
