export const ControlComponent = ({ component }) => {
  if (!component) return null;
  return (
    <p>
      <strong>Component:</strong> {component}
    </p>
  );
};
