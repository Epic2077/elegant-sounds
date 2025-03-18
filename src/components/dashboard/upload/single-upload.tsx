"use client";
import { Box, CircularProgress, IconButton, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { upload } from "@/app/api/dashboard/client-api/upload";
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
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        width: "100%",
        display: "block",
      }}
    >
      {urls.map((url, index) => (
        <input
          key={"field" + url}
          type="hidden"
          name={multi ? `${name}.${index}` : name}
          defaultValue={url}
        />
      ))}
      <Stack gap={1} direction="row" flexWrap={"wrap"}>
        {urls.map((url) => (
          <Box
            key={url}
            sx={{
              width: multi ? 80 : "100%",
              height: multi ? 80 : 200,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url(${url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        ))}
        <Box
          sx={{
            minHeight: 80,
            width: 80,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                size="large"
                component="label"
                color="primary"
                tabIndex={-1}
                sx={{
                  zIndex: 10,
                }}
              >
                <CloudUploadIcon />
                <input
                  multiple={multi}
                  type="file"
                  onChange={handleFileSelected}
                  hidden
                  accept="image/png, image/gif, image/jpeg"
                />
              </IconButton>
            </Box>
            <CircularProgress
              size={40}
              value={progress}
              variant="determinate"
            />
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
