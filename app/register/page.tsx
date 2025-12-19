"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [stream, setStream] = useState("");
  const [level, setLevel] = useState("");
  const [interested_online_degree, setInterestedOnlineDegree] =
    useState(false);
  const [enable_whatsapp_updates, setEnableWhatsappUpdates] = useState(false);
  const { register, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name,
      email,
      phone,
      type:"register",
      dob,
      stream,
      level,
      interested_online_degree,
      enable_whatsapp_updates,
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <div className="flex items-center justify-center py-12 lg:w-1/2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-start">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground sr-only">
              Enter your information to create an account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stream">Stream</Label>
              <Input
                id="stream"
                type="text"
                placeholder="Science"
                required
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                type="text"
                placeholder="Graduate"
                required
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="interested_online_degree"
                checked={interested_online_degree}
                onCheckedChange={(checked) =>
                  setInterestedOnlineDegree(Boolean(checked))
                }
                disabled={loading}
              />
              <label
                htmlFor="interested_online_degree"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Interested in online degree
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable_whatsapp_updates"
                checked={enable_whatsapp_updates}
                onCheckedChange={(checked) =>
                  setEnableWhatsappUpdates(Boolean(checked))
                }
                disabled={loading}
              />
              <label
                htmlFor="enable_whatsapp_updates"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable Whatsapp updates
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
          <div className="-mt-4 text-center text-sm">
            or Back to{" "}
            <Link href="/" className="underline">
              home
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block lg:w-1/2">
        <Image
          src="/auth.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
