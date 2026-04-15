async function generateExternalTip(prompt) {
  if (!process.env.HUGGINGFACE_API_KEY || !process.env.HUGGINGFACE_MODEL) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${process.env.HUGGINGFACE_MODEL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 80,
            return_full_text: false
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error("HuggingFace API request failed");
    }

    const payload = await response.json();
    return payload?.[0]?.generated_text?.trim() || null;
  } catch (error) {
    return null;
  }
}

async function getStudySuggestions({ summary, nextLecture, lowestSubject }) {
  const baseSuggestions = {
    nextLectureSuggestion: nextLecture
      ? `Your best next move is ${nextLecture.title}. Finishing it keeps your sequence and streak healthy.`
      : "You have no pending lecture right now. Use this time for revision or notes cleanup.",
    studyTip:
      summary.progressPercentage < 30
        ? "Aim for just one focused lecture block today. Early consistency matters more than volume."
        : summary.progressPercentage < 70
          ? "Stay in momentum mode. Pair one difficult lecture with one easier one to avoid burnout."
          : "You are close to the finish line. Focus on weak subjects and protect your streak.",
    recommendedSubject: lowestSubject
      ? `Give extra attention to ${lowestSubject.subjectName}; it currently has the lowest completion percentage.`
      : "Your subject progress is balanced. Continue with the next scheduled lecture."
  };

  const prompt = `
You are a study coach. Give one short study tip for a student.
Overall progress: ${summary.progressPercentage}%
Completed lectures: ${summary.completedLectures}/${summary.totalLectures}
Current streak: ${summary.streak}
Weakest subject: ${lowestSubject?.subjectName || "N/A"}
  `.trim();

  const externalTip = await generateExternalTip(prompt);
  if (externalTip) {
    baseSuggestions.studyTip = externalTip;
  }

  return baseSuggestions;
}

module.exports = {
  getStudySuggestions
};
