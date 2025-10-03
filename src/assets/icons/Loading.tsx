import React from "react";

interface Loading {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const Loading: React.FC<Loading> = ({
  width = 276,
  height = 380,
  color = "#CED4DA",
  className = "loading",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 276 380"
      fill={color}
      className={className}
    >
      <rect width="276" height="276" rx="8" fill="#F3F5FA" />
      <rect
        x="127"
        y="128"
        width="2.44444"
        height="19.5556"
        rx="1.22222"
        fill="#CED4DA"
      />
      <rect
        x="131.889"
        y="134.518"
        width="2.44444"
        height="6.51852"
        rx="1.22222"
        fill="#CED4DA"
      />
      <rect
        x="136.778"
        y="131.259"
        width="2.44444"
        height="13.037"
        rx="1.22222"
        fill="#CED4DA"
      />
      <rect
        x="141.667"
        y="134.518"
        width="2.44444"
        height="6.51852"
        rx="1.22222"
        fill="#CED4DA"
      />
      <rect
        x="146.556"
        y="128"
        width="2.44444"
        height="19.5556"
        rx="1.22222"
        fill="#CED4DA"
      />
    </svg>
  );
};
