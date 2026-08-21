import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center py-16">
      <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page introuvable</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </Container>
  );
}
