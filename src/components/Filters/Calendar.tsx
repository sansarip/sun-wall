
import { useState } from "react";
import Base, { BaseProps } from "./Base";
import { DatePicker } from "@blueprintjs/datetime";
import { format, getDate, getMonth, getYear, subDays } from 'date-fns'
import { useCallback } from "react";
import { noop } from "lodash";


type CalendarProps = Pick<BaseProps, "onApply" | "onClear">;

const Calendar: React.FC<CalendarProps> = ({ onApply = noop }) => {
    const yesterday = subDays(new Date(), 1);
    const [date, setDate] = useState<Date>(yesterday);
    const [appliedDate, setAppliedDate] = useState<Date>(date);
    const label = format(appliedDate, 'MMM dd, yyyy');
    const applyDate = useCallback(() => {
        setAppliedDate(date);
        // Incrementing zero-based month
        onApply(getYear(date), getMonth(date) + 1, getDate(date));
    }, [date, onApply]);
    const resetDate = () => setDate(yesterday);

    return <Base label={label} onApply={applyDate} onClose={resetDate}>
        <DatePicker value={date} onChange={setDate} shortcuts />
    </Base>
}

export default Calendar;