"use client";

import React, { useState } from "react";
import { FileSpreadsheet, HardDriveDownload, HardDriveUpload, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Popup from "@/components/core/popup";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
export default function BulkAddStudentForm() {
    const [isOpen, setIsOpen] = useState(false);

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    return (

        <Popup
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<Button className="p-1" variant={"outline"} onClick={() => setIsOpen(true)}><HardDriveUpload /><span className="text-sm">Bulk Upload</span></Button>}
            title="Add New Student"
        >
            <div className="max-w-md m-auto space-y-4">
                {/* Upload Area */}
                <Card className="border-dashed border-2 flex flex-col gap-7 border-gray-300 gap-3 rounded-lg p-10 text-center">
                    <Upload className="mx-auto text-gray-500" size={40} />
                    <p className="text-sm mt-2">
                        Drag file here or{" "}
                        <Label htmlFor="file-upload" className="text-blue-500 cursor-pointer">
                            select
                        </Label>{" "}
                        from device
                    </p>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".xls"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </Card>
                <p className="text-xs text-gray-500 mt-2">Supported file format: .xls | Max size: 5MB</p>

                {/* Selected File Info */}
                {file && (
                    <p className="text-sm text-center text-green-600">
                        ✅ {file.name} selected
                    </p>
                )}

                {/* Template Download */}
                <Card className="p-4 rounded shadow-sm gap-3 flex bg-zinc-50">
                    <div className="flex flex-col gap-2">
                        <div className="text-sm flex gap-2">
                            <FileSpreadsheet className="text-green-600" size={24} />
                            <p className="font-medium">Template File</p>
                        </div>
                        <p className="text-xs text-gray-500">You can download  the attached example and use them as a starting point of your own file.</p>

                    </div>
                    <Button className="p-2 m-auto" variant={"outline"}><HardDriveDownload /><span className="text-sm">Download</span></Button>
                </Card>
            </div>

        </Popup>
    );
}
