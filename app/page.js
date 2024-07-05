"use client";

import { homeInformation } from "@/portfolio";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useTypewriter from "@/lib/useTypewriter";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

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
  const [onSubmit, setOnSubmit] = useState(false);
  const [correctText, setcorrectText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResultChange = (e) => {
    setcorrectText(e.target.value);
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
        setOnSubmit(!onSubmit);
        const data = await response.json();
        console.log("🚀 ~ handleSubmit ~ data:", data);
        setResult(data.translatedText);
      }
    } catch (error) {
      console.log(error);
      e.preventDefault();
    }
  };

  const handleCorrect = async (event) => {
    if (!correctText) {
      setErrorMessage("The corrected text cannot be empty.");
      event.preventDefault();
      return;
    }
    if (!/[\u0600-\u06FF]/.test(correctText)) {
      setErrorMessage("The corrected text must be in Arabic.");
      event.preventDefault();
      return;
    }

    setErrorMessage("");

    const body = {
      inputText: formData.text,
      translatedText: result,
      correctText,
    };

    try {
      const response = await fetch(
        api + "/v1/api/translate/tunisian-dialect/correct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Done!",
          description: "Thank you for your correction",
        });
      }
    } catch (error) {
      console.log(error);
      event.preventDefault();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(
      () => {
        toast({
          title: "Copied!",
          description: "Translated text copied to clipboard",
        });
      },
      (err) => {
        console.log("Failed to copy text: ", err);
      }
    );
  };

  return (
    <section className="h-full relative  w-full ">
      <form
        className="container mx-auto h-full w-full flex flex-col gap-8 mt-10  items-center justify-start text-start "
        onSubmit={handleSubmit}
        method="post"
      >
        <h1 className="h3 text-black ">{typewriterText}</h1>

        <div className="flex w-full xl:w-2/3 flex-col xl:flex-row items-center justify-center ">
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
        {onSubmit && <h1 className="h3 text-black">Your translation:</h1>}
        {result.length > 0 && (
          <div className="flex w-full xl:w-2/3 gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-1/3 h-[60px]">Correct</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black ">
                    Correct Translation
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-black">
                    Modify the translated text and submit your correction.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-4 p-4">
                  <Input label="Input Text" value={formData.text} disabled />
                  <Input label="Translated Text" value={result} disabled />
                  <Textarea
                    label="Corrected Text"
                    value={correctText}
                    name="correctText"
                    placeholder="Type your corrected message here"
                    onChange={handleResultChange}
                  />
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-black">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleCorrect}>
                    Submit Correction
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Input
              type="text"
              className="h-[60px] w-2/3 text-right"
              disabled
              value={result}
            />
            <Button className="h-[60px] bg-gray-500" onClick={handleCopy}>
              <Copy />
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default Home;
