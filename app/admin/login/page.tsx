import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password"));

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();

    cookieStore.set("hotel-admin", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-sand flex items-center justify-center p-6">
      <form action={login} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <div className="text-sm font-black uppercase tracking-[0.35em] text-gold">
          Hotel Admin
        </div>

        <h1 className="mt-3 text-4xl font-black">Login</h1>

        <input
          name="password"
          type="password"
          placeholder="Admin password"
          className="mt-8 w-full rounded-2xl border p-4"
          required
        />

        <button className="mt-5 w-full rounded-full bg-black px-6 py-4 font-bold text-white">
          Enter Dashboard
        </button>
      </form>
    </main>
  );
}