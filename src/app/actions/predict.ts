"use server";

export async function simulatePrediction(jobDescription: string, resumeText: string) {
    // Simulate an AI processing delay (e.g., 1.5 seconds)
    console.log(`Analyzing job description (${jobDescription.length} chars) and resume (${resumeText.length} chars)...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate a random match score between 60 and 95
    const matchScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60;

    let tip = "";
    if (matchScore >= 90) {
        tip = "Excellent match! Your experience aligns perfectly with the core requirements.";
    } else if (matchScore >= 80) {
        tip = "Strong match. Highlighting your leadership skills in the next round could push you over the edge.";
    } else if (matchScore >= 70) {
        tip = "Good potential. The job description emphasizes 'prototyping'. Ensure you highlight your Figma proficiency.";
    } else {
        tip = "Fair match. Consider tailoring your resume more closely to emphasize the required technical stack.";
    }

    return {
        score: matchScore,
        tip: tip,
    };
}
