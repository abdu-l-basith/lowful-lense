// app/page.tsx
"use client";
import React,{useState} from "react";
import { useRouter } from "next/navigation";
import VisitorTracker from "./api/collect/components/VisitorTracker";

export default function Page() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <button className="p-2 rounded-md border bg-sky-50 text-sky-600">☰</button>
          <div className="text-2xl font-extrabold text-sky-600">LawFul Lense</div>
          <nav className="ml-auto hidden md:flex gap-4 text-sm text-gray-600">
            <a className="hover:underline">Home</a>
            <a className="hover:underline">Blog</a>
            <a className="hover:underline">About</a>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 mt-6">
        

        <main className="mt-6">
         <VisitorTracker></VisitorTracker>
          <article className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="text-sm text-sky-600 mb-2">Home › Blog</div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-black" style={{lineHeight:1.02}}>
              Cyberbullying and Posting Photos Without Permission: Indian Laws and Remedies
            </h1>

            <div className="text-sm text-gray-500 mb-6 flex items-center">
              <time>October 18, 2024</time>
              <div className="ml-auto text-blue-400">💬 4</div>
            </div>

            <div className="mb-6">
              <img src="https://eccweb.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/04/26103925/THE-ROLE-OF-CYBER-LAWS-IN-CYBERSECURITY-1.png" alt="money" className="w-full max-w-xs rounded shadow" />
            </div>

            <div className="prose prose-slate max-w-none text-gray-800">
              <h3>📌 Introduction</h3>
              <p>The rise of social media and digital platforms has given people the power to share opinions, images, and content instantly. But with this freedom comes responsibility. Unfortunately, cyberbullying and the unauthorized use of photos are increasing concerns in India. Both are punishable under Indian law, and victims have the right to seek justice.</p>
              <div className="flex justify-center items-center py-10">
      {visible ? (
        <div className="relative max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center">
          {/* Dots button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ⋮
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 text-white font-bold text-lg px-4 py-2 rounded">
              iphone 17 Pro Max 📱
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-black">
            SPIN & WIN
          </h2>
          

          {/* Google Play */}
          <div className="flex justify-center mb-6">
            <img
              src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFL4?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=ZEVzaXE4Tll0V1BEenhKMEpmaVRId2tuVHYzMERCZURia3c5SzJFOTlPaWVqbEpIZ1hib0hHcnQwY0VMaEZFTllkZnRZWVpKdHArK2szNHR3MEVyYlE"
              alt="Google Play"
            
            />
          </div>

          {/* Install Button */}
          <button onClick={() => router.push("/spin")} className="bg-purple-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full w-full font-bold">
            SPIN NOW !
          </button>
        </div>
      ) : (
        // Show button when ad hidden
        <button
          onClick={() => setVisible(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full"
        >
          Show Ad
        </button>
      )}
    </div>
              <h3>⚖️ Laws on Cyberbullying in India</h3>
              <p>While India does not have a dedicated cyberbullying law, several provisions of the Information Technology Act, 2000 (IT Act) and the Indian Penal Code (IPC) apply:<br/>

Section 66A IT Act (struck down, but earlier punished offensive online messages).<br/>

Section 66D IT Act – Punishes cheating by impersonation using computer resources.<br/>

Section 67 IT Act – Punishes publishing or transmitting obscene material online.<br/>

Section 354D IPC (Stalking) <br/>– Includes online stalking, such as repeated messages, monitoring, or harassing someone on social media.

Section 503 & 506 IPC – Criminal intimidation (threatening messages or posts).<br/>

Section 509 IPC – Insulting the modesty of a woman, including offensive online comments.</p>

              <h3>Punishment:</h3>
              <p>Fine up to ₹1–5 lakhs.<br/>

Imprisonment ranging from 3 to 7 years, depending on the offense.</p>
<h3>📷 Posting Someone’s Photo Without Permission</h3>
<p>Sharing or editing another person’s photos without consent can amount to invasion of privacy and harassment. Relevant laws:</p>
<p>Section 66E IT Act – Punishes capturing, publishing, or transmitting images of a person’s private area without consent.</p>
<p>Section 67 IT Act – If the photo is obscene, stricter punishment applies.</p>
<p>Section 354C IPC (Voyeurism) – Sharing images without permission, especially of women.</p>
<p>Copyright Act, 1957 – If the photo is original and copyrighted, unauthorized use may also be a copyright violation.</p>
<h3>Punishment</h3>
<p>Fine up to ₹2 lakhs.</p>
<p>Imprisonment of 3 to 7 years (depending on severity).</p>
<h3>📝 How Can a Victim File a Complaint?</h3>
<p>If you face cyberbullying or unauthorized use of photos, here’s what to do: <br/>

Collect Evidence<br/>

Take screenshots of abusive messages/posts.<br/>

Save the URL links and note the date & time.<br/>

File a Complaint Online<br/>

Visit the official National Cyber Crime Reporting Portal: https://cybercrime.gov.in<br/>

Choose "Report Women/Child Related Crime" or "Report Other Cyber Crimes".<br/>

Police Complaint<br/>

File an FIR at your local police station under relevant IT Act/IPC sections.<br/>

You can also approach the Cyber Crime Cell in your city.<br/>

For Women<br/>

You can lodge a complaint with the National Commission for Women (NCW), which takes up such cases with police.</p>
            </div>
            <div className="flex justify-center items-center py-10">
      {visible ? (
        <div className="relative max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center">
          {/* Dots button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            ⋮
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 text-white font-bold text-lg px-4 py-2 rounded">
              iphone 17 Pro Max 📱
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-black">
            SPIN & WIN
          </h2>
          

          {/* Google Play */}
          <div className="flex justify-center mb-6">
            <img
              src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFL4?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=ZEVzaXE4Tll0V1BEenhKMEpmaVRId2tuVHYzMERCZURia3c5SzJFOTlPaWVqbEpIZ1hib0hHcnQwY0VMaEZFTllkZnRZWVpKdHArK2szNHR3MEVyYlE"
              alt="Google Play"
            
            />
          </div>

          {/* Install Button */}
          <button onClick={() => router.push("/spin")} className="bg-purple-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full w-full font-bold">
            SPIN NOW !
          </button>
        </div>
      ) : (
        // Show button when ad hidden
        <button
          onClick={() => setVisible(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full"
        >
          Show Ad
        </button>
      )}
    </div>
          </article>
        </main>

        <footer className="mt-8 pb-12 text-sm text-gray-500 border-t pt-4">
          © 2025 LawFul Lense. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
