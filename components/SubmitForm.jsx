"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
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
} from "./ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { Input } from "./ui/input";
import useTypewriter from "@/lib/useTypewriter";

const api = process.env.NEXT_PUBLIC_TRANSLATE_API;

function SubmitForm() {
  const typewriterText = useTypewriter(
    "Translate dialect language to Tunisian Arabic 🇹🇳",
    50
  );

  const [formData, setFormData] = useState({ text: "" });
  const [result, setResult] = useState("");
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
        const data = await response.json();
        setResult(data.translatedText);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong! Please try again",
      });
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
      toast({
        title: "Error",
        description: "Something went wrong! Please try again",
      });
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
        toast({
          title: "Error",
          description:
            "Something went wrong! Failed to copy text Please try again",
        });
      }
    );
  };

  return (
    <form
      className="container mx-auto h-full w-full flex flex-col gap-8 mt-10  items-center justify-start text-start "
      onSubmit={handleSubmit}
      method="post"
    >
      <h1 className="h3 text-black ">{typewriterText}</h1>

      <div className="flex w-full xl:w-2/3 flex-col xl:flex-row items-center justify-center ">
        <Textarea
          className="h-[100px] w-full "
          placeholder="Type your message here (max 3 words)"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
      </div>
      <Button size="lg" className="w-full xl:w-2/3" type="submit">
        Submit
      </Button>

      {result.length > 0 && (
        <>
          <h1 className="h3 text-black">Your translation:</h1>

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
        </>
      )}
    </form>
  );
}

export default SubmitForm;
