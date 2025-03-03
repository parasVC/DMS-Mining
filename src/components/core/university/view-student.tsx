import StudentProfileDetail from "./student-profile-detail";
import { UserFieldProps } from "@/types/user-field";
import StudentSeedList from "./student-seed-list";



export default function ProfilePage({ userData }: UserFieldProps) {
    return (
        <div className="p-6  min-h-screen flex justify-center">
            <div className="w-full max-w-6xl space-y-6">
                {/* Profile Card */}
                <StudentProfileDetail userData={userData} />

                {/* Reports Section */}
                <StudentSeedList userData={userData} />
            </div>
        </div>
    );
}
