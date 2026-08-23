import { FeedbackForm } from "@/features/feedback/components/FeedbackForm";

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-1 text-2xl font-semibold">Kirim Feedback</h1>
      <p className="mb-6 text-sm text-slate-500">
        Masukan kamu membantu kami meningkatkan layanan Kasir Pintar.
      </p>
      <FeedbackForm />
    </div>
  );
}
