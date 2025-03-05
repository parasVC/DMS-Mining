import StudentProfileDetail from "./student-profile-detail";
import { UserFieldProps } from "@/types/user-field";
import StudentSeedList from "./student-seed-list";

export default function ProfilePage({ userData }: UserFieldProps) {
    return (
        <div className="py-6 px-2 min-h-screen flex justify-center">
            <div className="w-full max-w-10xl space-y-6">
                {/* Profile Card */}
                <StudentProfileDetail userData={userData} />

        {/* Reports Section */}
        <StudentSeedList userData={userData} />
      </div>
    </div>
  );
}
