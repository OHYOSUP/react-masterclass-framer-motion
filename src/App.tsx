import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(211, 0, 238));
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const Window = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  // 애니메이션의 데이터를 얻어서 메뉴얼로 조정할 수 있도록 함
  const x = useMotionValue(0);

  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );

  // scrollY = px값
  // scrollYProgress = 퍼센테이지
  const { scrollY, scrollYProgress } = useScroll();

  useTransform(scrollYProgress, [0, 1], [1, 5]);

  useEffect(() => {
    rotateZ.onChange(() => console.log(rotateZ.get()));
  }, [scrollY, scrollYProgress]);

  const svg = {
    start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
    end: {
      pathLength: 1,
      fill: "rgba(255,255,255,1)",
    },
  };

  const [show, setShow] = useState(true);

  const ToggleShow = () => {
    setShow((prev) => !prev);
  };

  const wondowVariants = {
    start: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 360,
    },
    leaving: {
      opacity: 0,
      scale: 0,
      y: 50,
    },
  };

  const [visible, setVisible] = useState(1);
  const [back, setBakc] = useState(false);

  const nextPlease = () => {
    setBakc(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBakc(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const box = {
    entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: (back: boolean) => ({
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <Wrapper style={{ background: gradient }}>
      {/* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          transition={{
            // default = 모든 프로퍼티에 적용되는 값
            default: { duration: 5 },
            // full프로퍼티에 적용되는 값
            fill: { duration: 2, delay: 3 },
          }}
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg> */}
      {/* <Box drag="x" style={{ x, rotateZ: rotateZ, scale: scrollYProgress }} /> */}

      {/* <AnimatePresence>
        {show ? (
          <Window
            variants={wondowVariants}
            initial="start"
            animate="visible"
            exit="leaving"
          />
        ) : null}
      </AnimatePresence> */}

      {/* <button
        style={{ position: "absolute", top: "80vh" }}
        onClick={ToggleShow}
      >
        click
      </button> */}
      <AnimatePresence  custom={back}>
        <Window
          custom={back}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Window>
      </AnimatePresence>
      <button
        style={{ position: "absolute", top: "80vh" }}
        onClick={nextPlease}
      >
        next
      </button>
      <button
        style={{ position: "absolute", top: "90vh" }}
        onClick={prevPlease}
      >
        prev
      </button>
    </Wrapper>
  );
}

export default App;
