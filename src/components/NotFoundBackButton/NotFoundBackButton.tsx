"use client";

import { useRouter } from "@/i18n/navigation";

type NotFoundBackButtonProps = {
  className?: string;
  label: string;
};

export const NotFoundBackButton = ({
  className,
  label,
}: NotFoundBackButtonProps) => {
  const router = useRouter();

  return (
    <button className={className} type="button" onClick={() => router.back()}>
      {label}
    </button>
  );
};
