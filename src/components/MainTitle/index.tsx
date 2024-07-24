import Image from "next/image";

type PageTitleProps = {
  title: string;
};

function MainTitle({ title }: PageTitleProps) {
  return (
    <div className="flex gap-2 text-xl font-semibold">
      <Image
        src="/images/labrador-logo.png"
        alt="Labradoc"
        width="25"
        height="10"
      />
      {title}
    </div>
  );
}

export default MainTitle;
