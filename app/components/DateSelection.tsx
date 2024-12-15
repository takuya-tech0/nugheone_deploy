import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { Card, CardContent } from "@/app/components/ui/card"
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

type AvailabilityStatus = '○' | '△' | '×';

type DateInfo = {
  date: Date;
  formatted: string;
  availability: AvailabilityStatus;
};

type DateSelectionProps = {
  onSelect: (date: Date) => void;
  onBack: () => void;
};

export default function DateSelection({ onSelect, onBack }: DateSelectionProps) {
  const [availableDates, setAvailableDates] = useState<DateInfo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const generateWeekDates = () => {
      const dates: DateInfo[] = [];
      const startDate = new Date('2023-12-18');
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push({
          date,
          formatted: format(date, 'M月d日 (EEE)', { locale: ja }),
          availability: ['○', '△', '×'][Math.floor(Math.random() * 3)] as AvailabilityStatus
        });
      }
      return dates;
    };

    setAvailableDates(generateWeekDates());
  }, []);

  const getAvailabilityColor = (availability: AvailabilityStatus) => {
    switch (availability) {
      case '○': return 'text-green-600';
      case '△': return 'text-yellow-600';
      case '×': return 'text-red-600';
      default: return '';
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const selectedDateInfo = availableDates.find(d => d.date.toDateString() === date.toDateString());
      if (selectedDateInfo && selectedDateInfo.availability !== '×') {
        onSelect(date);
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">日付</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border mb-4"
          disabled={(date) => {
            const dateInfo = availableDates.find(d => d.date.toDateString() === date.toDateString());
            return !dateInfo || dateInfo.availability === '×';
          }}
        />
        <div className="space-y-2 mb-4">
          {availableDates.map((dateInfo) => (
            <Button
              key={dateInfo.formatted}
              variant="outline"
              className="w-full justify-between"
              onClick={() => handleDateSelect(dateInfo.date)}
              disabled={dateInfo.availability === '×'}
            >
              <span>{dateInfo.formatted}</span>
              <span className={`font-bold ${getAvailabilityColor(dateInfo.availability)}`}>
                {dateInfo.availability}
              </span>
            </Button>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>戻る</Button>
          <Button 
            onClick={() => {
              const firstAvailable = availableDates.find(d => d.availability !== '×');
              if (firstAvailable) onSelect(firstAvailable.date);
            }}
            disabled={!availableDates.some(d => d.availability !== '×')}
          >
            次へ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

