"use client";
import { useTheme } from "@/app/hooks/themeContext";
import useSoundStore from "@/app/store/useSoundStore";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import Image from 'next/image'

interface VolumeSliderProps {
  option? : string
}
export default function VolumeSlider({option}:VolumeSliderProps) {
  const { sound, volumeControl, muteVolume, maxVolume } = useSoundStore();
  const { iconTheme, volumeColor } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const func = {
    handleChange: (event: Event, newValue: number | number[]) => {
      if (newValue === 0) {
        muteVolume();
      } else if (newValue === 100) {
        maxVolume();
      } else {
        volumeControl(newValue as number);
      }
    },
  };

  return (
    <>
      {isClient && (
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <button className="w-[15%]" onClick={() => muteVolume()}>
               <Image
                      src={`/assets/images/soundMute_${option ? option : iconTheme}.png`}
                      width={100}
                      height={100}
                      alt="soundIcon"
                    />
            </button>
            <Slider
              aria-label="Volume"
              value={sound.volume}
              color={volumeColor}
              onChange={func.handleChange}
            />
            <button className="w-[17%]" onClick={() => maxVolume()}>
                <Image
                      src={`/assets/images/soundOn_${option ? option : iconTheme}.png`}
                      width={100}
                      height={100}
                      alt="soundIcon"
                    />
            </button>
          </Stack>
        </Box>
      )}
    </>
  );
}
