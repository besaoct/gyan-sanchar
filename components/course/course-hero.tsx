import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CourseDetails } from "@/lib/api/data/courses";
import { ApplyNowForm } from "../common/apply-now-form";
import { useEffect, useState } from "react";
import { CommonFormType } from "@/lib/types";
import { BASE_URL } from "@/lib/api/config/urls";

interface CourseHeroProps {
  course: CourseDetails;
  applyNowData: CommonFormType | null;
  syllabusData: CommonFormType | null
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

function RightImagePanel({ course }: { course: CourseDetails }) {
  return (
    <div className="relative mx-auto sm:mx-4 2xl:mx-0">
      <div className="sm:hidden w-full flex whitespace-nowrap overflow-x-auto border mb-12 scrollbar-hide scroll-smooth">
        <div className="border-r p-2 px-4">
          <div className="text-xs text-muted-foreground">Duration</div>
          <div className="text-lg font-semibold">
            {course.basic_info.duration}
          </div>
        </div>
        <div className="border-r p-2 px-4">
          <div className="text-xs text-muted-foreground">Average Salary</div>
          <div className="text-lg font-semibold">{course.avg_salary}</div>
        </div>
        <div className="border-r p-2 px-4">
          <div className="text-xs text-muted-foreground">Level</div>
          <div className="text-lg font-semibold">{course.basic_info.level}</div>
        </div>
        <div className="p-2 px-4">
          <div className="text-xs text-muted-foreground">Type</div>
          <div className="text-lg font-semibold">{course.course_type}</div>
        </div>
      </div>

      <div className="relative bg-muted overflow-hidden rounded-4xl p-2.5 min-w-full h-full  lg:min-w-[512px] lg:max-w-[512px] xl:min-w-[640px] xl:max-w-[640px] aspect-video">
        <Image
          src={course.hero_image?.replace("/storage", "")}
          fill
          alt={`${course.course_name} cover image`}
          className="w-auto rounded-4xl "
          priority
        />
      </div>

      <div className="hidden sm:block">
        <div className="pointer-events-none absolute -left-6 top-6">
          <InfoBadge
            title="Duration"
            value={`${course.basic_info.duration} Years`}
          />
        </div>
        <div className="pointer-events-none absolute -left-6 -bottom-6">
          <InfoBadge title="Average Salary" value={course.avg_salary} />
        </div>
        <div className="absolute -right-4 top-4 ">
          <InfoBadge
            title="Level"
            value={course.basic_info.level}
            align="right"
          />
        </div>
        <div className="absolute -right-4 bottom-6">
          <InfoBadge title="Type" value={course.course_type} align="right" />
        </div>
      </div>
    </div>
  );
}

export function CourseHero({ course, applyNowData, syllabusData }: CourseHeroProps) {

  // const [applyNowData, setApplyNowData] = useState<CommonFormType | null>(null);
  // const [syllabusData, setSyllabusData] = useState<CommonFormType | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchTypes = async () => {
  //     try {
  //       setLoading(true);

  //       const typesResponse = await fetch(`${BASE_URL}/api/v1/types`);
  //       const typesResult = await typesResponse.json();
  //       if (typesResult.success && typesResult.data) {
  //         const applyNow = typesResult.data.find(
  //           (t: CommonFormType) => t.slug === "apply-now"
  //         );
  //         const syllabus = typesResult.data.find(
  //           (t: CommonFormType) => t.slug === "syllabus"
  //         );
  //         if (syllabus) setSyllabusData(syllabus);
  //         if (applyNow) setApplyNowData(applyNow);
  //       }
  //     } catch (err) {
  //       setError("An unexpected error occurred.");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTypes();
  // }, []);

  return (
    <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-start">
      {/* Left column */}
      <section className=" ">
        <div className="mb-6 flex items-center gap-3 text-muted-foreground">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-secondary">
            <Image
              src="/icons/course-p.png"
              alt={`${course.course_name} Logo`}
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
          {course.course_name}
        </h1>

        <p className="mt-6 text-pretty text-sm leading-relaxed text-foreground">
          {course.short_description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <ApplyNowForm
            syllabus_document={course.syllabus_document}
            syllabus_link={course.syllabus_link}
            formType="syllabus"
            course_ids={[Number(course.id)]}
            college_ids={course.colleges.map((c) => Number(c.id))}
            formTitle="Get Syllabus"
            stream={course.basic_info.stream.title}
            title={syllabusData?.description_title || "Syllabus"}
            description={
              <ul className="space-y-4 text-white/90">
                {syllabusData?.description_keypoints.map((point, index) =>
                  point ? <li key={index}>{point}</li> : null
                )}
              </ul>
            }
            trigger={
              <Button
                variant="secondary"
                className="rounded-xl px-5 py-6 bg-orange-500 hover:bg-orange-500/90 text-white"
              >
                Download Syllabus
              </Button>
            }
          />

          <ApplyNowForm
            formType="apply-now"
            college_ids={course.colleges.map((c) => Number(c.id))}
            course_ids={[Number(course.id)]}
            formTitle="Why register with us?"
            stream={course.basic_info.stream.title}
            title={applyNowData?.description_title || "Apply Now"}
            description={
              <ul className="space-y-4 text-white/90">
                {applyNowData?.description_keypoints.map((point, index) =>
                  point ? <li key={index}>{point}</li> : null
                )}
              </ul>
            }
            trigger={
                <Button className="rounded-xl px-6 py-6">Shortlist</Button>
            }
          />


          {/* <Button className="rounded-xl px-6 py-6">Shortlist</Button> */}
        </div>
      </section>

      {/* Right column */}
      <section className="relative w-full mx-auto">
        <RightImagePanel course={course} />
      </section>
    </div>
  );
}
