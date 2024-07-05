"use client";

import MeteorEffectLayout from "@/app/common/component/MeteorEffectLayout";
import useLoadingStore from "@/app/store/useLoadingStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Intro() {
  const [useMounted, setUseMounted] = useState(false);
  const router = useRouter();
  const { setState } = useLoadingStore();
  useEffect(() => {
    setUseMounted(!useMounted);
    setState("state", "intro",false);
    setState("clean", "intro",false);
  }, []);

  return (
    <>
      <div className="relative flex items-center z-10 h-full overflow-hidden">
        <div className="w-1/3 z-10 flex justify-center">
          <button
            className="cursor-pointer w-12 mb-80"
            onClick={() => router.push("/shop")}
          >
            <div className="flex flex-col justify-center items-center text-3xl  text-white gap-5 ">
              {["입", "장", "하", "기"].map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </div>
          </button>
        </div>
        <div className="flex items-center justify-center bg-transparent flex-col self-end ml-[10rem] w-2/3">
          <div className="sr-only">잡화점</div>
          <div className="flex flex-col text-white justify-end sm:text-2xl  lg:text-[5.5rem] lg:leading-[5rem] leading-tight items-end w-[65%]">
            <div>처리야</div>
            <div>잡화점의</div>
            <div>비밀</div>
          </div>
          {useMounted && (
            <img
              src="/assets/images/shop.png"
              alt="shop"
              className="bg-no-repeat bg-transparent bg-center object-cover w-[55vw]"
            ></img>
          )}
        </div>
      </div>
      <MeteorEffectLayout />
    </>
  );
}
