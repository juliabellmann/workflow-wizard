import { useRouter } from "next/router";

export default function TaskDetails({ tasks }) {
    const router = useRouter();
    const { id } = router.query;

    // Warten, bis der Router bereit ist
    if(!router.isReady) return <div>Loading ...</div>;

    // finde die Tasks
    const taskData = tasks ? tasks.find((task) => task.id === id) : null;

    // Fallback für fehlende Daten
    if (!taskData) return <div>No data available</div>;

    return (
        <>
        
            <h2>{taskData.title}</h2>
            <p>{taskData.description}</p>
            <span>{taskData.priority}</span>
            <span>{taskData.dueDate}</span>
        </>
    )


}