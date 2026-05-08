import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="page-shell py-12">
        <Card className="max-w-2xl">
          <h1 className="text-3xl font-bold">Contact RKISPro</h1>
          <form className="mt-6 grid gap-4">
            <Input label="Name" name="name" required />
            <Input label="Email" name="email" type="email" required />
            <Textarea label="Message" name="message" rows={5} required />
            <Button type="submit">Send Message</Button>
          </form>
        </Card>
      </main>
    </>
  );
}
