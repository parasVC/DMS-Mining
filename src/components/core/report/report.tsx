import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import React from 'react'


const StudentReport = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">45</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} />
          <span>Last Login</span>
          <span className="font-semibold">2025-02-05</span>
        </div>
      </div>

      {/* Profit Margin & Efficiency */}
      <div className="grid grid-cols-2 gap-6 border-b pb-4">
        <div>
          <p className="text-sm text-blue-600 font-semibold">Profit Margin</p>
          <p className="text-2xl font-semibold">$ 5,02,580</p>
        </div>
        <div>
          <p className="text-sm text-blue-600 font-semibold">
            Efficiency Ratio (Revenue/Cost)
          </p>
          <p className="text-2xl font-semibold">2.13x</p>
        </div>
      </div>

      {/* Sections */}
      <Section title="Production Summary">
        <Grid>
          <InfoItem label="Waste Mined" value="2,000T" />
          <InfoItem label="Low Grade (LG) Ore Mined" value="500T" />
          <InfoItem label="Medium Grade (MG) Ore Mined" value="300T" />
          <InfoItem label="Total T&C Waste" value="2,500T" />
          <InfoItem label="Total Ore" value="1,500T" />
          <InfoItem label="Overall Grade" value="2.50%" />
        </Grid>
      </Section>

      <Section title="Cost Breakdown">
        <Grid>
          <InfoItem label="Waste Mined" value="$ 75,000" />
          <InfoItem label="Total Ore Mining" value="$ 1,50,000" />
          <InfoItem label="Total Drilling" value="$ 50,000" />
          <InfoItem label="Total Blasting" value="$ 25,000" />
          <InfoItem label="Total Load & Haul" value="$ 100,000" />
          <InfoItem label="Cost Per Ton" value="$ 150" />
          <InfoItem label="Tons Per Day" value="500T" />
          <InfoItem label="Stripping Ration" value="2.5" />
        </Grid>
      </Section>

      <Section title="Exploration Details">
        <Grid>
          <InfoItem label="Exploration Drilling Length" value="300m" />
          <InfoItem label="Exploration Cost" value="$ 45,000" />
        </Grid>
      </Section>

      <Section title="Financial Summary">
        <Grid>
          <InfoItem label="Total Cost" value="$ 445,000" />
          <InfoItem label="Total Revenue" value="$ 9,50,000" />
          <InfoItem label="Operational Budget" value="$ 9,505,000" />
        </Grid>
      </Section>
    </div>
  )
}

export default StudentReport

// Section Wrapper
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
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