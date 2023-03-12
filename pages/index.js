import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import StringToPDF from './StringToPDF';

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

// Randomizer: Generate random job title
function randomJobTitle() {
  const jobTitles = ["Software Engineer", "Piano Teacher", "Guest Experience Expert", "Baker", "Pro Gamer",
"Swim Instructor", "Painter", "Comedian"];
  const randomIndex = Math.floor(Math.random() * jobTitles.length);
  return jobTitles[randomIndex];
}

function randomSkill() {
  const skills = ["Multi-tasking", "Being organized", "Juggling", "Java", "C", "Python", "Running really fast"];
  const randomIndex = Math.floor(Math.random() * skills.length);
  return skills[randomIndex];
}

function randomPosition() {
  const position = ["Student", "Tutor", "Freelancer"];
  const randomIndex = Math.floor(Math.random() * position.length);
  return position[randomIndex];
}

function randomDuration() {
  const duration = ["1 year", "3 months", "5 years", "6 months"];
  const randomIndex = Math.floor(Math.random() * duration.length);
  return duration[randomIndex];
}

function randomDescription() {
  const description = ["Team leader", "Tried not to break anything", "Kept operations running"];
  const randomIndex = Math.floor(Math.random() * description.length);
  return description[randomIndex];
}

function randomName() {
  const name = ["Elsa", "Mai", "Cyrus", "Nico", "Tomek", "Justin", "Trevor"];
  const randomIndex = Math.floor(Math.random() * name.length);
  return name[randomIndex];
}

function onSurpriseClick() {
  setJobTitleInput(randomJobTitle());
  setSkillInput(randomSkill());
  setPositionInput(randomPosition());
  setDurationInput(randomDuration());
  setDescriptionInput(randomDescription());
  setNameInput(randomName());
}



  return (
      // <div style={{backgroundColor: '#FFFFF0'}}>
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
            placeholder="Enter your past job positions"
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
            placeholder="Enter your job description"
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
          <input type="button" value="Surprise me!" onClick={onSurpriseClick} />
          <br></br>
          <input type="submit" value="Generate cover letter"/>
          <br></br>
          <StringToPDF stringToConvert= {result}/>
        </form>
        
      </main>
    </div>
  );
}
