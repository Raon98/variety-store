"use client";
import { cn } from "@/app/common/utils/cn";
import { useTheme } from "@/app/hooks/themeContext";
import useLpStore from "@/app/store/useLpStore";
import useMotionStore from "@/app/store/useMotionStore";
import { useContext, useEffect, useRef, useState } from "react";

export default function MainLayout() {
  const { getState, setChangeState, getLp, setLp, LpAnimationSwitch } =
    useMotionStore();
  const { getKeyLp } = useLpStore();
  const { theme, iconTheme, toggleTheme } = useTheme();

  const play = getState("main", "play");
  const box = getState("main", "boxState");
  const lpSwitch = getState("main", "lpSwitch");
  const lp = getLp();

  const [mount, setMount] = useState(false);

  const lpRef = useRef<HTMLDivElement | null>(null);
  const dropRef = useRef<HTMLButtonElement | null>(null);

  const func = {
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
      console.log("drag start");
      e.dataTransfer.setData("text/plain", "dragging");
    },
    onDrop: (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const data = e.dataTransfer.getData("text");
      if (data === "dragging") {
        console.log("drop");
        setLp();
      }
    },
    recodePlay: () => {
      setChangeState("main", "play");
      const testLp = getKeyLp("lp2");
      setLp(testLp);
      if (play) {
        //재생
      } else {
        //중지
      }
    },
    openBox: () => {
      setChangeState("main", "boxState");
    },
  };

  useEffect(() => {
    console.log(lp);
    if (lp.key && mount) {
      LpAnimationSwitch();
    }
    toggleTheme(lp);
  }, [lp]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      <div
        className={cn(
          `w-full h-full overflow-hidden relative px-8 py-5 ${theme}`,
          ""
        )}
      >
        <div className="flex w-full h-screen relative">
          <div className="sr-only">레코드판</div>
          <div
            className={`text-[6.75rem] font-['DIGI'] mt-[4.25rem] mr-[6.75rem] absolute right-0 top-0 ${
              iconTheme === "w" ? "text-white" : "text-black"
            }`}
          >
            {lp.since}
          </div>
          {mount && (
            <div className="w-full h-full flex items-center justify-center ">
              <div className="relative w-[55%] animate-fadeIn x-1100:w-full">
                <img
                  src="/assets/images/turnTable.png"
                  alt="recode"
                  className="bg-no-repeat bg-transparent bg-center object-cover w-full"
                />
                <span className="before:absolute before:top-0 before:right-0 before:content-[' '] before:bg-[url('/assets/images/toneArm.png')] before:bg-center before:bg-no-repeat before:w-[20%] before:h-full before:transform before:translate-x-[-120%] before:translate-y-[-15%] before:bg-contain"></span>
                {lp.key && (
                  <div
                    className={cn(
                      "absolute left-[19%] top-[26%] w-[45%] hover:cursor-pointer drag_item hover:animate-lpSpin",
                      lpSwitch && "animate-lpSwitch"
                    )}
                    draggable={true}
                    ref={lpRef}
                    onDragStart={(e) => func.onDragStart(e)}
                  >
                    <img
                      src={`/assets/images/${lp.img}.png`}
                      alt="lp"
                      className="bg-no-repeat bg-transparent bg-center object-cover w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-transparent font-bold px-[3.5rem] py-[1rem] fixed  w-full z-[1000] bottom-0 left-0">
        <div className="mx-[2rem] mb-[3rem] my-auto flex items-end justify-between text-white ">
          <button className="rounded_block" onClick={() => func.recodePlay()}>
            <img
              src={`/assets/images/${
                play ? `stop_${iconTheme}` : `play_${iconTheme}`
              }.png`}
              alt="soundIcon"
              className="bg-no-repeat bg-transparent bg-center object-cover w-2/3"
            />
          </button>
          <button
            className="rounded_block"
            ref={dropRef}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => func.onDrop(e)}
            onClick={() => func.openBox()}
          >
            <img
              src={`/assets/images/${
                box ? `openBox_${iconTheme}` : `closeBox_${iconTheme}`
              }.png`}
              alt="boxIcon"
              className={cn(
                `bg-no-repeat bg-transparent bg-center object-cover`,
                `${box ? "w-[70%]" : "w-1/2"}`
              )}
            />
          </button>
        </div>
      </div>
    </>
  );
}
