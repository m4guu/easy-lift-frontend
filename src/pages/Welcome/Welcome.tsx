import React, { memo } from "react";

const WelcomePage: React.FC = () => {
  return <div>Welcome</div>;
};

const Welcome = memo(WelcomePage);
export default Welcome;
