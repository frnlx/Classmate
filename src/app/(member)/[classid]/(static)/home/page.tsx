import { Box } from "@/components/classroom/dashboard/Box";
import ControlButton from "@/components/classroom/dashboard/ControlButton";
import { CourseAbout } from "@/components/classroom/dashboard/CourseAbout";
import { PeopleList } from "@/components/classroom/dashboard/PeopleList";
import { PageProps } from "@/types/next";

export default async function ClassHomePage({
  params,
  searchParams,
}: PageProps) {
  const classId = params!.classid as string;

  return (
    <div className="w-full p-16 overflow-y-auto">
      <ControlButton classId={classId} />
      <div className="container max-w-3xl mx-auto flex flex-col space-y-2">
        <CourseAbout classId={classId} />

        <div className="flex flex-row space-x-4">
          {/* <Box title="Assignments" className="basis-1/2" /> */}
          <Box title="People" className="w-full">
            <PeopleList classId={classId} />
          </Box>
        </div>
      </div>
    </div>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
