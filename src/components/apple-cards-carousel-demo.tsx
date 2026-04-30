"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Agentive OS is the future of agency operations.
              </span>{" "}
              Scale your agency without scaling your headcount. Our AI agents handle the heavy lifting, from client communication to complex deliverable execution.
            </p>
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
              alt="AI Workspace"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-xl mt-8"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Context",
    title: "Your Knowledge System.",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Agents",
    title: "AI That Executes.",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Workflows",
    title: "Automated Operations.",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Control",
    title: "Your Command Center.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    content: <DummyContent />,
  },
];
