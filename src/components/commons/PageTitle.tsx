
interface PageTitleProps {
  title: string;
  accentText: string;
};

export default function PageTitle({ title, accentText }: PageTitleProps) {
  return (
    <h1 className="text-4xl sm:text-6xl font-bold mb-4">
      {title}
      <br />
      <span className="text-[#D6F379]">{accentText}</span>
    </h1>
  );
};
