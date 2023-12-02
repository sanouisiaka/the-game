import React from 'react';


import { Archivo_Black, } from "next/font/google";

const Archivo_Black_Font = Archivo_Black({ subsets: ["latin"], weight: "400" });
export default function TitleBigHeader() {
    const headerStyle = {
        "text-shadow": "-1px -1px 0 black, -3px -3px 0 rgb(245, 135, 0)",
        "color": "#f5f5f5",
        "border-bottom": "2px solid black"
    };

    return (
      <div
        className={
          "bg-primary flex grow flex-row justify-center content-between items-center text-center text-4xl " +
          Archivo_Black_Font.className
        }
        style={headerStyle}
      >
          <div className="w-1/3">BET</div>
          <div>THEM</div>
          <div className="w-1/3">ALL</div>
      </div>
    );
}
