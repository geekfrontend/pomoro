import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const rootElement = document.getElementById("portal-root");
  return rootElement ? createPortal(children, rootElement) : null;
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
