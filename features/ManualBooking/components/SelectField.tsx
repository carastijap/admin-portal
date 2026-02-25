import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectField({
  label,
  placeholder,
  options,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt}
              value={opt.toLowerCase().replace(/\s+/g, "-")}
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
