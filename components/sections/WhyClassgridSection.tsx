"use client";

import React from "react";
import { Reveal } from "@/components/sections/Reveal";
import { IconRenderer } from "@/components/ui/icon-renderer";

interface WhyClassgridCard {
  title?: string;
  description?: string;
  icon?: string;
}

interface WhyClassgridSectionProps {
  title?: string;
  description?: string;
  cards?: WhyClassgridCard[];
}

export function WhyClassgridSection({
  title = "Why ClassGrid?",
  description,
  cards = [],
}: WhyClassgridSectionProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-16 md:py-24">
      <Reveal>
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-neutral-50 to-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/[0.05] dark:from-neutral-900 dark:to-neutral-950 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 dark:bg-foreground/10">
                  <IconRenderer
                    iconName={card.icon || "Shield"}
                    className="h-7 w-7 text-foreground"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
