import React from 'react';

const DeferRendering = ({
  children,
  delayMs = 100,
  fallback = null,
}: {
  children: React.ReactNode;
  delayMs?: number;
  fallback?: React.ReactNode;
}) => {
  const [canRender, setCanRender] = React.useState(false);
  React.useEffect(() => {
    if (canRender) {
      return;
    }
    const t = setTimeout(() => {
      setCanRender(true);
    }, delayMs);

    return () => clearTimeout(t);
  }, [canRender, delayMs]);

  if (!canRender) {
    return fallback;
  }
  return children;
};

export { DeferRendering };
