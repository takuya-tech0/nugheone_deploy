import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Label } from "@/app/components/ui/label"

type GuestSelectionProps = {
  onSelect: (guests: { adults: number; children: number }) => void;
  onBack: () => void;
};

export default function GuestSelection({ onSelect, onBack }: GuestSelectionProps) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [guestType, setGuestType] = useState<'adult' | 'child'>('adult');

  const handleSubmit = () => {
    onSelect({ adults, children });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">ゲスト選択</h2>
      
      <div>
        <Label htmlFor="guest-type">ゲストタイプ</Label>
        <RadioGroup id="guest-type" value={guestType} onValueChange={(value: 'adult' | 'child') => setGuestType(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="adult" id="adult" />
            <Label htmlFor="adult">大人</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="child" id="child" />
            <Label htmlFor="child">子供</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="guest-count">ゲスト数</Label>
        <Select
          value={guestType === 'adult' ? adults.toString() : children.toString()}
          onValueChange={(value) => {
            const count = parseInt(value);
            if (guestType === 'adult') {
              setAdults(count);
            } else {
              setChildren(count);
            }
          }}
        >
          <SelectTrigger id="guest-count">
            <SelectValue placeholder="ゲスト数を選択" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>{num}人</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onBack}>戻る</Button>
        <Button onClick={handleSubmit}>確認</Button>
      </div>
    </div>
  );
}

