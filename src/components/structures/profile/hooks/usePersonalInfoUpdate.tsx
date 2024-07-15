import { useCallback, useEffect, useMemo, useState } from "react";
import { z, ZodError } from "zod";

import { api } from "@/apis";
import { useAuth } from "@/contexts/AuthContext";

type UserProfileState = {
  name?: string;
  email?: string;
  about?: string;
};

const profileUpdateSchema = z.object({
  name: z.optional(z.string().min(3, { message: "Name is too short" })),
  email: z.optional(z.string().email({ message: "Invalid email" })),
  about: z.optional(z.string()),
});

export const usePersonalInfoUpdate = () => {
  const { user } = useAuth();
  const [unsaved, setUnsaved] = useState({} as UserProfileState);
  const [isSaving, setIsSaving] = useState(false);

  const hasUnsaved = useMemo(() => {
    if (Object.keys(unsaved).length > 0) {
      const keys = Object.keys(unsaved) as (keyof UserProfileState)[];
      return keys.some(key => unsaved[key] !== (user && user[key]));
    }
    return false;
  }, [unsaved, user]);

  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  const onFieldChange = useCallback(
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUnsaved(currState => ({
          ...currState,
          [field]: e.target.value,
        }));
      },
    [setUnsaved]
  );

  useEffect(() => {
    try {
      profileUpdateSchema.parse(unsaved);
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
    setIsSaving(true);
    try {
      await api.user.updateMe(unsaved);
      setUnsaved({} as UserProfileState);
      setErrorMap({});
    } finally {
      setIsSaving(false);
    }
  }, [errorMap, unsaved, setIsSaving, setUnsaved, setErrorMap]);

  return {
    hasUnsaved,
    isSaving,
    onFieldChange,
    update,
    errorMap,
  };
};
