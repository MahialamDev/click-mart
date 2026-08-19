"use client";

import { useEffect, useState } from "react";
import { Laptop, Globe, Cpu, Network, RefreshCw } from "lucide-react";

interface DeviceInfo {
  model: string;
  os: string;
  browser: string;
  ip: string;
}

interface UserAgentData {
  getHighEntropyValues: (hints: string[]) => Promise<{
    model?: string;
    platform?: string;
  }>;
}

interface NavigatorWithUAData extends Navigator {
  userAgentData?: UserAgentData;
}

export default function DeviceInfo() {
  const [device, setDevice] = useState<DeviceInfo>({
    model: "",
    os: "",
    browser: "",
    ip: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  async function detectDevice() {
    setLoading(true);

    const navigatorWithUA = navigator as NavigatorWithUAData;
    const ua = navigator.userAgent;
    const uaData = navigatorWithUA.userAgentData;

    // -------------------------
    // 1. Operating System Detection
    // -------------------------
    let os = "Unknown OS";
    if (/Android/i.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
    else if (/Windows/i.test(ua)) os = "Windows";
    else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
    else if (/Linux/i.test(ua)) os = "Linux";
    else if (/CrOS/i.test(ua)) os = "ChromeOS";

    // -------------------------
    // 2. Browser Detection (Order matters!)
    // -------------------------
    let browser = "Unknown Browser";
    if (/Edg/i.test(ua)) browser = "Microsoft Edge";
    else if (/OPR|Opera/i.test(ua)) browser = "Opera";
    else if (/Chrome/i.test(ua)) browser = "Google Chrome";
    else if (/Firefox/i.test(ua)) browser = "Mozilla Firefox";
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";

    // -------------------------
    // 3. Device Model Detection
    // -------------------------
    let model = "Desktop / Generic Device";

    if (uaData && typeof uaData.getHighEntropyValues === "function") {
      try {
        const data = await uaData.getHighEntropyValues(["model", "platform"]);
        if (data.model) {
          model = data.model;
        }
      } catch {
        // Fallback if permission denied
      }
    }

    // Android UA Regex Fallback
    if (model === "Desktop / Generic Device" && /Android/i.test(ua)) {
      const match = ua.match(/Android[^;]*;\s*(?:[a-zA-Z-]+;\s*)?([^;)]+)/);
      if (match?.[1]) {
        model = match[1].trim();
      }
    } else if (/iPhone/i.test(ua)) {
      model = "Apple iPhone";
    } else if (/iPad/i.test(ua)) {
      model = "Apple iPad";
    }

    // -------------------------
    // 4. IP Address Detection
    // -------------------------
    let ip = "Unavailable";
    try {
      const response = await fetch("/api/device-info");
      if (response.ok) {
        const data = await response.json();
        ip = data.ip || "Unavailable";
      }
    } catch {
      ip = "Fetch Failed";
    }

    setDevice({ model, os, browser, ip });
    setLoading(false);
  }

  useEffect(() => {
    detectDevice();
  }, []);

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/50 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Device Information</h3>
          <p className="text-xs text-gray-500">Real-time system diagnostics</p>
        </div>
        <button
          onClick={detectDevice}
          disabled={loading}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50"
          title="Refresh Info"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 gap-4">
        {/* Device Model */}
        <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div className="p-2.5 bg-blue-100/60 text-blue-600 rounded-xl">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Device Model</p>
            {loading ? (
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-sm font-semibold text-gray-800">{device.model}</p>
            )}
          </div>
        </div>

        {/* Operating System */}
        <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div className="p-2.5 bg-purple-100/60 text-purple-600 rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Operating System</p>
            {loading ? (
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-sm font-semibold text-gray-800">{device.os}</p>
            )}
          </div>
        </div>

        {/* Browser */}
        <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div className="p-2.5 bg-emerald-100/60 text-emerald-600 rounded-xl">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Web Browser</p>
            {loading ? (
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-sm font-semibold text-gray-800">{device.browser}</p>
            )}
          </div>
        </div>

        {/* IP Address */}
        <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div className="p-2.5 bg-amber-100/60 text-amber-600 rounded-xl">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">IP Address</p>
            {loading ? (
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-sm font-semibold font-mono text-gray-800">{device.ip}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}