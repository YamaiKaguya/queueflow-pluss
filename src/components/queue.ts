import { QueueRow } from "@/src/features/(Staff)/dashboard/_hooks/useStaff" // adjust path if needed

export function buildCallQueue(waiting: QueueRow[]) {
    const priority = waiting.filter(t => t.priority)
    const normal = waiting.filter(t => !t.priority)

    const result: QueueRow[] = []

    let i = 0
    let j = 0

    while (i < normal.length || j < priority.length) {
        for (let n = 0; n < 2 && i < normal.length; n++) {
            result.push(normal[i++])
        }

        if (j < priority.length) {
            result.push(priority[j++])
        }
    }

    return result
}