
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CourseDetails } from "@/lib/api/data/courses";

interface CourseHeroProps {
  course: CourseDetails;
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
          <div className="text-lg font-semibold">{course.basic_info.duration}</div>
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

      <div className="relative bg-muted lg:min-w-xl overflow-hidden rounded-4xl p-2.5 rounded-bl-[202px]">
        <Image
          src={course.hero_image?.replace("/storage",
            ""
          )}
          width={1000}
          height={1000}
          alt={`${course.course_name} cover image`}
          className=" object-cover sm:h-[320px] lg:h-[390px] w-full rounded-4xl rounded-bl-[202px]"
          priority
        />
      </div>

      <div className="hidden sm:block">
        <div className="pointer-events-none absolute -left-6 top-6">
          <InfoBadge title="Duration" value={`${course.basic_info.duration} Years`} />
        </div>
        <div className="pointer-events-none absolute left-6 bottom-6">
          <InfoBadge title="Average Salary" value={course.avg_salary} />
        </div>
        <div className="absolute -right-4 top-4 ">
          <InfoBadge title="Level" value={course.basic_info.level} align="right" />
        </div>
        <div className="absolute -right-4 bottom-6">
          <InfoBadge title="Type" value={course.course_type} align="right" />
        </div>
      </div>
    </div>
  );
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
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
            <button aria-label="Help" className="rounded-full border border-border p-2 text-muted-foreground">
              <Image src="/icons/info.svg" alt="Info" width={16} height={16} />
            </button>
            <button aria-label="Like" className="rounded-full border border-border p-2 text-muted-foreground">
              <Image src="/icons/love.svg" alt="Love" width={16} height={16} />
            </button>
            <button aria-label="Save" className="rounded-full border border-border p-2 text-muted-foreground">
              <Image src="/icons/compare.svg" alt="Compare" width={16} height={16} />
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
          <Button variant="secondary" className="rounded-xl px-5 py-6 bg-orange-500 hover:bg-orange-500/90 text-white">
            Download Syllabus
          </Button>
          <Button className="rounded-xl px-6 py-6">Shortlist</Button>
        </div>
      </section>

      {/* Right column */}
      <section className="relative w-full mx-auto">
        <RightImagePanel course={course} />
      </section>
    </div>
  );
}
