import React, { useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";
const SummarizeAi = () => {

  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const hfToken = import.meta.env.VITE_HF_TOKEN;
  const hfModel = import.meta.env.VITE_HF_MODEL;

  // Fetch latest resume
  const Fetch = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Unexpected error fetching user:", userError);
        return null;
      }

      const { data: resumes, error: resumesError } = await supabase
        .from("resumes")
        .select("id, resume_data")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: true });

      if (resumesError) {
        console.error("Error fetching resumes:", resumesError);
        alert("Error fetching resumes. Please log in again.");
        return null;
      }

      if (resumes && resumes.length > 0) {
        return resumes[resumes.length - 1]; // latest resume
      } else {
        alert("No resumes found for this user.");
        return null;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      return null;
    }
  };

  // Generate summary
  const Getsummary = async (resumes) => {
    if (!resumes) {
      alert("There is no available resume to summarize");
      return null;
    }
      


    const combinedText = `
My name is ${resumes.resume_data.personal?.name || "N/A"} a female,my email address is ${resumes.resume_data.personal.email},my phone number is ${resumes.resume_data.phoneNumber}.
 
I am a ${resumes.resume_data.personal?.title || "N/A"} based in ${resumes.resume_data.personal?.location || "N/A"}.
You can reach me at ${resumes.resume_data.personal?.phoneNumber || "N/A"} or ${resumes.resume_data.personal?.email || "N/A"}.

I studied ${resumes.resume_data.education?.degree || "N/A"} at ${resumes.resume_data.education?.institutionName || "N/A"}.
I worked as a ${resumes.resume_data.workexperience?.jobtitle || "N/A"} at ${resumes.resume_data.workexperience?.companyName || "N/A"}.
My skills include ${resumes.resume_data.skill?.technicalSkill || "N/A"} and ${resumes.resume_data.skill?.softSkill || "N/A"}.
i have a ${resumes.resume_data.name} certificate which was issued at ${resumes.resume_data.dateissued} at ${resumes.resume_data.organization} organization,the description of my certification is ${resumes.resume_data.description},
i have a degree ${resumes.resume_data.degree} at ${resumes.resume_data.institutionName} and the intitution location is ${resumes.resume_data.Location},stating at year ${resumes.resume_data.startDate} and ended at year ${resumes.resume_data.endDate},
i have a skill in ${resumes.resume_data.technicalSkill} and ${resumes.resume_data.softSkill} and my knowledge level is ${resumes.resume_data.Level}
    `;

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
          body: JSON.stringify({ inputs: combinedText }),
        }
      );

      const result = await response.json();

      let output = "No summary returned";
      if (Array.isArray(result) && result[0]?.summary_text) {
        output = result[0].summary_text.trim();
      } else if (result?.summary_text) {
        output = result.summary_text.trim();
      }

      console.log("AI summary:", output);
      setSummary(output);
      return output;
    } catch (error) {
      console.error("Error generating summary:", error);
      return null;
    } finally {
      setLoading(false);
      navigate("/resumegen")
    }
  };

  // Save summary back to Supabase
const submitSummary = async (resume, summaryText) => {
  if (!resume?.id || !summaryText) return;

  const { data, error } = await supabase
    .from("resumes")
    .update({
      resume_data: {
        ...resume.resume_data,   // keep old fields
        summary: summaryText     // add new summary field
      }
    })
    .eq("id", resume.id)
    .select();

  if (error) {
    console.error("Error saving summary:", error);
    alert("Error saving summary");
  } else {
    console.log("Summary saved:", data);
  }
};

  const handleSummarize = async () => {
    const resume = await Fetch();
    if (resume) {
      const summaryText = await Getsummary(resume);
      if (summaryText) {
        await submitSummary(resume, summaryText);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-10 text-center">
        <button
          className={` bg-blue-950 font-bold text-white rounded-2xl py-2 px-5 ${
            loading ? "cursor-progress" : "cursor-pointer"
          }`}
          onClick={handleSummarize}
        >
          {loading ? "Summarizing..." : "Summarize data"}
        </button>

        <h3 className="mt-4 text-gray-800 font-medium">
          Summary: {summary || "No summary yet"}
        </h3>
      </div>
    </div>
  );
};

export default SummarizeAi;
