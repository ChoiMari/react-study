const Test4 = () => {
  const handleClick = () => {
    alert("클릭");
  };
  return (
    <div>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
};

export default Test4;
