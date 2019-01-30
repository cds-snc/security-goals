export const ControlComponent = ({ component }) => {
  if (!component) return null;
  return (
    <p name="component">
      <strong>Component:</strong> {component}
    </p>
  );
};
