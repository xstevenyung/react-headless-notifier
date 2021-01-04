import { useEffect, useRef, useState } from 'react';

function wrap(code) {
  return `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body style="padding-top: 1rem; padding-bottom: 1rem; padding-right: 0.5rem; padding-left: 0.5rem;">
            ${code}
          </body>
        </html>
      `;
}

export default function Preview({ code }) {
  const preview = useRef();
  const [height, setHeight] = useState(150);
  const [widthChange, setWidthChange] = useState(0);
  const [startingWidthChange, setStartingWidthChange] = useState(0);
  const [isResizing, setIsResizing] = useState(false);

  const updateHeight = () => {
    if (!preview.current) return null;
    setHeight(preview.current.contentWindow.document.body.scrollHeight);
  };

  useEffect(() => {
    updateHeight();
  }, [preview.current]);

  const change =
    startingWidthChange + widthChange <= 0
      ? startingWidthChange + widthChange
      : 0;

  useEffect(() => {
    if (!isResizing) {
      setStartingWidthChange(startingWidthChange + widthChange);
      setWidthChange(0);
    }
  }, [isResizing]);

  return (
    <div className="relative pr-4 bg-gray-500">
      <iframe
        ref={preview}
        onLoad={() => {
          updateHeight();
          // disable iframe links
          preview.current.contentWindow.document.body
            .querySelectorAll('a')
            .forEach((element) => {
              element.addEventListener('click', (e) => {
                e.preventDefault();
              });
            });
        }}
        srcDoc={wrap(code)}
        className={`w-full h-auto bg-white pointer-events-none ${
          isResizing ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        style={{
          height: `${height}px`,
          width: `calc(100% + ${change}px)`,
        }}
      />

      <ResizeHandle
        resize={(change) => {
          setWidthChange(change);
          setIsResizing(true);
          updateHeight();
        }}
        end={() => setIsResizing(false)}
        style={{ right: `${-change}px` }}
      />
    </div>
  );
}

function ResizeHandle({ resize, end, ...forwardedProps }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return null;
      resize(e.clientX - startX);
    };

    const handleMouseUp = () => {
      if (!isDragging) return null;

      setIsDragging(false);
      setStartX(null);
      end();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX]);

  return (
    <div
      {...forwardedProps}
      className="border-l bg-gray-100 absolute right-0 inset-y-0 flex items-center w-4 cursor-move"
      onMouseDown={(e) => {
        setIsDragging(true);
        setStartX(e.clientX);
      }}
    >
      <svg
        className="h-4 w-4 text-gray-600 pointer-events-none"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5h2v14H8zM14 5h2v14h-2z" />
      </svg>
    </div>
  );
}
