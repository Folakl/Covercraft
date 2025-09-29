import React, { useState } from "react";
import { supabase } from "../SupabaseClient";

const ResumeGeneration = () => {
   const hfModel = import.meta.env.VITE_HF_MODEL;
  const hfToken = import.meta.env.VITE_HF_TOKEN;

  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [getsummary, setGetsummary] = useState(""); // <-- store summary here

  const FetchSummary = async () => {
    try {
      const {
        data: {user}, error: userError,} = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Error fetching user:", userError);
        return;
      }
      const { data, error } = await supabase.from("resumes").select("resume_data").eq("profile_id", user.id).single();
      if (error) {
        console.error("Error fetching summary:", error);
        return;
      }
      const fetchedSummary = data?.resume_data?.summary || "";
      setGetsummary(fetchedSummary);
      console.log("Fetched summary:", fetchedSummary);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const GenerateResume = async () => {
  
    if (getsummary === "") {
      setResume("Please provide a summary before generating a resume.");
      return;
    }

    
    try {
      setLoading(true);
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${hfModel}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: `write a professional resume i text format using thr following resume data ${getsummary},the resume should include,personal information,education,skill,work experience and certification`}),
        }
      );

      const result = await response.json();
      let output = "No result found";
      if (Array.isArray(result) && result[0]?.summary_text) {
        output = result[0].summary_text;
      } else if (result?.summary_text) {
        output = result.summary_text;
      } else if (result?.error) {
        output = `Error: ${result.error}`;
      }

      console.log("AI resume:", output);
      setResume(output);
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-blue-500 rounded-md font-bold w-fit px-10 py-5 h-fit mt-10 text-center">
        <h3 className="my-4">Generate Resume</h3>

        <button className="w-[120px] h-[30px] rounded-2xl bg-blue-950 text-white fornt-bold" onClick={FetchSummary}>fetch summary</button>

        {
          loading?
          (<button
          className="font-extrabold rounded-2xl w-fit px-5 py-2 cursor-progress text-white bg-green-700"
          onClick={GenerateResume}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>):
        (
          <button
          className="font-extrabold rounded-2xl w-fit px-5 py-2 cursor-pointer text-white bg-green-700"
          onClick={GenerateResume}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
        )
        }

        {loading ? (
          <h3>Loading....</h3>
        ) : (
          <h3 className="mt-4">Resume: {resume}</h3>
        )}
      </div>
    </div>
  );
};

export default ResumeGeneration;
