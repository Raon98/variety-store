"use client";
import { cn } from "@/app/common/utils/cn";
import useSectionStore, { Tab, initTab } from "@/app/store/useSectionStore";
import useMotionStore from "@/app/store/useStore";
import React, { useEffect, useRef, useState } from "react";

const TabSectionContainer = ({
  children,
  sectionIdx,
  className,
}: {
  children: React.ReactNode;
  sectionIdx: number;
  className?: string;
}) => {
  const { getTabList, setSectionActive, setScreenSectionActive } =
    useSectionStore();
  const { getLp } = useMotionStore();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIdx, setCurrentState] = useState(0);
  const [beforeList, setBeforeList] = useState<Tab>(initTab[0]);
  const [changeTime, setChangeTime] = useState(false);
  const lp = getLp();
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollPosition = window.scrollY + window.innerHeight * 0.3;

        if (currentIdx !== 0) {
          setBeforeList(getTabList(lp.exceptTab)[currentIdx - 1]);
          if (scrollPosition < beforeList.endHeight) {
            setCurrentState(getTabList(lp.exceptTab)[currentIdx].idx - 1);
            setChangeTime(false);
          }
        }

        if (getTabList(lp.exceptTab).length > currentIdx + 1) {
          if (
            scrollPosition >
            getTabList(lp.exceptTab)[currentIdx + 1].startHeight
          ) {
            setCurrentState(getTabList(lp.exceptTab)[currentIdx].idx + 1);
            setChangeTime(false);
          }
        }
      }
    };

    if (changeTime) {
      setSectionActive(getTabList(lp.exceptTab)[currentIdx].idx);
      setScreenSectionActive(getTabList(lp.exceptTab)[currentIdx].idx);
    }
    if (!changeTime) {
      setTimeout(() => {
        setChangeTime(true);
      }, 100);
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef, currentIdx, beforeList, changeTime]);

  return (
    <>
      {getTabList().map(
        (v) =>
          v.idx === sectionIdx && (
            <section
              className={cn(
                ` bg-slate-50 mb-[10rem] opacity-0 ${className}`,
                v.screenActive && "animate-DelayfadeIn"
              )}
              key={v.idx}
              ref={sectionRef}
            >
              {children}
            </section>
          )
      )}
    </>
  );
};

export default TabSectionContainer;
