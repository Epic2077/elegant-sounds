"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import SubmitButton from "../seller/SubmitButton";
import { useCityQuery } from "@/app/api/auth/updateUser/client-api/city";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const FormSchema = z.object({
  birthday: z.date({
    required_error: "A date of birth is required.",
  }),
  mobile: z.string({
    required_error: "A phone number is required.",
  }),
  nationCode: z.string({
    required_error: "A nation code is required.",
  }),
  city: z.string({
    required_error: "A city is required.",
  }),
});

export function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-muted p-4">
          <code className="text-foreground">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  const { data = { results: [] }, isLoading } = useCityQuery();
  const cities: { id: string; name: string }[] = data.results;

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form className="flex flex-col gap-6">
            <h2 className="text-2xl text-primary">Contact Information</h2>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="nationCode">Nation Code</label>
                <Input name="nationCode" placeholder="US" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mobile">Phone Number</label>
                <Input name="mobile" placeholder="+15 123-456-7890" required />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center mt-2">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-2 text-center">
                      Date of Birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full h-[2px] bg-muted my-6"></div>
            <h2 className="text-primary text-2xl ">Shipping Address</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">Location Code</label>
              <Input name="location" placeholder="34.0522, -118.2437" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">City</label>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {field.value || "Select a city"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {isLoading ? (
                        <DropdownMenuItem>Loading...</DropdownMenuItem>
                      ) : (
                        cities?.map((city) => (
                          <DropdownMenuItem
                            key={city.id}
                            onSelect={() => field.onChange(city)}
                          >
                            {city.name}
                          </DropdownMenuItem>
                        ))
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">Street</label>
              <Input name="location" placeholder="Street" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location">PostalCode</label>
              <Input name="location" placeholder="Postal Code" />
            </div>
            <SubmitButton
              className="w-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Save
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const ContactInfo = () => {
  return <DatePickerForm />;
};

export default ContactInfo;
