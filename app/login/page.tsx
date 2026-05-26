import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand p-4">
      <form action={login} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="mb-8">
          <div className="font-black uppercase tracking-[0.35em] text-gold">Admin Login</div>
          <h1 className="mt-3 text-4xl font-black">Hotel Dashboard</h1>
        </div>

        <div className="grid gap-4">
          <input className="rounded-2xl border p-4" name="email" type="email" placeholder="Email" required />
          <input className="rounded-2xl border p-4" name="password" type="password" placeholder="Password" required />
          <button className="rounded-full bg-ink px-6 py-4 font-black text-white">Login</button>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Demo: admin@hotel.com / admin123
        </p>
      </form>
    </main>
  );
}
