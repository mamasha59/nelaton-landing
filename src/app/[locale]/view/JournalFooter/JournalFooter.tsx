import { formatDateTime } from "../utils";

interface JournalFooterProps {
  grantedAt: string;
}

export default function JournalFooter({ grantedAt }: JournalFooterProps) {
  return (
    <div className="border-t-2 border-gray-200 p-6 text-center text-sm text-gray-500">
      <p>Документ сгенерирован {formatDateTime(grantedAt)}</p>
      <p className="mt-2">
        Данный журнал предоставлен в режиме &quot;только для чтения&quot;
      </p>
    </div>
  );
}
