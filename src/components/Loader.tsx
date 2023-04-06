import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-loader"></span>
      <p className="text-sm text-fontColor font-bold">{progress.toFixed(2)}%</p>
    </Html>
  );
};

export default Loader;
