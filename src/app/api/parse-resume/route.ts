import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;

// Predefined list of common tech skills to look for
const SKILL_DICTIONARY = [
    "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Angular", "Node.js", "Express",
    "Python", "Django", "Flask", "Java", "Spring Boot", "C#", ".NET", "Ruby", "Ruby on Rails",
    "PHP", "Laravel", "Go", "Golang", "Rust", "Swift", "Kotlin", "C++", "C",
    "HTML", "CSS", "Tailwind CSS", "Sass", "Less", "Bootstrap",
    "SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis", "Elasticsearch", "Prisma",
    "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "GCP", "Linux", "Git", "GitHub", "GitLab",
    "CI/CD", "Jenkins", "GitHub Actions", "Terraform", "Ansible",
    "Machine Learning", "Data Science", "AI", "TensorFlow", "PyTorch", "Pandas", "NumPy",
    "Agile", "Scrum", "Jira", "Figma", "UI/UX", "REST API", "GraphQL", "WebSockets"
];

function extractSkills(text: string): string[] {
    const foundSkills = new Set<string>();
    const lowerText = text.toLowerCase();

    // Match skills, accounting for word boundaries (e.g., matching "C" but not the "c" in "React")
    for (const skill of SKILL_DICTIONARY) {
        // Special case for C++ to escape the + signs in regex
        const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');

        if (regex.test(lowerText) || (skill === "C++" && lowerText.includes("c++"))) {
            foundSkills.add(skill);
        }
    }

    return Array.from(foundSkills);
}

function extractExperience(text: string): { role: string; company: string; duration: string }[] {
    const experiences: { role: string; company: string; duration: string }[] = [];

    // This is a naive heuristic parser for demonstration purposes.
    // In a production app, you would ideally send the extracted text to an LLM like OpenAI to parse perfectly.

    // Look for lines that look like date ranges (e.g., "Jan 2020 - Present", "2018 - 2021")
    const dateRangeRegex = /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}|\d{4})\s*(?:-|to|–)\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}|\d{4}|Present|Current)/gi;

    const lines = text.split('\n').filter(line => line.trim().length > 0);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (dateRangeRegex.test(line)) {
            // Found a date line. The line before or after usually contains the role/company.
            const dateLine = line.trim();
            const prevLine = i > 0 ? lines[i - 1].trim() : "";
            const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : "";

            // Assume the previous line is the Role or Company, and next line is the other.
            // This is a rough guess for typical resume formats.
            if (prevLine && prevLine.length < 100) {
                experiences.push({
                    role: prevLine,
                    company: "Extracted Company/Role", // Placeholder as it's hard to differentiate without NLP
                    duration: dateLine,
                });
            } else if (nextLine && nextLine.length < 100) {
                experiences.push({
                    role: nextLine,
                    company: "Extracted Company/Role",
                    duration: dateLine,
                });
            }

            // Limit to top 3 experiences to avoid cluttering UI with false positives from naive parsing
            if (experiences.length >= 3) break;
        }
    }

    // Fallback if the regex fails to find typical dates
    if (experiences.length === 0) {
        experiences.push({ role: "Resume Parsed", company: "Please review manually", duration: "Dates unreadable" });
    }

    return experiences;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert the File to a Buffer for pdf-parse
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract text mathematically from the PDF
        const pdfData = await pdfParse(buffer);
        const text = pdfData.text;

        // Run logic to structure the raw text
        const skills = extractSkills(text);
        const experience = extractExperience(text);

        return NextResponse.json({
            success: true,
            data: {
                skills: skills.length > 0 ? skills : ["No recognizable technical skills found"],
                experience: experience
            }
        });

    } catch (error: unknown) {
        console.error("Error parsing resume:", error);
        return NextResponse.json({ error: "Failed to parse resume", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
