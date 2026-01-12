"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Heart,
  Share2,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CollegeImageCarousel } from "./college-image-carousel";
import { College } from "@/lib/api/data/colleges";
import { useRouter } from "next/navigation";
import { ApplyNowForm } from "@/components/common/apply-now-form";
import { BASE_URL } from "@/lib/api/config/urls";
interface typeType {
  id: number;
  name: string;
  slug: string;
  description_title: string;
  description_keypoints: (string | null)[];
}

function formatFees(min: number, max: number) {
  const fmt = (n: number) =>
    n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`;
  return `₹${fmt(min)} - ${fmt(max)}`;
}

const parsePackage = (pkg: string | null) => {
  if (!pkg) return 0;
  const value = parseFloat(pkg.replace(/[^0-9.]/g, ""));
  if (pkg.toLowerCase().includes("lakh") || pkg.toLowerCase().includes("lpa")) {
    return value * 100000;
  }
  return value;
};

export function CollegeCard({
  college,
  className,
}: {
  college: College;
  className?: string;
}) {
  const [descOpen, setDescOpen] = useState(false);
  const router = useRouter();

  // Prevent card navigation when clicking inner actions
  const stopCardNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const collegeId = college.slug || college.id;
  const averagePackage = parsePackage(college.placement.averagePackage);
 
  const [applyNowData, setApplyNowData] = useState<typeType | null>(null);
  const [brochureData, setBrochureData] = useState<typeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);

        const typesResponse = await fetch(`${BASE_URL}/api/v1/types`);
        const typesResult = await typesResponse.json();
        if (typesResult.success && typesResult.data) {
          const applyNow = typesResult.data.find(
            (t: typeType) => t.slug === "apply-now"
          );
          const brochure = typesResult.data.find(
            (t: typeType) => t.slug === "brochure"
          );
          if (brochure) setBrochureData(brochure);
          if (applyNow) setApplyNowData(applyNow);
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return (
    <Card
      className={cn(
        "w-full bg-card py-3 gap-2 cursor-pointer",
        "hover:shadow-sm shadow-xs transition-shadow duration-300",
        className
      )}
      onClick={() => router.push(`/college/${collegeId}`)}
    >
      <div className="px-4 py-2">
        <div className="flex items-start justify-between gap-1">
          <Link
            href={`/college/${collegeId}`}
            className={cn("block", className)}
            onClick={stopCardNavigation}
          >
            <h3
              title={college.verifyCollege === true ? "Verified" : college.name}
              className="text-balance hover:text-primary text-base font-bold text-foreground md:text-lg"
            >
              {college.name}
              {college.verifyCollege === true && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="">
                      <span className="inline ">
                        <Image
                          title="Verified"
                          src={"/verify-badge.png"}
                          width={100}
                          height={100}
                          alt={""}
                          className="size-4 sm:size-5 inline ml-1 "
                        />
                        <Image
                          title="Verified"
                          src={"/logo-b.png"}
                          width={100}
                          height={100}
                          alt={""}
                          className="size-10 inline ml-1 bg-blend-lighten "
                        />
                        {/* <Info className="h-4 w-4 text-gray-500 ml-1" />  */}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      This college is verified by gyansanchar
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </h3>
          </Link>

          <div className="flex items-center gap-1">
            <Button
              onClick={stopCardNavigation}
              variant="secondary"
              size="icon"
              className="h-7 w-7 p-0"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              onClick={stopCardNavigation}
              variant="secondary"
              size="icon"
              className="h-7 w-7 p-0"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full items-stretch gap-4 pr-3 md:pr-4 lg:pr-5 pb-2 flex-row">
        <div className="w-28 self-start mb-2 md:mb-0 md:w-48 md:flex-shrink-0 mx-5">
          <Dialog>
            <DialogTrigger asChild>
              <div
                onClick={stopCardNavigation}
                className="relative h-20 w-full overflow-hidden rounded-lg sm:h-24 md:h-28 md:w-48 cursor-pointer"
              >
                <Image
                  src={
                    college.image ||
                    "https://media.collegedekho.com/media/img/institute/crawled_images/c2.jpg?w=350&h=350"
                  }
                  alt={`${college.name} campus image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 192px, 192px"
                />
              </div>
            </DialogTrigger>
            <DialogContent
              className="max-w-5xl w-[80%]"
              onClick={stopCardNavigation}
            >
              <CollegeImageCarousel
                onClick={stopCardNavigation}
                images={college.gallery}
                collegeName={college.name}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <TooltipProvider>
            {/* Row 1 */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {college.nirf_ranking?.rank ? (
                <Badge
                  variant="outline"
                  className="text-xs text-white md:text-xs bg-green-600"
                >
                  NIRF #{college.nirf_ranking?.rank}
                </Badge>
              ) : (
                ""
              )}

              <Badge variant="outline" className="text-xs md:text-xs">
                {college.type}
              </Badge>

              {college.streams ? (
                <Badge variant="secondary" className="text-xs md:text-xs">
                  {college.streams[0].title}
                </Badge>
              ) : (
                <></>
              )}

              {college.streams && college.streams.length > 1 ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={stopCardNavigation}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80"
                    >
                      +{college.streams.length - 1}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    {college.streams
                      .slice(1)
                      .map((stream) => stream.title)
                      .join(", ")}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <></>
              )}

              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-orange-300" />
                <span className="font-semibold">
                  {college.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({college.reviews} reviews)
                </span>
              </span>

              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {college.location.city}, {college.location.state}
              </span>
            </div>

            {/* Row 2 */}
            <div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground md:text-sm">
              {/* Fees */}
              <span className="flex items-center gap-2">
                <span className="font-semibold">Fees:</span>
                <span>
                  {formatFees(
                    Number(college.fees.min),
                    Number(college.fees.max)
                  )}
                </span>
                <Link
                  href={`/college/${collegeId}?tab=fees`}
                  className="text-primary hover:underline"
                  onClick={stopCardNavigation}
                >
                  Fee details
                </Link>
              </span>

              {/* Avg Package */}
              <span className="flex items-center gap-2">
                <span className="font-semibold">Avg:</span>
                <span>₹{(averagePackage / 100000).toFixed(1)}L</span>
              </span>

              {/* Exams */}
              {college.admissionProcess?.exams &&
                college.admissionProcess.exams.length > 0 && (
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">Exams:</span>
                    <span>{college.admissionProcess.exams[0]}</span>

                    {college.admissionProcess.exams.length > 1 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={stopCardNavigation}
                            className="inline-flex gap-0 px-1 py-1 items-center text-primary font-semibold text-sm"
                          >
                            ... <Plus className="size-2.5" />
                            {college.admissionProcess.exams.length - 1}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-xs">
                          {college.admissionProcess.exams.slice(1).join(", ")}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </span>
                )}

              {college.placement.placementRate && (
                <span className="flex items-center gap-2">
                  <span className="font-semibold">Placement:</span>
                  <span>
                    {parseFloat(college.placement.placementRate).toFixed(0)}%
                  </span>
                </span>
              )}
            </div>
          </TooltipProvider>

          {/* Description */}
          <div className="hidden sm:flex items-start gap-2">
            <div
              className={cn(
                "text-pretty text-xs text-muted-foreground md:text-sm",
                descOpen ? "" : "line-clamp-1"
              )}
            >
              {college.short_description || "No description available."}
            </div>
            <button
              onClick={(e) => {
                stopCardNavigation(e);
                setDescOpen((v) => !v);
              }}
              className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-primary/80 text-white"
            >
              {descOpen ? (
                <ChevronUp className="h-4" />
              ) : (
                <ChevronDown className="h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile description + fees */}
      <div className="px-4" onClick={stopCardNavigation}>
        <div className="sm:hidden flex items-start gap-2 pb-2">
          <div
            className={cn(
              "text-pretty text-xs text-muted-foreground md:text-sm",
              descOpen ? "" : "line-clamp-1"
            )}
          >
            {college.short_description || "No description available."}
          </div>

          <button
            onClick={() => setDescOpen((v) => !v)}
            className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border bg-primary/80 text-white"
          >
            {descOpen ? (
              <ChevronUp className="h-2" />
            ) : (
              <ChevronDown className="h-2" />
            )}
          </button>
        </div>

        {/* Mobile fees block */}
        <div className="flex sm:hidden flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:text-sm">
          <span className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Fees:</span>
            <span className="text-foreground">
              {formatFees(Number(college.fees.min), Number(college.fees.max))}
            </span>
            <Link
              href={`/college/${collegeId}#fees`}
              className="text-primary hover:underline"
              onClick={stopCardNavigation}
            >
              Fee details
            </Link>
          </span>

          <span className="flex items-center gap-2">
            <span className="font-semibold">Avg:</span>
            <span>₹{(averagePackage / 100000).toFixed(1)}L</span>
          </span>

          {college.admissionProcess?.exams &&
            college.admissionProcess.exams.length > 0 && (
              <span className="flex items-center gap-2">
                <span className="font-semibold">Exams:</span>
                <span>{college.admissionProcess.exams[0]}</span>

                {college.admissionProcess.exams.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={stopCardNavigation}
                        className="inline-flex gap-0 px-1 py-1 items-center text-primary font-semibold text-sm"
                      >
                        ... <Plus className="size-2.5" />
                        {college.admissionProcess.exams.length - 1}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      {college.admissionProcess.exams.slice(1).join(", ")}
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>
            )}

          {college.placement.placementRate && (
            <span className="flex items-center gap-2">
              <span className="font-semibold">Placement:</span>
              <span>
                {parseFloat(college.placement.placementRate).toFixed(0)}%
              </span>
            </span>
          )}
        </div>
      </div>

      <hr className="md:hidden" />

      {/* Mobile quick links */}
      <div className="w-full md:hidden px-4 max-w-sm">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary font-medium">
          <Link
            href={`/college/${collegeId}?tab=facilities`}
            onClick={stopCardNavigation}
            className="hover:underline flex items-center gap-1"
          >
            <span className="size-1 bg-gray-300 rounded-full" />
            Facilities
          </Link>

          <Link
            href={`/college/${collegeId}?tab=placements`}
            onClick={stopCardNavigation}
            className="hover:underline flex items-center gap-1"
          >
            <span className="size-1 bg-gray-300 rounded-full" />
            Placements
          </Link>

          <Link
            href={`/college/${collegeId}?tab=reviews`}
            onClick={stopCardNavigation}
            className="hover:underline flex items-center gap-1"
          >
            <span className="size-1 bg-gray-300 rounded-full" />
            Reviews
          </Link>
        </nav>
      </div>

      <hr />

      {/* Desktop actions */}
      <div className="py-2 flex flex-wrap items-center justify-between gap-4 px-4">
        <nav className="hidden md:flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary font-medium">
          <Link
            href={`/college/${collegeId}?tab=facilities`}
            onClick={stopCardNavigation}
            className="hover:underline flex items-center gap-1"
          >
            <span className="size-1 bg-gray-300 rounded-full" />
            Facilities
          </Link>

          <Link
            href={`/college/${collegeId}?tab=placements`}
            onClick={stopCardNavigation}
            className="hover:underline flex items-center gap-1"
          >
            <span className="size-1 bg-gray-300 rounded-full" />
            Placements
          </Link>

          <Link
            href={`/college/${collegeId}?tab=reviews`}
            onClick={stopCardNavigation}
            className="hover:underline flex items-center gap-1"
          >
            <span className="size-1 bg-gray-300 rounded-full" />
            Reviews
          </Link>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={stopCardNavigation}
            variant="outline"
            className="text-xs md:text-sm bg-accent border border-primary text-primary hover:bg-accent/50"
          >
            Compare
          </Button>

          {/* <Button
            onClick={stopCardNavigation}
            variant="default"
            className="text-xs md:text-sm bg-orange-500 hover:bg-orange-500/90"
          >
            Brochure
          </Button> */}

          <ApplyNowForm
            formType={"brochure"}
            brochure_link={college.brochure_link || college.brochure_document}
            college_ids={[Number(college.id)]}
            formTitle="Get Brochure"
            streams={college.streams.map((stream) => stream.title)}
            title={brochureData?.description_title || "Brochure"}
            description={
              <ul className="space-y-4 text-white/90">
                {brochureData?.description_keypoints.map((point, index) =>
                  point ? <li key={index}>{point}</li> : null
                )}
              </ul>
            }
            trigger={
              <Button
                onClick={stopCardNavigation}
                variant="default"
                className="text-xs md:text-sm bg-orange-500 hover:bg-orange-500/90"
              >
                Brochure
              </Button>
            }
          />

          <ApplyNowForm
            formType={"apply-now"}
         
            college_ids={[Number(college.id)]}
            streams={college.streams.map((stream) => stream.title)}
            title={applyNowData?.description_title || "Apply Now"}
            description={
              <ul className="space-y-4 text-white/90">
                {applyNowData?.description_keypoints.map((point, index) =>
                  point ? <li key={index}>{point}</li> : null
                )}
              </ul>
            }
            trigger={
              <Button
                onClick={stopCardNavigation}
                className="text-xs md:text-sm"
              >
                Apply Now
              </Button>
            }
          />

          {/* <Button onClick={stopCardNavigation} className="text-xs md:text-sm">
            Apply Now
          </Button> */}
        </div>
      </div>
    </Card>
  );
}
