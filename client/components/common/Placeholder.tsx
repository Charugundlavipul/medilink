export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-xl text-center py-20">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted-foreground">
        This page is ready to be filled. Continue prompting to design this screen.
      </p>
    </div>
  );
}
