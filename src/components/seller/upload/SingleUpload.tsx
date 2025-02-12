"use client";

import { upload } from "@/app/api/dashboard/client-api/upload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  defaultValue?: string | string[];
  multi?: boolean;
};

export default function SingleUpload({
  name,
  multi = false,
  defaultValue = "",
}: Props) {
  const [urls, setUrls] = useState<string[]>([]);

  const [progress, setProgress] = useState(0);
  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const accessToken = document.cookie;
    if (!e.target.files) {
      return;
    }
    const images = Array.from(e.target.files);
    images.forEach(async (image) => {
      const formData = new FormData();
      formData.set("image", image);
      setProgress(0);
      const res = await upload(formData, {
        onUploadProgress: (event) =>
          setProgress(Math.round((event.loaded / (event.total || 1)) * 100)),
        headers: {
          Authorization: "bearer " + accessToken,
        },
      });
      if (multi) {
        setUrls((old) => [...old, res.data.url]);
      } else {
        setUrls([res.data.url]);
      }
    });
  };

  useEffect(() => {
    if (defaultValue) {
      const v = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      setUrls(v);
    }
  }, [defaultValue]);

  return (
    <div className="border rounded-md p-2 w-full">
      {urls.map((url, index) => (
        <input
          key={`field-${url}`}
          type="hidden"
          name={multi ? `${name}.${index}` : name}
          value={url}
        />
      ))}
      <div className="flex flex-row gap-2 flex-wrap">
        {urls.map((url) => (
          <div
            key={url}
            className={cn(
              "border flex justify-center items-center bg-contain bg-center bg-no-repeat",
              multi ? "w-20 h-20" : "w-full h-48"
            )}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
        <div className="border w-20 h-20 flex justify-center items-center relative">
          <div className="relative inline-flex">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="relative z-10 h-12 w-12"
                asChild
              >
                <label>
                  <UploadCloudIcon className="h-5 w-5" />
                  <input
                    multiple={multi}
                    type="file"
                    onChange={handleFileSelected}
                    className="hidden"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </label>
              </Button>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Progress
                value={progress}
                className="w-[70%] h-2 bg-background"
              />
              {progress > 0 && (
                <span className="absolute text-xs font-medium text-primary">
                  {progress}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
