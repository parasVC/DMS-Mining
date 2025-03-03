import React from 'react'
import AddSingleUserForm from './create-student';
import BulkAddStudentForm from './bulk-add-student';

interface TableComponentProps {
    details : {
        remaining_licenses_count : number,
        total_licenses_count : number
    }
}
const StudentListHeaderAction = ({details} : TableComponentProps) => {
    return (
        <div className="flex justify-end items-center gap-2 mb-4">
            <div className="text-sm">{details.remaining_licenses_count} Licences Remain out of {details.total_licenses_count}</div>
            <AddSingleUserForm />
            <BulkAddStudentForm />
        </div>
    )
}

export default StudentListHeaderAction;