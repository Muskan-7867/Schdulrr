import { Suspense } from "react";
import { getUserMeetings } from "../../../actions/meetings";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import MeetingList from "./_components/meetinglist";

export const metadata = {
  title: "Your Meetings | Schedulrr",
  description: "View and manage your upcoming and past meetings.",
};

const MeetingPage = () => {
  return (
    <>
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Suspense fallback={<div>Loading Upcoming Meetings...</div>}>
            <UpcomingMeetings />
          </Suspense>
        </TabsContent>

        <TabsContent value="past">
          <Suspense fallback={<div>Loading Past Meetings...</div>}>
            <PastMeetings />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type={"Upcoming"} />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type={"past"} />;
}

export default MeetingPage;
