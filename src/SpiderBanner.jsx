import React, { useEffect, useRef, useState } from "react";

const SpiderBanner = ({
  children,
  noOfDots,
  colors,
  lineLenght,
  className,
}) => {
  const dotnumber = noOfDots ? noOfDots : 50;
  const colorArray = colors && colors.length > 0 ? colors : ["white", "black"];
  const length = lineLenght > 100 ? lineLenght : 100;


  const bannerRef = useRef();
  const canvasRef = useRef();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const updateDimension = () => {
      if (bannerRef.current) {
        setDimension({
          width: bannerRef.current.offsetWidth,
          height: bannerRef.current.offsetHeight,
        });
      }
    };

    updateDimension();
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  useEffect(() => {
    if (dimension.width && dimension.height) {
      const generatedDots = Array.from({ length: dotnumber }, () => ({
        x: Math.random() * dimension.width,
        y: Math.random() * dimension.height,
        size: Math.random() * 3 + 5,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
      }));

      setDots(generatedDots);
    }
  }, [dimension.width, dimension.height]);

  useEffect(() => {
    const drawLines = () => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");

        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        dots.forEach((dot) => {
          context.fillStyle = dot.color;
          context.beginPath();
          context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          context.fill();
          ``;
        });

        console.log(mousePosition.x, canvasRef.current.width -10)

        const ratio = window.devicePixelRatio || 1;

        if (
          mousePosition.x <= 10 ||
          mousePosition.y <= 10 ||
          mousePosition.x * ratio >= canvasRef.current.width - 10 ||
          mousePosition.y * ratio >= canvasRef.current.height - 10
        ) {
          return;
        }

        if (mousePosition.x > 10 && mousePosition.y > 10) {
          dots.forEach((dot) => {
            const distance = Math.sqrt(
              (mousePosition.x - dot.x) ** 2 + (mousePosition.y - dot.y) ** 2
            );

            if (distance < length) {
              context.strokeStyle = dot.color;
              context.lineWidth = 1;
              context.beginPath();
              context.moveTo(dot.x, dot.y);
              context.lineTo(mousePosition.x, mousePosition.y);
              context.stroke();
            }
          });
        }
      }
    };

    drawLines();
  }, [mousePosition, dots]);

  const handleMouseMove = (event) => {
    const position = bannerRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - position.left,
      y: event.clientY - position.top,
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      const ratio = window.devicePixelRatio || 1;
      canvasRef.current.width = dimension.width * ratio;
      canvasRef.current.height = dimension.height * ratio;
      context.scale(ratio, ratio);
    }
  }, [dimension]);

  return (
    <section
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      className={className || ""}
    >
      {children}
      <canvas
        ref={canvasRef}
        width={dimension.width}
        height={dimension.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default SpiderBanner;
