import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("ml");
  const [translatedText, setTranslatedText] = useState("");


 const translateText = async () => {
  try {
    const response = await axios.post(
      "https://google-api31.p.rapidapi.com/translate",
      {
        text: text,
        to: language,
        from_lang: "en",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "google-api31.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        },
      }
    );

    console.log(response.data);
    console.log("API RESPONSE:", response.data);

    setTranslatedText(response.data[0]?.translated);
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    setTranslatedText(
      JSON.stringify(error.response?.data || "Translation failed")
    );
  }
};

  return (
    <div className="min-h-screen bg-[#D9E1F0] flex items-center justify-center p-3">
      <div className="w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-[#121524] mb-7">
          Text Translator
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write in English..."
          className="
            w-full
            h-24
            rounded-2xl
            p-4
            bg-white/55
            backdrop-blur-md
            border
            border-white/50
            text-[#121524]
            outline-none
            resize-none
            text-lg
          "
        />

        <div className="flex justify-center items-center gap-5 my-3">

          <div
            className="
              px-12
              py-3
              rounded-xl
              bg-white/50
              backdrop-blur-md
              text-[#121524]
              font-semibold
            "
          >
            English
          </div>
          <div className="text-3xl text-[#384C65]">→</div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="
              px-8
              py-3
              rounded-xl
              bg-white/40
              backdrop-blur-md
              text-[#121524]
              font-semibold
              outline-none
            "
          >
            <option value="ml">malayalam</option>
            <option value="hi">Hindi</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>

        </div>

        <div
          className="
            relative
            w-full
            min-h-[110px]
            overflow-y-auto
            rounded-2xl
            p-4
            bg-white/40
            backdrop-blur-md
            border
            border-white/50
          "
        >
          <p className="text-base text-[#121524] break-words pr-24">
            {translatedText}
          </p>

          <button
            className="
              absolute
              right-5
              bottom-5
              bg-[#485F88]
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Copy
          </button>
        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={translateText}
            className="
              bg-[#121524]
              text-white
              px-12
              py-3
              rounded-xl
              text-lg
              hover:scale-105
              duration-300
            "
          >
            Translate
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;