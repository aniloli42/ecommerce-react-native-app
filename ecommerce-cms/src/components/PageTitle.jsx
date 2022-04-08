const PageTitle = ({ title, ...rest }) => {
  return (
    <h2 {...rest} className="text-white font-medium text-xl">
      {title}
    </h2>
  );
};

export default PageTitle;
