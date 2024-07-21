type PageTitleProps = {
	title: string;
};

function PageTitle({ title }: PageTitleProps) {
	return <div className="text-xl font-semibold">{title}</div>;
}

export default PageTitle;
