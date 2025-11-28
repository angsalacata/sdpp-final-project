import { fetchSchedule } from "../lib/radio-actions";

// general archive table
export default async function ScheduleList() {

    const weekSchedule = await fetchSchedule();

    console.log("week schedule!")
    console.log(weekSchedule.schedules)

return(
    <div>
        { weekSchedule.schedules.length > 0 && (
            <div>
                {weekSchedule.schedules?.map((schedEvent: any, index: number) => (
                    <div key={index}>
                        <a>{index + 1}. {schedEvent['title']} from {schedEvent['start']} to {schedEvent['end']}</a>
                    </div>

                ))}
            </div>
        )
        }
    </div>
)

}