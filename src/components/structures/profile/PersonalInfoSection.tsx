import { Loader2 } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { useToast } from "@shadcn/use-toast";

import { usePersonalInfoUpdate } from "./hooks/usePersonalInfoUpdate";

const PersonalInfoSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { hasUnsaved, isSaving, onFieldChange, update, errorMap } =
    usePersonalInfoUpdate();
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      <div className="w-full flex justify-between gap-6">
        <div className="w-[48%]">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            defaultValue={user?.name}
            onChange={e => onFieldChange("name")(e)}
          />
          {errorMap.name && (
            <div className="text-sm text-destructive">{errorMap.name}</div>
          )}
        </div>
        <div className="w-[48%]">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            defaultValue={user?.email}
            onChange={e => onFieldChange("email")(e)}
          />
          {errorMap.email && (
            <div className="text-sm text-destructive">{errorMap.email}</div>
          )}
        </div>
      </div>
      <div className="w-full">
        <div>
          <Label htmlFor="phone">About me</Label>
          <TextareaAutosize
            id="about"
            placeholder="Tell us about yourself"
            defaultValue={user?.about}
            className="w-full p-2 border rounded"
            rows={3}
            maxRows={6}
            onChange={e => onFieldChange("about")(e)}
          />
          {errorMap.about && (
            <div className="text-sm text-destructive">{errorMap.about}</div>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          onClick={async () => {
            try {
              await update();
            } catch (error) {
              toast({
                title: "Failed to update profile",
                variant: "destructive",
              });
            }
          }}
          disabled={!hasUnsaved}
        >
          {isSaving ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
