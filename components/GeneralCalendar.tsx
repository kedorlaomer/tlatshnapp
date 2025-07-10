import generalCalendarData from '@/assets/general_calendar.json';
import { Calendar } from '@/components/Calendar';
import { RowBreaker } from '@/components/RowBreaker';

export function GeneralCalendar(
) {
    const KEY = "Name of the Sidra";
    const containsDigit = (x) => /\d/.test(x);
    const containsNoDigit = (x) => !/\d/.test(x);
    // normal sidrot
    let labels = generalCalendarData.map((x) => x[KEY]).filter(containsDigit);

    // row breakers between books
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].endsWith(" 1")) {
            labels.splice(i++, 0, <RowBreaker key={99999+i}/>)
        }
    }

    labels.push(<RowBreaker key="holidays"/>);

    // special sidrot
    labels.push(...generalCalendarData.map((x) => x[KEY]).filter(containsNoDigit));

    return <Calendar labels={labels}/>;
}
