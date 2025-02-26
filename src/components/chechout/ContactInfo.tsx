"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { updateProfileAction } from "@/app/api/auth/updateUser/action/updateAction";
import { useCityQuery } from "@/app/api/auth/updateUser/client-api/city";

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
  street: z.string().optional(),
  postalCode: z.string().optional(),
  location: z.string().optional(),
});

export function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      birthday: new Date(),
      mobile: "",
      nationCode: "",
      city: "",
      street: "",
      postalCode: "",
      location: "",
    },
  });

  // Use useState to manage the state for the server action
  const [state, setState] = useState({ message: "", success: false });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Parse the location string into an array of numbers
      let locationArray: number[] = [];
      if (data.location) {
        const [latStr, lonStr] = data.location.split(",").map((s) => s.trim());
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);
        if (isNaN(lat) || isNaN(lon)) {
          toast({
            title: "Error",
            description:
              "Invalid location format. Use 'lat, lon' (e.g., '34.0522, -118.2437')",
            variant: "destructive",
          });
          return;
        }
        locationArray = [lat, lon];
      }

      // Transform the form data into the required format
      const profileData = {
        nationCode: data.nationCode,
        mobile: data.mobile,
        birthday: data.birthday.toISOString(),
        addressList: [
          {
            location: locationArray,
            city: data.city,
            street: data.street || "",
            postalCode: data.postalCode || "",
          },
        ],
      };

      // Call the server action directly with profileData
      const response = await updateProfileAction(state, profileData);

      if (response?.success) {
        toast({
          title: "Profile Updated",
          description:
            "Your contact information has been successfully updated.",
        });
        setState({
          message: response.message || "",
          success: true,
        });
      } else {
        toast({
          title: "Error",
          description:
            response?.message || "Failed to update profile. Please try again.",
          variant: "destructive",
        });
        setState({
          message: response?.message || "Failed to update profile",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const { data = { results: [] }, isLoading } = useCityQuery();
  const cities = Array.isArray(data.results) ? data.results : [];

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <h2 className="text-2xl text-primary">Contact Information</h2>
            <div className="flex flex-row gap-4">
              <FormField
                control={form.control}
                name="nationCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Nation Code</FormLabel>
                    <FormControl>
                      <Input placeholder="US" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 123-456-7890" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) => {
                        field.onChange(new Date(e.target.value));
                      }}
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="w-full h-[2px] bg-muted my-2"></div>
            <h2 className="text-primary text-2xl">Shipping Address</h2>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="34.0522, -118.2437" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full h-[2px] bg-muted my-2"></div>
            <h2 className="text-primary text-2xl">Shipping Address</h2>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="34.0522, -118.2437" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border rounded bg-card"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="">Select a city</option>
                      {isLoading ? (
                        <option disabled>Loading...</option>
                      ) : (
                        cities.map((city: any) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))
                      )}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 Main St" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4">
              Save Contact Information
            </Button>
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
