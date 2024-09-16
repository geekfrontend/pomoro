import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const rootElement = document.getElementById("portal-root");
  return rootElement ? createPortal(children, rootElement) : null;
};

export default Portal;
