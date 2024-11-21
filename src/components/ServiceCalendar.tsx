import React, { useEffect } from 'react';
import { addDays, isSameDay, isAfter, isBefore, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface ServiceCalendarProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  onCheckout: () => void;
}

interface DayProps {
  date?: Date;
  displayMonth?: Date;
  selected?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  [key: string]: any;
}

export default function ServiceCalendar({ selectedDate, onSelect, onCheckout }: ServiceCalendarProps) {
  const today = new Date();
  const nextAvailableDate = addDays(today, 7);

  useEffect(() => {
    if (!selectedDate) {
      onSelect(today);
    }
  }, []);

  const isDateUnavailable = (date: Date) => {
    return isAfter(date, today) && isBefore(date, nextAvailableDate);
  };

  const getPrice = (date: Date) => {
    return isSameDay(date, today) ? 59 : 119;
  };

  return (
    <div className="p-3 bg-white rounded-xl border border-gray-200">
      <div className="text-center mb-2">
        <h3 className="text-base font-medium text-gray-900">
          Select Appraisal Date
        </h3>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        disabled={(date) => {
          if (isSameDay(date, today)) return false;
          return isBefore(date, today) || isDateUnavailable(date);
        }}
        defaultMonth={today}
        components={{
          Day: ({ date, displayMonth: _, ...props }: DayProps) => {
            if (!date) return null;
            
            const { selected, disabled, hidden, ...domProps } = props;
            const isUnavailable = isDateUnavailable(date);
            const isPast = isBefore(date, today) && !isSameDay(date, today);
            const isToday = isSameDay(date, today);
            const isSelectedDay = selectedDate && isSameDay(date, selectedDate);
            const price = getPrice(date);
            
            if (isPast) {
              return (
                <div className="h-10 w-full flex items-center justify-center">
                  <span className="text-gray-300">{format(date, 'd')}</span>
                </div>
              );
            }

            if (isUnavailable) {
              return (
                <div className="h-10 w-full flex items-center justify-center">
                  <span className="text-red-400 line-through">{format(date, 'd')}</span>
                </div>
              );
            }

            return (
              <button
                type="button"
                {...domProps}
                className={cn(
                  "h-10 w-full p-0 relative cursor-pointer hover:bg-gray-100 rounded-lg transition-colors",
                  isSelectedDay && "bg-gray-900 hover:bg-gray-800"
                )}
                onClick={() => onSelect(date)}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={cn(
                    "text-sm font-medium",
                    isSelectedDay ? "text-white" : "text-gray-900"
                  )}>
                    {format(date, 'd')}
                  </span>
                  {(isToday || isAfter(date, nextAvailableDate)) && (
                    <span className={cn(
                      "text-xs",
                      isSelectedDay ? "text-white" : isToday ? "text-blue-600" : "text-green-600"
                    )}>
                      ${price}
                    </span>
                  )}
                </div>
              </button>
            );
          }
        }}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-2",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 rounded-full transition-colors"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-gray-500 rounded-md w-10 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm relative w-10 h-10 p-0",
          day: "h-10 w-10 p-0 font-normal",
          day_selected: "bg-gray-900 text-white hover:bg-gray-800",
          day_today: "text-blue-600 font-semibold",
          day_outside: "text-gray-300",
          day_disabled: "text-gray-300",
        }}
      />

      {selectedDate && isSameDay(selectedDate, today) && (
        <div className="mt-2 flex items-center justify-between px-2 py-1.5 bg-red-50 rounded-lg border border-red-100">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium text-red-600">Last spot today!</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm line-through text-gray-400">$119</span>
            <span className="text-sm font-semibold text-green-600">$59</span>
          </div>
        </div>
      )}

      {selectedDate && (
        <div className="mt-3 space-y-3">
          <Button 
            onClick={onCheckout}
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            Continue to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      )}
    </div>
  );
}