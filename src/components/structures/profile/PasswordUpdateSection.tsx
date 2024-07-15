import { Loader2 } from "lucide-react";

import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { useToast } from "@shadcn/use-toast";

import { usePasswordUpdate } from "./hooks/usePasswordUpdate";

const ChangePasswordSection = () => {
  const { toast } = useToast();
  const { isSaving, hasUnsaved, onFieldChange, errorMap, update } =
    usePasswordUpdate();
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <div className="w-[48%]">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            placeholder="Enter your current password"
            type="password"
            onChange={e => onFieldChange("currentPassword")(e)}
          />
          {errorMap.currentPassword && (
            <div className="text-sm text-destructive">
              {errorMap.currentPassword}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-[48%]">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            placeholder="Enter your new password"
            type="password"
            onChange={e => onFieldChange("newPassword")(e)}
          />
          {errorMap.newPassword && (
            <div className="text-sm text-destructive">
              {errorMap.newPassword}
            </div>
          )}
        </div>
        <div className="w-[48%]">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            placeholder="Confirm your new password"
            type="password"
            onChange={e => onFieldChange("confirmPassword")(e)}
          />
          {errorMap.confirmPassword && (
            <div className="text-sm text-destructive">
              {errorMap.confirmPassword}
            </div>
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
                variant: "destructive",
                title: "Failed to update password",
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

export default ChangePasswordSection;
