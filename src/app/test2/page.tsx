"use client";

import DeviceInfo2 from "@/components/DeviceInfo";
import { useEffect, useState } from "react";

interface UserAgentData {
  model: string;
  platform: string;
  platformVersion: string;
  architecture: string;
  getHighEntropyValues(hints: string[]): Promise<{
    model: string;
    platform: string;
    platformVersion: string;
    architecture: string;
  }>;
}

interface NavigatorWithUAData extends Navigator {
  userAgentData?: UserAgentData;
}

export default function DeviceInfo() {
  const [model, setModel] = useState("Detecting...");

  useEffect(() => {
    async function detect() {
      const ua = (navigator as NavigatorWithUAData).userAgentData;

      if (!ua) {
        setModel("Not available");
        return;
      }

      const data = await ua.getHighEntropyValues([
        "model",
        "platform",
        "platformVersion",
        "architecture",
      ]);

      setModel(data.model || "Unknown");
    }

    detect();
  }, []);

    return <div>Your device: {model}

    <DeviceInfo2 />

    </div>;
}