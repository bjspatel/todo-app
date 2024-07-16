import { useCallback, useEffect, useMemo, useState } from "react";
import { z, ZodError } from "zod";

import { api } from "@/apis";

type UpdatePasswordDto = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const passwordUpdateSchema = z
  .object({
    currentPassword: z.optional(z.string()),
    newPassword: z.optional(
      z
        .string()
        .min(8, { message: "Password must be atlest 8 characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
          message:
            "Password must be 8 characters long and contain at least one uppercase letter, one lowercase letter and one number",
        })
    ),
    confirmPassword: z.optional(z.string()),
  })
  .refine(
    data => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      path: ["currentPassword"],
      message: "Current password is required",
    }
  )
  .refine(
    data => {
      if (data.currentPassword && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      path: ["newPassword"],
      message: "New password is required",
    }
  )
  .refine(
    data => {
      if (data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export const usePasswordUpdate = () => {
  const [unsaved, setUnsaved] = useState({} as UpdatePasswordDto);
  const [isSaving, setIsSaving] = useState(false);

  const hasUnsaved = useMemo(() => {
    return Object.keys(unsaved).length > 0;
  }, [unsaved]);

  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  const onFieldChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUnsaved(currState => ({
        ...currState,
        [field]: e.target.value,
      }));
    };

  useEffect(() => {
    try {
      passwordUpdateSchema.parse(unsaved);
      setErrorMap({});
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach(err => {
          errorMap[err.path[0]] = err.message;
        });
        setErrorMap(errorMap);
      }
    }
  }, [unsaved, setErrorMap]);

  const update = useCallback(async () => {
    if (Object.keys(errorMap).length > 0 || Object.keys(unsaved).length === 0)
      return;
    const passwordUpdateApiRequest = {
      currentPassword: unsaved.currentPassword!,
      newPassword: unsaved.newPassword!,
    };
    setIsSaving(true);
    try {
      await api.auth.updatePassword(passwordUpdateApiRequest);
      setUnsaved({} as UpdatePasswordDto);
      setErrorMap({});
    } finally {
      setIsSaving(false);
    }
  }, [errorMap, unsaved, setUnsaved, setErrorMap]);

  return {
    hasUnsaved,
    isSaving,
    onFieldChange,
    update,
    unsaved,
    errorMap,
  };
};
