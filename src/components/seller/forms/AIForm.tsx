import SingleUpload from "@/components/dashboard/upload/single-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FormField = {
  type: "string" | "number" | "image" | "email" | "textarea" | "color";
  name: string;
  placeholder?: string;
  label?: string;
  defaultValue?: unknown;
  error?: boolean;
  helperText?: ReactNode;
  size?: number;
};

type AIFormProps = {
  schema: FormField[];
  bg?: string;
};

export default function AIForm({ schema, bg }: AIFormProps) {
  return (
    <div className="flex flex-col gap-4">
      {schema.map((item) => (
        <div
          key={item.name}
          className={cn(
            "w-full",
            item.size ? `basis-[${item.size}%]` : "basis-full"
          )}
        >
          {item.type === "image" ? (
            <SingleUpload
              name={item.name}
              defaultValue={item.defaultValue as string}
            />
          ) : (
            <div className="grid w-full gap-1.5">
              {item.label && <Label htmlFor={item.name}>{item.label}</Label>}

              {item.type === "textarea" ? (
                <Textarea
                  id={item.name}
                  name={item.name}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue as string}
                  className={cn(bg, "rounded-md")}
                  rows={5}
                />
              ) : item.type === "color" ? (
                <Input
                  type="color"
                  id={item.name}
                  name={item.name}
                  className={cn(bg, "rounded-md h-12 w-full")}
                  defaultValue={item.defaultValue as string}
                />
              ) : item.type === "number" ? (
                <Input
                  type="number"
                  id={item.name}
                  name={item.name}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue as string}
                  className={cn(bg, "rounded-md")}
                  min={0}
                  step={1}
                />
              ) : (
                <Input
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue as string}
                  className={cn(bg, "rounded-md")}
                />
              )}

              {item.helperText && (
                <p
                  className={cn(
                    "text-sm",
                    item.error ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {item.helperText}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
