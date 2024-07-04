"use client";

import { homeInformation } from "@/portfolio";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import useTypewriter from "@/lib/useTypewriter";
import { useEffect, useState } from "react";
const api = process.env.NEXT_PUBLIC_TRANSLATE_API;

const Home = () => {
  const handleDownloadCV = () => {
    window.open(homeInformation.cvLink, "_blank");
  };

  const typewriterText = useTypewriter(
    "Translate dialect language to Tunisian Arabic 🇹🇳",
    50
  );

  const [formData, setFormData] = useState({ text: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { text: formData.text };

    try {
      const response = await fetch(api + "/v1/api/translate/tunisian-dialect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ handleSubmit ~ data:", data);
        setResult(data.translatedText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-full">
      <form
        className="container mx-auto h-full  w-full flex flex-col "
        onSubmit={handleSubmit}
        method="post"
      >
        <h1 className="h3 text-black">{typewriterText}</h1>

        <div className="flex w-full xl:w-2/3 flex-col xl:flex-row gap-4 items-center justify-center pt-8 pb-12 xl:pt-8 xl:pb-12">
          <Textarea
            className="h-[100px] w-full"
            placeholder="Type your message here (max 3 words)"
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </div>
        <Button size="lg" className="w-full xl:w-2/3" type="submit">
          Submit
        </Button>
        <h1 className="h3 text-black w-full xl:w-2/3 mt-20  self-center">
          {result}
        </h1>
      </form>
    </section>
  );
};

export default Home;
