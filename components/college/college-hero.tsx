import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { College } from "@/lib/api/data/colleges";
import Link from "next/link";

function RatingPill({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm">
      <span className="font-semibold">{rating}</span>
      <span aria-hidden="true">★</span>
      <a href="#" className="text-muted-foreground hover:underline">
        ({reviewCount} Reviews)
      </a>
    </div>
  );
}

function LocationAndGallery({
  location,
}: {
  location: { city: string; state: string };
}) {
  const avatars = ["/s/1.jpg", "/s/2.jpg", "/s/3.jpg", "/s/4.jpg", "/s/5.jpg"];
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="text-muted-foreground"
        >
          <path
            fill="currentColor"
            d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5"
          />
        </svg>
        <span>
          {location.city} ({location.state})
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {avatars.map((src, i) => (
            <img
              key={i}
              src={src || "/placeholder.svg"}
              alt="Student avatar"
              className="h-8 w-8 rounded-full ring-2 ring-background"
            />
          ))}
        </div>
        <Link href="?tab=gallery#gallery" className="text-primary font-medium hover:underline">
          Gallery
        </Link>
      </div>
    </div>
  );
}

function InfoBadge({
  title,
  value,
  align = "left",
  floating = true,
}: {
  title: string;
  value: string;
  align?: "left" | "right";
  floating?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background px-4 py-3 shadow-sm",
        floating && "shadow-md",
        align === "right" ? "text-right" : "text-left"
      )}
    >
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function RightImagePanel({ college }: { college: College }) {
  return (
    <div className="relative mx-auto sm:mx-4 2xl:mx-0">
      <div className="sm:hidden w-full flex whitespace-nowrap overflow-x-auto border mb-12 scrollbar-hide scroll-smooth">
        {college.nirf_ranking.rank !==null ? (
          <div className="border-r p-2 px-4">
            <div className="text-xs text-muted-foreground">NIRF Rank</div>
            <div className="text-lg font-semibold">
          {`${college.nirf_ranking.rank == 0 ? 'N/A': `#${college.nirf_ranking.rank}`}`}
            </div>
          </div>
        ) 
        : (
          <></>
        )}
        <div className="border-r p-2 px-4">
          <div className="text-xs text-muted-foreground">Highest Package</div>
          <div className="text-lg font-semibold">
            {(Number(college.placement?.highestPackage) / 100000).toFixed(1)}{" "}
            Lacs
          </div>
        </div>
        <div className="border-r p-2 px-4">
          <div className="text-xs text-muted-foreground">
            Year of Establishment
          </div>
          <div className="text-lg font-semibold">{college.established}</div>
        </div>
        <div className="p-2 px-4">
          <div className="text-xs text-muted-foreground">Type</div>
          <div className="text-lg font-semibold">{college.type}</div>
        </div>
      </div>

      <div className="relative bg-muted overflow-hidden rounded-4xl p-2.5 ">
        <Image
          src={college.image || "/college/single.avif"}
          width={1000}
          height={1000}
          alt={`${college.name} campus building`}
          className=" object-cover  sm:h-[320px] lg:h-[390px] w-full rounded-4xl "
          priority
        />
      </div>

      <div className="hidden sm:block">
        {college.nirf_ranking.rank !== null ? (
          <div className="pointer-events-none absolute -left-6 top-6">
            <InfoBadge
              title="NIRF Rank"
              value={`${college.nirf_ranking.rank==0 ? 'N/A': `#${college.nirf_ranking.rank}`}`}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="pointer-events-none absolute -left-6 -bottom-6">
          <InfoBadge
            title="Highest Package"
            value={`${(
              Number(college.placement.highestPackage) / 100000
            ).toFixed(1)} Lacs`}
          />
        </div>
        <div className="absolute -right-4 -top-4 ">
          <InfoBadge
            title="Year of Establishment"
            value={String(college.established)}
            align="right"
          />
        </div>
        <div className="absolute -right-4 bottom-6">
          <InfoBadge title="Type" value={college.type} align="right" />
        </div>
      </div>
    </div>
  );
}


export function CollegeHero({ college }: { college: College }) {
  const currentYear = new Date().getFullYear()
  return (
    <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-start">
      {/* Left column */}
      <section className=" ">
        <div className="mb-6 flex items-center gap-3 text-muted-foreground">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-secondary">
            <Image
              src="/college/cplaceholder.svg"
              alt={`${college.name} Logo`}
              width={40}
              height={40}
              className="h-8 w-8"
            />
          </div>
          <div className="ml-auto hidden gap-4 md:flex">
            <button
              aria-label="Help"
              className="rounded-full border border-border p-2 text-muted-foreground"
            >
              <Image src="/icons/info.svg" alt="Info" width={16} height={16} />
            </button>
            <button
              aria-label="Like"
              className="rounded-full border border-border p-2 text-muted-foreground"
            >
              <Image src="/icons/love.svg" alt="Love" width={16} height={16} />
            </button>
            <button
              aria-label="Save"
              className="rounded-full border border-border p-2 text-muted-foreground"
            >
              <Image
                src="/icons/compare.svg"
                alt="Compare"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>

        <h1 className="text-balance text-xl font-bold leading-tight text-primary md:text-3xl">
          {college.name} - Admission {currentYear}, Fees, Courses, Placement, Ranking
        </h1>

        <div className="mt-6 flex flex-wrap items-start gap-4">
          <RatingPill
            rating={college.rating || 0}
            reviewCount={college.reviews || 0}
          />
          <LocationAndGallery location={college.location} />
        </div>

        <p className="mt-6 text-pretty text-sm leading-relaxed text-foreground">
          {college.short_description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            variant="secondary"
            className="rounded-xl px-5 py-6 bg-orange-500 hover:bg-orange-500/90 text-white"
          >
            Download Brochure
          </Button>
          <Button className="rounded-xl px-6 py-6">Shortlist</Button>
        </div>
      </section>

      {/* Right column */}
      <section className="relative w-full mx-auto">
        <RightImagePanel college={college} />
      </section>
    </div>
  );
}
