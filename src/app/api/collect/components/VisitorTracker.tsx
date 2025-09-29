// components/VisitorTracker.tsx  (replace current inner logic)
"use client";
import { useEffect } from "react";

async function sha256Base64(str: string) {
  const bytes = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

function canvasFingerprint() {
  try {
    const c = document.createElement("canvas");
    c.width = 200; c.height = 60;
    const ctx = c.getContext("2d")!;
    ctx.textBaseline = "top";
    ctx.fillStyle = "#f60"; ctx.fillRect(0,0,200,60);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#069"; ctx.fillText("fp test",2,2);
    return c.toDataURL();
  } catch { return "err"; }
}

function webglFingerprint() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || (canvas as any).getContext("experimental-webgl");
    if (!gl) return "no-webgl";
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const v = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : "unknown";
    const r = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "unknown";
    return `${v}~${r}`;
  } catch { return "err"; }
}

async function getLocalIPs() {
  const ips = new Set<string>();
  try {
    const pc = new RTCPeerConnection({ iceServers: [] as any[] });
    pc.createDataChannel("");
    pc.onicecandidate = (e:any) => {
      if (!e.candidate) return;
      const parts = e.candidate.candidate.split(" ");
      const ip = parts[4];
      if (ip) ips.add(ip);
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await new Promise(r=>setTimeout(r,500));
    pc.close();
  } catch {}
  return Array.from(ips);
}
// (keep your canvas/webgl/getLocalIPs functions here)...

function roundCoord(v: number, decimals = 4) {
  const p = Math.pow(10, decimals);
  return Math.round(v * p) / p;
}

function getGeoPosition(options: PositionOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject(new Error("Geolocation not supported"));
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export default function VisitorTracker(){
  useEffect(()=>{
    (async ()=>{
      try {
        const nav = navigator as any;
        const localIPs = await getLocalIPs();
        const baseData: any = {
          timestamp: new Date().toISOString(),
          userAgent: nav.userAgent || "",
          platform: nav.platform || "",
          languages: navigator.languages ? navigator.languages.join(",") : (navigator.language || ""),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
          screen: `${screen.width}x${screen.height}`,
          colorDepth: screen.colorDepth,
          pixelRatio: window.devicePixelRatio || 1,
          canvas: canvasFingerprint(),
          webgl: webglFingerprint(),
          localIPs,
          locationConsent: false,    // will flip true if we got location
        };

        // --- Ask for location (optional) ---
        // You should show your own UI notice before this in real apps.
        // For quick demo: use confirm() (browser dialog) — later replace with a nicer modal.
        let gotLocation = null;
        try {
          const allow = confirm("Allow this site to access your location to improve analytics?"); // replace with a custom UI in prod
          if (allow) {
            const pos = await getGeoPosition({ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
            const c = pos.coords;
            // store exact coords (be careful) and also a rounded version for privacy
            baseData.locationConsent = true;
            baseData.latitude = c.latitude;
            baseData.longitude = c.longitude;
            baseData.altitude = c.altitude ?? null;
            baseData.accuracy = c.accuracy;
            baseData.heading = c.heading ?? null;
            baseData.speed = c.speed ?? null;

            // rounded coordinates (reduce precision) - e.g. 3 decimals ~ 100m, 4 decimals ~ 11m
            baseData.latitude_rounded = roundCoord(c.latitude, 4);   // change decimals as needed
            baseData.longitude_rounded = roundCoord(c.longitude, 4);
            gotLocation = true;
          }
        } catch (geoErr) {
          // permission denied or timeout — continue without location
          console.warn("geo error:", geoErr);
          baseData.locationConsent = false;
        }

        // fingerprinting (as before)
        const combined = [
          baseData.userAgent, baseData.platform, baseData.languages,
          baseData.timezone, baseData.screen, baseData.canvas, baseData.webgl,
          localIPs.join(",")
        ].join("||");
        baseData.fingerprint = await sha256Base64(combined);

        // send to server
        await fetch("/api/collect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(baseData)
        });
      } catch (e) {
        console.warn("visitor track failed", e);
      }
    })();
  }, []);
  return null;
}
