import { KanbanBoard } from "@/components/tracker/KanbanBoard";
import { getApplications } from "@/app/actions/applications";

export default async function ApplicationsPage() {
    const applications = await getApplications();

    return (
        <KanbanBoard initialApplications={applications} />
    );
}
