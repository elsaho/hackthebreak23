import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [positionInput, setPositionInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    if (
      !jobTitleInput.trim() ||
      !skillInput.trim() ||
      !positionInput.trim() ||
      !durationInput.trim() ||
      !descriptionInput.trim() ||
      !nameInput.trim()
    ) {
      alert("Please enter all the required fields");
      return;
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: jobTitleInput,
          skills: skillInput,
          pastJobs: positionInput,
          duration: durationInput,
          jobDescription: descriptionInput,
          name: nameInput,
        }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
  
      setResult(data.result);
      setJobTitleInput("");
      setSkillInput("");
      setPositionInput("");
      setDurationInput("");
      setDescriptionInput("");
      setNameInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  

  return (
    <div>
      <Head>
        <title>Cover Letter Generator</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <img src="/cowboyemoji.png" className={styles.icon} />
        <h3>Cover Letter Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter a job title"
            value={jobTitleInput}
            onChange={(e) => setJobTitleInput(e.target.value)}
          />
          <input
            type="text"
            name="skills"
            placeholder="Enter your skills (comma-separated)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <input
            type="text"
            name="position"
            placeholder="Enter your past job position"
            value={positionInput}
            onChange={(e) => setPositionInput(e.target.value)}
          />
          <input
            type="text"
            name="duration"
            placeholder="Enter your past job duration"
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Enter your past job description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input type="submit" value="Generate cover letter" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
