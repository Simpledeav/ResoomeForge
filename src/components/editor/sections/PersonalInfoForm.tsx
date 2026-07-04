"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.currentResume.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={personalInfo.firstName}
            onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
            placeholder="Jane"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={personalInfo.lastName}
            onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          value={personalInfo.title}
          onChange={(e) => updatePersonalInfo({ title: e.target.value })}
          placeholder="Senior Product Designer"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          placeholder="jane@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="https://janedoe.com"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/janedoe"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={personalInfo.github}
          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
          placeholder="github.com/janedoe"
        />
      </div>
    </div>
  );
}
