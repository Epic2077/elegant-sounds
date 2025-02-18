"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  Airplay,
  AudioWaveform,
  CircleEllipsis,
  DiscAlbum,
  Headphones,
  Mic,
  Podcast,
  RadioReceiver,
  RectangleEllipsis,
  Search,
  Speaker,
  Waves,
} from "lucide-react";
import { Earbuds } from "@mui/icons-material";
import Link from "next/link";

const CategoryShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: 1,
      name: "Headphone",
      icon: <Headphones />,
      description: "Explore the latest in tech",
      size: "large",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Speaker",
      icon: <Speaker />,
      description: "Capture moments in time",
      size: "large",
      image:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Earbuds",
      icon: <Earbuds />,
      description: "Capture moments in time",
      size: "medium",
      image:
        "https://images.unsplash.com/photo-1598900863662-da1c3e6dd9d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "SoundBar",
      icon: <Waves />,
      description: "Feel the rhythm",
      size: "medium",
      image:
        "https://images.unsplash.com/photo-1557376382-e96b6778ffdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c291bmRiYXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "SubWoofer",
      icon: <AudioWaveform />,
      description: "Discover new stories",
      size: "medium",
      image:
        "https://images.unsplash.com/photo-1573096272447-f58103a3fe16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3Vid29vZmVyfGVufDB8fDB8fHww",
    },
    {
      id: 6,
      name: "Microphone",
      icon: <Mic />,
      description: "Wellness matters",
      size: "medium",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWljcm9waG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 7,
      name: "TurnTable",
      icon: <DiscAlbum />,
      description: "Cinema and entertainment",
      size: "large",
      image:
        "https://images.unsplash.com/photo-1461784180009-21121b2f204c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VHVybiUyMHRhYmxlfGVufDB8fDB8fHww",
    },
    {
      id: 8,
      name: "Amplifier",
      icon: <Podcast />,
      description: "Express creativity",
      size: "medium",
      image:
        "https://images.unsplash.com/photo-1545932447-c5f8dbf04576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QW1wbGlmaWVyfGVufDB8fDB8fHww",
    },
    {
      id: 9,
      name: "DAC",
      icon: <RectangleEllipsis />,
      description: "Live your best life",
      size: "small",
      image: "/images/DAC.jpg",
    },
    {
      id: 10,
      name: "Streaming Device",
      icon: <Airplay />,
      description: "What's hot now",
      size: "small",
      image:
        "https://images.unsplash.com/photo-1604941878418-b0fbf86e3590?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3RyZWFtaW5nfGVufDB8fDB8fHww",
    },
    {
      id: 11,
      name: "Receiver",
      icon: <RadioReceiver />,
      description: "Explore the world",
      size: "large",
      image:
        "https://images.unsplash.com/photo-1516249255568-f8b6a5a52967?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVjZWl2ZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 12,
      name: "Accessories",
      icon: <CircleEllipsis />,
      description: "Discover more",
      size: "large",
      image:
        "https://images.unsplash.com/photo-1573868388390-2739872961e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  interface Category {
    id: number;
    name: string;
    icon: React.JSX.Element;
    description: string;
    size: "small" | "medium" | "large";
    image: string;
  }

  const CategoryTile = ({ category }: { category: Category }) => {
    const sizeClasses = {
      small: "col-span-1 row-span-1",
      medium: "col-span-1 row-span-2",
      large: "col-span-2 row-span-2",
    };

    return (
      <div
        className={`${
          sizeClasses[category.size]
        } relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group`}
      >
        <Link href={`/home/categories/${category.name.toLowerCase()}`}>
          <Image
            src={category.image}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110 brightness-50"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-xl font-bold">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-200">{category.description}</p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen mt-24 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Explore Categories
          </h1>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-12 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {filteredCategories.map((category) => (
            <CategoryTile key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;
