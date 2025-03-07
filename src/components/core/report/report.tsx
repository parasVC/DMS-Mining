import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ReportFieldProps } from "@/types/report-data";

interface ReportDataProps {
  reportData: ReportFieldProps;
  seed_id: string;
}

const StudentReport = ({ reportData, seed_id }: ReportDataProps) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{seed_id}</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span>Last Login</span>
          <span className="font-semibold">{reportData?.last_login}</span>
        </div>
      </div>

      {/* Profit Margin & Efficiency */}
      <div className="grid grid-cols-2 gap-6 border-b pb-4">
        <div>
          <p className="text-sm text-blue-600 font-semibold">Profit Margin</p>
          <p className="text-2xl font-semibold">
            $ {reportData?.profit_margin}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-600 font-semibold">
            Efficiency Ratio (Revenue/Cost)
          </p>
          <p className="text-2xl font-semibold">
            {reportData?.efficiency_ratio}x
          </p>
        </div>
      </div>

      {/* Sections */}
      <Section title="Production Summary">
        <Grid>
          <InfoItem label="Waste Mined" value={`${reportData?.minedWaste}T`} />
          <InfoItem
            label="Low Grade (LG) Ore Mined"
            value={`${reportData?.minedLg}T`}
          />
          <InfoItem
            label="Medium Grade (MG) Ore Mined"
            value={`${reportData?.minedMg}T`}
          />
          <InfoItem label="Total T&C Waste" value="2500T" />
          <InfoItem label="Total Ore" value={`${reportData?.totalOreGrade}T`} />
          <InfoItem
            label="Overall Grade"
            value={`${reportData?.overallGrade}%`}
          />
        </Grid>
      </Section>

      <Section title="Cost Breakdown">
        <Grid>
          <InfoItem
            label="Waste Mined"
            value={`$ ${reportData?.wasteMiningCost}`}
          />
          <InfoItem
            label="Total Ore Mining"
            value={`$ ${reportData?.totalOreMiningCost}`}
          />
          <InfoItem
            label="Total Drilling"
            value={`$ ${reportData?.totalDrillingCost}`}
          />
          <InfoItem
            label="Total Blasting"
            value={`$ ${reportData?.totalBlastingCost}`}
          />
          <InfoItem
            label="Total Load & Haul"
            value={`$ ${reportData?.totalLoadHaulCost}`}
          />
          <InfoItem
            label="Cost Per Ton"
            value={`$ ${reportData?.costPerTon}`}
          />
          <InfoItem
            label="Tons Per Day"
            value={`${reportData?.dailyTonsMined}T`}
          />
          <InfoItem label="Stripping Ration" value="2.5" />
        </Grid>
      </Section>

      <Section title="Exploration Details">
        <Grid>
          <InfoItem
            label="Exploration Drilling Length"
            value={`${reportData?.totalDrillingLengthMeters}m`}
          />
          <InfoItem
            label="Exploration Cost"
            value={`$ ${reportData?.explorationCost}`}
          />
        </Grid>
      </Section>

      <Section title="Financial Summary">
        <Grid>
          <InfoItem label="Total Cost" value={`$ ${reportData?.totalCost}`} />
          <InfoItem
            label="Total Revenue"
            value={`$ ${reportData?.totalRevenue}`}
          />
          <InfoItem
            label="Operational Budget"
            value={`$ ${reportData?.operatingBudget}`}
          />
        </Grid>
      </Section>
    </div>
  );
};

export default StudentReport;

// Section Wrapper
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
    {children}
  </div>
);

// Grid Layout
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">{children}</div>
);

// Info Item
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Card className="shadow-none border-none border-bottom p-2">
    <CardContent className="p-0">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </CardContent>
  </Card>
);
